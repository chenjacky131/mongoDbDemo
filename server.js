const http = require("http");
const server = http.createServer();
const { route } = require('./router');
server.on("request", async (req, res) => {
  //  设置响应头允许跨域
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "*");
  route(req.url, req, res);
})
server.listen(3030, () => {
  console.log("服务已启动，http://127.0.0.1:3030")
})