const express = require('express')
const app = express()
const port = 3030
const { route } = require('./router');
app.use('/', (req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "*");
  next()
});
route(app);
app.listen(port, () => {
  console.log(`服务器启动： ${port}`)
})