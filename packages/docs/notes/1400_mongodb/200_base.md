### 创建/切换至对应的database
```sh
# 创建一个user的数据库
use users
```

### 展示所有database
```sh
show database
```

### 创建collection
```sh
# 创建一个info的集合
db.create.collection('info')
```

### 展示所有collection
```sh
show collections
```

### 删除collection
```sh
db.info.drop()
```

### 创建document
```sh
# 插入文档
db.info.insertOne({ "name": "tom", "age": "18" })
```
```sh
# 插入文档
db.info.insertMany([
  { "name": "jack", "age": "18" },
  { "name": "jerry", "age": "17" }
])
```

### 查询document
```sh
db.info.find()
# [
#   { _id: ObjectId('6661bf399b2943fdd82a32d8'), name: 'tom', age: '18' },
#   { _id: ObjectId('6661bf889b2943fdd82a32d9'), name: 'jack', age: '18' },
#   { _id: ObjectId('6661bf889b2943fdd82a32da'), name: 'jerry', age: '17' }
# ]
db.info.find({ "age": "18" })
# [
#   { _id: ObjectId('6661bf399b2943fdd82a32d8'), name: 'tom', age: '18' },
#   { _id: ObjectId('6661bf889b2943fdd82a32d9'), name: 'jack', age: '18' }
# ]
db.info.find({ "age": "18" }, { "name": 1, "_id": 0 })
# output: [ { name: 'tom' }, { name: 'jack' } ]
```
