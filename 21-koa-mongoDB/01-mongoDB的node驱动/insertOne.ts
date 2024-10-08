const { client, users } = require('./mongo.ts');

(async function () {
	console.log('123');
	// await client.connect();
	let res = await users.insertOne({ name: 'nicholas', age: 7 });
	// let res = await users.insertMany([
	// 	{ name: 'abc', age: 7 },
	// 	{ name: 'def', age: 37 },
	// ]);
	console.log('res', res);

	await client.close();
})();
