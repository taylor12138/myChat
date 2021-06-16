<template>
  <div id="container">
    <head-tab></head-tab>
    <router-view></router-view>
  </div>
</template>

<script>
import HeadTab from "@/components/headtab/HeadTab.vue";
export default {
  name: "Container",
  components: {
    HeadTab,
  },
};
</script>

<style scoped>
#container {
  height: 100vh;
  background: url("~@/assets/img/bg3.jpg") 0px 0px;
}
</style>