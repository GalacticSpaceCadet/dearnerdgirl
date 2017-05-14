'use strict';

const express = require('express');
const methodOverride = require('method-override');
const compression = require('compression');
const app = express();
app.set('x-powered-by', false);
app.set('etag', false);

const server = require('http').Server(app);
const path = require('path');
const _ = require('lodash');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const queryString = require('querystring');

app.use(compression());
app.use(cookieParser('i-am-a-little-teapot', {
    httpOnly: true,
    maxAge: 60 * 60 * 24 * 365
}));
app.use(bodyParser.json());
app.use(methodOverride('X-HTTP-Method-Override'));
app.use(methodOverride('X-HTTP-Method'));
app.use(methodOverride('X-Method-Override'));


// configure Express
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.use('/public', express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/views'));

const port = process.env.PORT || 3000;
const md5 = require('md5');

app.get('/health', (req, res) => {
    res.json({
        status: 'ok'
    });
});

const db = require('./db');

app.post('/register', async(req, res) => {

    if (_.isNil(req.body.username)) {
        return res.status(409).json({
            status: 'must include a username'
        });
    }

    if (_.isNil(req.body.password)) {
        return res.status(409).json({
            status: 'must include a password'
        });
    }

    req.body.password = md5(req.body.password);

    res.json(await db.insertOne('users', req.body));
});

app.get('/diaries', async(req, res) => {
    return res.json(await db.find('diaries'));
})

app.get('/authcheck', [basicAuth, (req, res) => {
    res.json({
        status: 'ok'
    });
}])

async function basicAuth(req, res, next) {

    if (_.isNil(req.headers.authorization)) {
        return res.status(401).json({
            status: 'authorization header required'
        })
    }

    let authHeader = req.headers.authorization;
    let parts = authHeader.split(' ');
    let scheme = parts[0];
    let hash = parts[1];

    if ((scheme || '').toLowerCase() !== 'basic') {
        return res.status(401).json({
            status: 'only basic auth supported'
        });
    }

    if (_.isNil(hash)) {
        return res.status(401).json({
            status: 'username and password must be supplied'
        });
    }

    let plain = Buffer.from(hash, 'base64').toString('utf-8');
    let userParts = plain.split(':');
    let username = userParts[0];
    let password = userParts[1];

    if (_.isNil(username)) {
        return res.status(401).json({
            status: 'username must be supplied'
        });
    }

    if (_.isNil(password)) {
        return res.status(401).json({
            status: 'password must be supplied'
        });
    }

    let dbUsers = await db.find('users', {
        username: username
    });

    if (_.isEmpty(dbUsers)) {
        return res.status(401).json({
            status: 'incorrect username provided'
        });
    }

    let dbPassword = _.result(dbUsers, '0.password');

    if (_.isEmpty(dbPassword)) {
        return res.status(401).json({
            status: 'no password known for specified username'
        });
    }

    let isValid = md5(password) === dbPassword;

    if (!isValid) {
        return res.status(401).json({
            status: 'password incorrect'
        });
    }

    next();
}


server.listen(port, () => {
    console.log(`listening on ${port}`);
});