const { MongoClient, ObjectId } = require('mongodb');
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);
const dbName = 'api-data';
async function getCollection(){ //  获取数据库data表的数据
  await client.connect();
  const db = client.db(dbName);
  const collection = await db.collection('data');
  return collection;
}
async function insertData (data){ //  插入一条数据
  const collection = await getCollection();
  const res = await collection.insertOne(data);
  return res;
}
async function findData (name = undefined){ //  查询数据
  const collection = await getCollection();
  let res = null;
  if(name){
    res = await collection.findOne({name: name});
  }else{
    res = await collection.find({}).toArray();
  }
  return res;
}
async function deleteData (id){ //  删除数据
  const collection = await getCollection();
  const res = await collection.deleteOne({_id: ObjectId(id)})
  return res;
}
async function updateData (obj){  //  更新数据
  const collection = await getCollection();
  const res = await collection.updateOne(
    {_id: ObjectId(obj.id)},
    {
      $set:{
        name: obj.name,
        age: obj.age,
        number: obj.number
      },
      $currentDate: { lastModified: true}
    }
  )
  return res;
}
module.exports = {
  insertData,
  findData,
  deleteData,
  updateData
}