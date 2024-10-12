const { MongoClient, ObjectId } = require('mongodb');
// import { MongoClient, ObjectId } from 'mongodb';

const uri = 'mongodb://localhost:27017';

const client = new MongoClient(uri); // 创建一个客户端

const db = client.db('learn_mongo');

const users = db.collection('users');

const articles = db.collection('articles');

// (async function () {
// 	console.log('123');
// 	// await client.connect();
// 	let res = await users.findOne({ name: 'nick' });
// 	console.log('res', res);
// })();

module.exports = { ObjectId, client, users, articles };
