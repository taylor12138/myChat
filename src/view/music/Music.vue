<template>
  <div id="music">
    <cube class="cube1"></cube>
    <div class="music-box">
      <aplayer v-bind="musicLoad" />
    </div>
    <cube class="cube2"></cube>
  </div>
</template>

<script>
import aplayer from "vue-aplayer";
import Cube from "@/components/cube/Cube.vue";

export default {
  name: "Music",
  data() {
    return {
      musicLoad: {
        theme: "#ffde70",
        autoplay: true,
        repeat: "list", // 轮播模式。
        float: true, // 浮动模式。你可以通过拖拽专辑封面，改变播放器位置
        showLrc: true,
        music: {
          // 当前播放的音乐
          title: "听爸爸的话",
          artist: "周杰伦",
          src: require("@/assets/music/周杰伦 - 听爸爸的话.mp3"),
          pic: require("@/assets/img/music/father.jpg"), // 封面图片
        },
        list: [
          {
            title: "晴天",
            artist: "周杰伦",
            src: require("@/assets/music/周杰伦 - 晴天.mp3"),
            pic: require("@/assets/img/music/qingtian.jpg"), // 封面图片
          },
          {
            title: "Welcome to New York",
            artist: "Taylor Swift",
            src: require("@/assets/music/TaylorSwift - Welcome To New York.mp3"),
            pic: require("@/assets/img/music/WelcomeToNewYork.jpg"), // 封面图片
          },
          {
            title: "Wildest Dreams",
            artist: "Taylor Swift",
            src: require("@/assets/music/Taylor Swift - Wildest Dreams.mp3"),
            pic: require("@/assets/img/music/wildest.jpg"), // 封面图片
          },
          {
            title: "听爸爸的话",
            artist: "周杰伦",
            src: require("@/assets/music/周杰伦 - 听爸爸的话.mp3"),
            pic: require("@/assets/img/music/father.jpg"), // 封面图片
          },
          {
            title: "听妈妈的话",
            artist: "周杰伦",
            src: require("@/assets/music/周杰伦 - 听妈妈的话.mp3"),
            pic: require("@/assets/img/music/mother.jpg"), // 封面图片
          },
          {
            title: "爷爷泡的茶",
            artist: "周杰伦",
            src: require("@/assets/music/周杰伦 - 爷爷泡的茶.mp3"),
            pic: require("@/assets/img/music/grandfather.jpg"), // 封面图片
          },
        ],
      },
    };
  },
  components: {
    aplayer,
    Cube,
  },
};
</script>

<style scoped lang="less">
#music {
  display: flex;
  align-items: center;
  justify-content: space-around;
  height: calc(100% - 5rem);
  .music-box {
    width: 500px;
  }
}
</style>