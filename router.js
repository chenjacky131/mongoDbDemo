

const multiparty = require("multiparty"); //  处理formData对象的中间件
const { insertData, findData, deleteData, updateData } = require('./db.js');
const http = require('http');
const parseFormData = (req, res, handler) => {
  const multipart = new multiparty.Form(); //  解析FormData对象
  multipart.parse(req, async (err, fields) => {
    if(err){  //  解析失败
      console.log('form解析失败', err)
      return
    }
    handler(fields, res);
  })  
}
const handleSetDataRoute = async (fields, res) => {
  const [name] = fields.name;
  const [age] = fields.age;
  const [number] = fields.number;
  const exist = await findData(name);
  if(exist){
    res.end('数据已存在')
  }else{
    const data = await insertData({name, age, number});
    res.end(JSON.stringify(data))        
  }
}
const handleFindDataRoute = async (res) => {
  const data = await findData();
  if(data){
    res.end(JSON.stringify(data))
  }else{
    res.end('暂无数据')
  }
}
const handleDeleteDataRoute = async (fields, res) => {
  const [_id] = fields._id;
  const result = await deleteData(_id);
  res.end(JSON.stringify(result));
}
const handleUpdateDataRoute = async (fields, res) => {
  const [_id] = fields._id;
  const [name] = fields.name;
  const [age] = fields.age;
  const [number] = fields.number;
  const result = await updateData({
    id: _id,
    name: name,
    age: age,
    number, number
  });
  res.end(JSON.stringify(result));
}
const handleLoginRoute = async (req, res) => {
  const code = req.query.code;
  const appid = 'wx305dce6b7a47c959';
  const secret = '3030304f1f2c580d224a4288a1c575fe';
  let url = `https://api.weixin.qq.com/sns/jscode2session?appid=${appid}&&secret=${secret}&js_code=${code}&grant_type=authorization_code`;
  const result = await http.get(url);
  console.log(result);
  res.end('登录');
}
function route(app){
  app.post('/setData', (req, res, next) => {
    parseFormData(req, res, handleSetDataRoute); 
  })
  app.post('/findData', (req, res, next) => {
    handleFindDataRoute(res)
  })
  app.post('/deleteData', (req, res, next) => {
    parseFormData(req, res, handleDeleteDataRoute); 
  })
  app.post('/updateData', (req, res, next) => {
    parseFormData(req, res, handleUpdateDataRoute); 
  })
  app.post('/login', (req, res, next) => {
    handleLoginRoute(req, res); 
  })
}
exports.route = route