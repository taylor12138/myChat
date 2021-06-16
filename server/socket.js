module.exports = function (io) {
  // 记录用户登录
  const userList = [];
  io.on("connection", socket => {
    // 检测登录状态
    socket.on('login', (data) => {
      let loginStatus = userList.length !== 0 ? userList.some(item => item.username === data.username) : false;
      if (loginStatus) {
        //表示用户存在,登录失败，服务器需要给当前用户响应，告诉登录失败
        socket.emit("loginfail", {
          msg: "该用户已登录聊天室，登录失败"
        })
      } else {
        // 表示用户不存在,登录成功
        userList.push(data)
        socket.emit("loginsuccess", {
          ...data,
          msg: "登录聊天室成功"
        })
        // 广播进入聊天室事件
        io.emit("enterRoom", data);
        // 告诉用户聊天室人数
        io.emit("userList", userList);
        // 把登陆成功的用户名称进行存储
        socket.username = data.username;
      }
    })


    // 监听用户断开状态
    socket.on('disconnect', () => {
      // 若用户已登录
      if (socket.hasOwnProperty("username")) {
        let index = userList.findIndex(item => item.username === socket.username);
        userList.splice(index, 1);
        // 广播离开聊天室事件
        io.emit("leaveRoom", {
          username: socket.username
        })
        // 告诉用户聊天室人数
        io.emit("userList", userList);
      }
    })

    // 监听用户聊天信息状态
    socket.on('sendMessage', (data) => {
      // 广播给所有用户
      io.emit('receiveMessage', data)
    })
  });
}
