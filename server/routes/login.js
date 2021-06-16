const { User } = require('../db/crud')
// 注册
userRegister = (req, res) => {
  const { phone, password, username } = req.body.params;
  // 先查询
  User.findOne({
    $or: [
      { phone },
      { username }
    ]
  }, (err, data) => {
    if (err) return next(err);
    if (data) {
      return res.status(200).json({
        err_code: 1,
        message: 'phone or username already exits'
      });
    }
    // 再存储
    new User({
      username,
      password,
      phone
    }).save((err, data) => {
      if (err) {
        return res.status(500).json({
          err_code: 500,
          message: 'server error'
        })
      }
      return res.status(200).json({
        err_code: 0,
        message: 'ok',
        data
      })
    })
  })

};
// 登录
userLogin = (req, res, next) => {
  // 获取表单数据-> 查询数据库用户密码是否正确-> 发送响应数据
  const { phone, password, username } = req.body.params;
  User.findOne({
    username,
    phone,
    password
  }, (err, user) => {
    if (err) return next(err);
    // 找不到该账户
    if (!user) return res.status(200).json({
      err_code: 1,
      message: 'phone or password is invalid'
    })
    // //用户存在，登陆成功、通过session记录登陆状态
    // req.session.user = user;
    res.status(200).json({
      err_code: 0,
      message: 'OK',
      user
    })
  })
}
module.exports = {
  userLogin,
  userRegister
}