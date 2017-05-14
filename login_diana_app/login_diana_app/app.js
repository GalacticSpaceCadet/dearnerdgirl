var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require("body-parser");
var methodOverride = require('method-override');
var session = require('express-session');
var db = require('./models');



var express = require('express')
  , http = require('http')
  , passport = require('passport')
  , util = require('util')
  , LinkedInStrategy = require('passport-linkedin').Strategy;

var app = express();

var PORT = process.env.PORT || 3000;
// configure Express
// app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(logger("dev"));
app.use(cookieParser());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(methodOverride('X-HTTP-Method-Override'));
app.use(methodOverride('X-HTTP-Method'));
app.use(methodOverride('X-Method-Override'));


// app.use(express.logger());
// app.use(express.cookieParser());
// app.use(express.bodyParser());
// app.use(express.methodOverride());
// app.use(express.session({ secret: 'keyboard cat' }));
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
  // ,
  // cookie: { secure: true }
}));
// Initialize Passport!  Also use passport.session() middleware, to support
// persistent login sessions (recommended).
app.use(passport.initialize());
app.use(passport.session());
// app.use(app.router);
app.use(express.static(__dirname + '/public'));

var LINKEDIN_API_KEY = "78loq80mgi0f6z";
var LINKEDIN_SECRET_KEY = "LL0WbhG9hxzKMGuw";

// Passport session setup.
//   To support persistent login sessions, Passport needs to be able to
//   serialize users into and deserialize users out of the session.  Typically,
//   this will be as simple as storing the user ID when serializing, and finding
//   the user by ID when deserializing.  However, since this example does not
//   have a database of user records, the complete LinkedIn profile is
//   serialized and deserialized.
passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});


// Use the LinkedInStrategy within Passport.
//   Strategies in passport require a `verify` function, which accept
//   credentials (in this case, a token, tokenSecret, and LinkedIn profile), and
//   invoke a callback with a user object.
passport.use(new LinkedInStrategy({
    consumerKey: LINKEDIN_API_KEY,
    consumerSecret: LINKEDIN_SECRET_KEY,
    // NOTE: I have to access the site via 127.0.0.1:3000, NOT via localhost, and this whould be changed once I deploy.
    callbackURL: "http://127.0.0.1:3000/auth/linkedin/callback"
  },
  function(token, tokenSecret, profile, done) {
       var searchQuery = {
         username: profile.displayName,
         name: profile.displayName
     //     ,
     //     email: profile.email
     //     oauthID: profile.id
       };

     //   var updates = {
     //
     //   };

     //   var options = {
     //     upsert: true
     //   };
       console.log(searchQuery);
      // update the user if s/he exists or add a new user

        // edited burger create to add in a burger_name
         db.user.create(searchQuery)
          // pass the result of our call
        .then(function(user) {
            // log the result to our terminal/bash window
          console.log(user);
            // redirect

          // res.redirect("/");
        });

    // asynchronous verification, for effect...
    process.nextTick(function () {
      // To keep the example simple, the user's LinkedIn profile is returned to
      // represent the logged-in user.  In a typical application, you would want
      // to associate the LinkedIn account with a user record in your database,
      // and return that user instead.
      return done(null, profile);
    });
  }
));

// axios.get('http://tropicalfruitandveg.com/api/tfvjsonapi.php?tfvitem=avocado')
//   .then(function(response){
//        console.log(response.data);
//   });

app.get('/', function(req, res){
  res.render('index', { user: req.user });
});

app.get('/account', ensureAuthenticated, function(req, res){
  res.render('account', { user: req.user });
});

app.get('/login', function(req, res){
  res.render('login', { user: req.user });
});

// GET /auth/linkedin
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  The first step in LinkedIn authentication will involve
//   redirecting the user to linkedin.com.  After authorization, LinkedIn will
//   redirect the user back to this application at /auth/linkedin/callback
app.get('/auth/linkedin',
  passport.authenticate('linkedin'),
  function(req, res){
    // The request will be redirected to LinkedIn for authentication, so this
    // function will not be called.
  });

// GET /auth/linkedin/callback
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  If authentication fails, the user will be redirected back to the
//   login page.  Otherwise, the primary route function function will be called,
//   which, in this example, will redirect the user to the home page.
app.get('/auth/linkedin/callback',
  passport.authenticate('linkedin', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/');
  });

app.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});

// http.createServer(app).listen(app.get('port'), function(){
//   console.log('Express server listening on port ' + app.get('port'));
// });


// Simple route middleware to ensure user is authenticated.
//   Use this route middleware on any resource that needs to be protected.  If
//   the request is authenticated (typically via a persistent login session),
//   the request will proceed.  Otherwise, the user will be redirected to the
//   login page.
function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/login');
}

db.sequelize.sync({force:false}).then(function(){
  app.listen(PORT, function(){
    console.log("Listening on port " + PORT);

  });
});
