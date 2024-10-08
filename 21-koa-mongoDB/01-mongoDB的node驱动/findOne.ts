const { client, users } = require('./mongo.ts');

(async function () {
	console.log('123');
	// await client.connect();
	let res = await users.findOne({ name: 'nick' });
	console.log('res', res);

	await client.close();
})();
