<template>
  <div id="home">
    <home-item @click.native="enterBoard">
      <img slot="item-img" src="~@/assets/img/home1.jpg" alt="" />
      <div slot="item-text">留言板</div>
    </home-item>
    <home-item @click.native="enterChatRoom">
      <img slot="item-img" src="~@/assets/img/home2.jpg" alt="" />
      <div slot="item-text">聊天室</div>
    </home-item>
    <home-item @click.native="enterMusic">
      <img slot="item-img" src="~@/assets/img/home3.jpg" alt="" />
      <div slot="item-text">音乐</div>
    </home-item>
  </div>
</template>

<script>
import HomeItem from "./homeComponent/HomeItem.vue";
export default {
  name: "Home",
  components: {
    HomeItem,
  },
  methods: {
    // 进入聊天室
    enterChatRoom() {
      this.$router.push("/container/chatroom");
    },
    // 进入留言板
    enterBoard() {
      this.$router.push("/container/board");
    },
    // 进入音乐室
    enterMusic() {
      this.$router.push("/container/music");
    },
  },
};
</script>

<style scoped>
#home {
  display: flex;
  height: calc(100% - 5rem);
  justify-content: space-around;
  align-items: center;
}
</style>