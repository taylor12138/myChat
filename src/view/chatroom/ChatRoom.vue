<template>
  <div id="chat-room">
    <div class="room">
      <div class="chat-left">
        <div class="my-info">
          <img :src="imgAddress" alt="" /> <span>dudu</span>
        </div>
        <div class="nowusers">当前用户列表</div>
        <ul class="chat-list">
          <li>
            <img src="~@/assets/img/chatroom.png" alt="" />
            <span>public聊天室</span>
          </li>
        </ul>
      </div>
      <div class="chat-right">
        <div class="chat-title">聊天室({{ userList.length }})</div>
        <!-- 聊天消息 -->
        <div class="chat-content">
          <ul>
            <li v-for="item in chatContent" :key="item.id">
              <div
                :class="{
                  tip: item.type === 3,
                  'my-msg': item.type === 1,
                  'other-msg': item.type === 2,
                }"
              >
                <img
                  :src="item.avator"
                  alt=""
                  v-if="item.type === 2"
                  class="avator"
                />
                <span class="text" v-if="item.msg">{{ item.msg }}</span>
                <img
                  :src="item.file"
                  alt=""
                  v-if="item.file"
                  preview="1"
                  class="file-content"
                />
                <img
                  :src="item.avator"
                  alt=""
                  v-if="item.type === 1"
                  class="avator"
                />
              </div>
            </li>
          </ul>
        </div>
        <!-- 发送框 -->
        <div class="chat-send">
          <div class="emoji" v-show="showEmoji">
            <span
              v-for="item in emojiList"
              :key="item.codes"
              @click="sendEmoji(item.char)"
            >
              {{ item.char }}
            </span>
          </div>
          <div class="icon">
            <ul>
              <li @click="showEmoji = !showEmoji">
                <img src="~@/assets/img/emoji.png" alt="" />
              </li>
              <li>
                <label for="file">
                  <img src="~@/assets/img/file.png" alt="" />
                </label>
                <input
                  type="file"
                  style="display: none"
                  id="file"
                  @change="handleFile"
                />
              </li>
            </ul>
          </div>
          <textarea
            cols="95"
            rows="6"
            ref="textarea"
            @keydown.enter="handlePress"
          ></textarea>
          <button class="sendMessage" @click="sendMessage">发送</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import io from "socket.io-client";
import { nanoid } from "nanoid";
import emoji from "@/assets/extra/emoji.json";

export default {
  name: "ChatRoom",
  data() {
    return {
      username: this.$store.state.username, //当前用户
      avator: this.$store.state.img,
      socket: null,
      userList: [], //聊天室人数
      emojiList: [], //表情包列表
      content: "",
      chatContent: [], //type： 1自己信息  2别人的信息 3.离开/进入聊天室
      baseURL: "http://47.113.117.158:5208/",
      showEmoji: false, //是否显示表情包
    };
  },
  computed: {
    imgAddress() {
      return require(`@/assets/img/${this.avator}`);
    },
  },
  mounted() {
    /*
    聊天室主要功能
    */
    this.socket = io(this.baseURL);
    //发送登录信息
    this.socket.emit("login", { username: this.username });
    // 监听登陆成功
    this.socket.on("loginsuccess", (data) => {
      this.$message.success(data.msg);
    });
    // 监听登录失败
    this.socket.on("loginfail", (data) => {
      this.$message.error(data.msg);
    });
    // 有用户加入聊天室
    this.socket.on("enterRoom", (data) => {
      this.someoneJoin(`欢迎${data.username}加入聊天室`);
    });
    // 有用户离开聊天室
    this.socket.on("leaveRoom", (data) => {
      this.someoneJoin(`${data.username}离开了聊天室`);
    });
    // 接收聊天信息
    this.socket.on("receiveMessage", (data) => {
      //自己发的信息
      if (data.username === this.username)
        this.chatContent.push({ ...data, type: 1 });
      //别人发的信息
      else this.chatContent.push({ ...data, type: 2 });
      console.log(data);
    });
    // 监听用户列表的信息
    this.socket.on("userList", (userList) => {
      this.userList = [...userList];
    });
    /**
    表情包
    */
    this.emojiList = emoji;
  },
  beforeDestroy() {
    // 防止内存泄漏的操作放在这里
    if (this.socket) this.socket.disconnect();
    this.socket = null;
  },
  methods: {
    // 有人加入聊天室
    someoneJoin(msg) {
      this.chatContent.push({
        ...this.turnMessage(msg),
        type: 3,
      });
    },
    // 当前用户发送信息到聊天室（键盘enter事件）
    handlePress(e) {
      if (e.ctrlKey && e.keyCode == 13) {
        //用户点击ctrl+enter触发换行
        this.$refs.textarea.value += "\n";
      } else {
        //用户点击了enter触发发送消息
        this.sendMessage();
      }
    },
    // 当前用户发送信息到聊天室（button事件）
    sendMessage() {
      this.content = this.$refs.textarea.value;
      this.$refs.textarea.value = "";
      if (!this.content) return alert("请输入内容");
      this.socket.emit("sendMessage", this.turnMessage(this.content));
    },
    // 把信息转换成对象
    turnMessage(msg) {
      const id = nanoid();
      return {
        id,
        msg,
        username: this.username,
        avator: this.imgAddress,
      };
    },
    //点击表情事件
    sendEmoji(emoji) {
      this.$refs.textarea.value += emoji;
    },
    // 上传文件事件
    handleFile(e) {
      const file = e.target.files[0];
      if (file.size > 1024 * 1024) {
        return this.$message.info("发送图片大小不能超过1M!");
      }
      const reader = new FileReader(); // 创建读取文件对象
      reader.readAsDataURL(file); // 发起异步请求，读取文件
      reader.onload = (e) => {
        // 文件读取完成后
        // 读取完成后，将结果赋值给img的src
        this.socket.emit("sendMessage", this.turnFile(e.target.result));
      };
    },
    // 把信息转换成对象(图片)
    turnFile(file) {
      const id = nanoid();
      return {
        id,
        file,
        username: this.username,
        avator: this.imgAddress,
      };
    },
  },
};
</script>

<style scoped lang="less">
#chat-room {
  display: flex;
  height: calc(100% - 5rem);
  justify-content: space-around;
  align-items: center;
  .room {
    display: flex;
    width: 60rem;
    height: 38rem;
    background-color: #fff;
    box-shadow: 0.066667rem 0.066667rem 1rem rgb(97, 97, 97);
    // 列表
    .chat-left {
      flex: 1;
      background-image: linear-gradient(
        to right top,
        #a98fb3,
        #a08fb9,
        #9490bd,
        #8691c1,
        #7593c4
      );
      color: #fff;
      padding: 0 0.333333rem;
      // 顶部头像
      .my-info {
        height: 5rem;
        border-bottom: 0.066667rem solid #fff;
        text-align: center;
        img {
          width: 3rem;
          height: 3rem;
          border: 0.066667rem solid rgba(255, 255, 255, 0.2);
          border-radius: 4.33333rem;
          vertical-align: middle;
        }
        span {
          font-size: 1.2rem;
          line-height: 5rem;
          text-align: center;
        }
      }
      // 当前用户
      .nowusers {
        padding: 0.333333rem;
        font-weight: 800;
      }
      // 真正的列表
      .chat-list {
        height: 33rem;
        list-style: none;
        li {
          height: 5rem;
          line-height: 5rem;
          img {
            width: 4rem;
            height: 4rem;
            vertical-align: middle;
          }
        }
        li:hover {
          background-color: rgb(220, 219, 219);
        }
      }
    }
    // 聊天部分
    .chat-right {
      flex: 3.5;
      display: flex;
      flex-direction: column;
      background-color: rgb(80, 185, 80);
      // 标题
      .chat-title {
        flex: 1;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 1.2rem;
        color: rgb(0, 0, 0);
        background-color: rgb(245, 245, 245);
        border-bottom: 0.066667rem solid rgb(231, 231, 231);
      }
      // 聊天内容
      .chat-content {
        flex: 8;
        background-color: rgb(245, 245, 245);
        padding: 0 1.666667rem;
        color: black;
        overflow: auto;
        ul {
          list-style: none;
          li {
            margin: 0.8rem 0;
            .tip {
              text-align: center;
              color: #ccc;
              overflow: auto;
              margin-bottom: 0;
              margin-top: 0;
              padding: 5px 30px 0;
            }
            // 设置头像大小
            .avator {
              width: 2.5rem;
              height: 2.5rem;
            }
            // 设置上传图片大小
            .file-content {
              margin: 0 10px;
              max-width: 330px;
              max-height: 170px;
              cursor: pointer;
            }
            // “我”的信息样式
            .my-msg {
              display: flex;
              justify-content: flex-end;
              position: relative;
              .text {
                background-color: #9eea6a;
                margin-right: 0.4rem;
                line-height: 2.5rem;
                text-align: center;
                border: 0.066667rem solid rgba(255, 255, 255, 0.445);
                border-radius: 0.333333rem;
                padding: 0 0.5rem;
                &::after {
                  content: "";
                  position: absolute;
                  right: 35px;
                  top: 50%;
                  transform: translateY(-50%);
                  border-left: 6px solid #9eea6a;
                  border-top: 6px solid transparent;
                  border-bottom: 6px solid transparent;
                  border-right: 6px solid transparent;
                }
              }
            }
            // “其他人”的信息样式
            .other-msg {
              display: flex;
              justify-content: flex-start;
              position: relative;
              .text {
                background-color: white;
                margin-left: 0.4rem;
                line-height: 2.5rem;
                text-align: center;
                border: 0.066667rem solid rgba(255, 255, 255, 0.445);
                border-radius: 0.333333rem;
                padding: 0 0.5rem;
                &::before {
                  content: "";
                  left: 35px;
                  top: 45%;
                  transform: translateY(-50%);
                  position: absolute;
                  border-left: 5px solid transparent;
                  border-top: 5px solid transparent;
                  border-bottom: 5px solid transparent;
                  border-right: 5px solid white;
                }
              }
            }
          }
        }
      }
      // 发送框
      .chat-send {
        position: relative;
        flex: 4;
        background-color: rgb(255, 255, 255);
        .emoji {
          position: absolute;
          top: -13.666667rem;
          left: 0.333333rem;
          width: 276px;
          height: 218px;
          border: 0.066667rem solid #ccc;
          overflow: auto;
          span {
            line-height: 2rem;
            padding: 0.1rem;
            font-size: 1rem;
          }
          span:hover {
            background-color: #ccc;
          }
        }
        .icon {
          height: 1.666667rem;
          margin: 0.333333rem;
          ul {
            display: flex;
            list-style: none;
            img {
              height: 1.3rem;
              width: 1.8rem;
              padding: 0 0.2rem;
              cursor: pointer;
            }
          }
        }
        textarea {
          border: none;
          resize: none;
          outline: none;
          font-size: 15px;
          padding-left: 10px;
        }
        .sendMessage {
          position: absolute;
          bottom: 1rem;
          right: 20px;
          font-size: 16px;
          border-radius: 5px;
          padding: 4px 10px;
          background-color: #f5f5f5;
          border: 1px solid #ccc;
        }
      }
    }
  }
}
</style>