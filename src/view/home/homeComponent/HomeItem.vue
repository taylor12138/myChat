<template>
  <div class="home-item">
    <div class="home-item-img">
      <slot name="item-img"> </slot>
    </div>
    <div class="home-item-text">
      <slot name="item-text"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "HomeItem",
};
</script>

<style scoped lang="less">
.home-item {
  position: relative;
  border: 0.066667rem solid rgba(255, 255, 255, 0.1);
  border-radius: 1.5rem;
  overflow: hidden;
  .home-item-img img {
    width: 22rem;
    height: 29.333333rem;
    vertical-align: middle;
  }
  .home-item-text {
    font-size: 1.75rem;
    text-align: center;
    background-color: rgb(253, 255, 230);
  }
}
.home-item:hover {
  position: relative;
  .home-item-img img {
    opacity: 0.8;
    transform: scale(1.2) rotate(10deg);
    transition-duration: 0.4s;
  }
  .home-item-text {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 50px;
    color: rgb(252, 253, 110);
    background-color: rgba(255, 255, 255, 0);
  }
}
</style>