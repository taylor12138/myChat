const express = require('express')
let router = express.Router()

let login = require('./routes/login');

router.post('/mychat/login', login.userLogin);
router.post('/mychat/register', login.userRegister);

// 导出
module.exports = router