const app = require("express")();
const cors = require('cors');
const bodyParser = require('body-parser');
const httpServer = require("http").createServer(app);
const router = require('./router')


// 开启跨域允许
app.use(cors());
// 配置解析表单 POST 请求体插件
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
//使用路由
app.use(router);


const io = require("socket.io")(httpServer, { cors: true });
// 导入socket.io功能
require('./socket')(io);


httpServer.listen(5208, () => {
  console.log("5208端口正在监听。。。");
});