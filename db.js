const MongoClient = require('mongodb').MongoClient;
const url = process.env.MONGODB_URI || `mongodb://heroku_d07zgfkm:1lmk5ue50hg3av8etce8arjff2@ds137101.mlab.com:37101/heroku_d07zgfkm`;
const _ = require('lodash');


function connect() {
    return new Promise((resolve, reject) => {
        MongoClient.connect(url, function (err, db) {
            if (err) {
                return reject(err);
            }
            return resolve(db);
        });
    });
}

module.exports.insertOne = async(collection, record) => {
    let client = await connect();

    let result = await new Promise((resolve, reject) => {
        client.collection(collection).insertOne(record, (err, res) => {
            if (err) {
                return reject(err);
            }
            return resolve(res);
        })
    });

    client.close();
}


module.exports.find = async(collection, criteria) => {
    let client = await connect();

    let result = await new Promise((resolve, reject) => {
        let cursor = client.collection(collection).find(criteria);
        let results = [];

        if (_.isNil(cursor)) {
            return resolve(results);
        }

        cursor.each((err, doc) => {
            if (err) {
                return reject(err);
            }
            if (!_.isNil(doc)) {
                results.push(doc);
            } else {
                return resolve(results);
            }
        })
    });

    client.close();

    return result;
}


async function doTest() {
    try {
        let db = await connect();
        console.log('connected successfully');
        db.close();
    } catch (err) {
        console.error('unable to connect');
    }
}


module.exports.connect = connect;