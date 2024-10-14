const { client, users } = require('./mongo.ts');

(async function () {
	// console.log('123');
	let query = {};

	// 排序
	let options = {
		// sort	对查询结果按照某个字段排序
		// sort: { age: 1 },
		
		// projection	只返回某些字段(1表示返回,0表示不返回)
		// projection: { name: 1 },
		// projection: { pwd: 0 },
		limit: 2,
		skip: 2,
	};

	// await client.connect();
	// let cursor = await users.find({});

	// 不进行实际查询 只统计数量 cursor.count()
	// console.log('cursor', await cursor.count());

	// console.log('cursor', await cursor.toArray());

	let cursor = users.find(query, options);

	for await (const doc of cursor) {
		console.log('====', doc);
	}

	await client.close();
})();
