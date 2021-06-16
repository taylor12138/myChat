<template>
  <div class="tab-bar-item" @click="itemClick">
    <!-- 使用div包装，同下 -->
    <div v-if="!isActive"><slot name="item-icon"></slot></div>
    <div v-else><slot name="item-icon-active"></slot></div>
    <!-- 外面加入一个div，防止替换的时候，把这里的class判断也替换掉，导致样式无效 -->
    <div :style="activeStyle">
      <slot name="item-text"></slot>
    </div>
  </div>
</template>
<script>
export default {
  name: "tabBarItem",
  props: {
    path: {
      type: String,
    },
    activeColor: {
      type: String,
      default: "red",
    },
  },
  computed: {
    isActive() {
      return this.$route.path.indexOf(this.path) !== -1;
    },
    activeStyle() {
      return this.isActive ? { color: this.activeColor } : {};
    },
  },
  methods: {
    itemClick() {
      if (!this.isActive) this.$router.replace(this.path);
    },
  },
};
</script>

<style scoped>
.tab-bar-item {
  flex: 1;
  line-height: 2.45rem;
  text-align: center;
  font-size: 1.2rem;
  box-shadow: 5px 0px 5px -5px #b4b4b4, -5px 0px 5px -5px #b4b4b4;
}
.tab-bar-item img {
  width: 1.8rem;
  height: 1.8rem;
  margin-top: 0.15rem;
  margin-bottom: 0.1rem;
  vertical-align: middle;
}
</style>