const mongoose = require('mongoose');
//连接MongoDB数据库（这里顺便创建了一个叫supermall_user的数据库）
mongoose.connect('mongodb://localhost:27017/mychat', { useNewUrlParser: true, useUnifiedTopology: true });
// 设计文档结构
let Schema = mongoose.Schema;
let userSchema = new Schema({
  username: {
    type: String,
    required: true   //设置该属性必须有配置，使用required
  },
  password: {
    type: String,
    required: true
  },
  phone: {
    type: Number,
    require: true
  }
});
let User = mongoose.model('User', userSchema);
module.exports = { User }