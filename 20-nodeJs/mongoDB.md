<!-- 查看当前使用数据库 -->
db

<!-- 使用某个数据库(创建数据库) -->
use xxx 

<!-- 在user集合插入一条（创建了集合） -->
db.users.insertOne({name:"nick",age:17, gender:1})

<!-- 在集合查找数据 -->
db.users.findOne({name:'marry'})
db.users.find({})