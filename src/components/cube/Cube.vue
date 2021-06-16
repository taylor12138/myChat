<!-- 3d旋转 -->
<template>
  <div id="cube">
    <div class="box1"><img src="@/assets/img/music/1.jpg" alt="" /></div>
    <div class="box2"><img src="@/assets/img/music/2.jpg" alt="" /></div>
    <div class="box3"><img src="@/assets/img/music/3.jpg" alt="" /></div>
    <div class="box4"><img src="@/assets/img/music/4.jpg" alt="" /></div>
    <div class="box5"><img src="@/assets/img/music/5.jpg" alt="" /></div>
    <div class="box6"><img src="@/assets/img/music/6.jpg" alt="" /></div>
  </div>
</template>

<script>
export default {
  name: "Cube",
};
</script>

<style lang="less" scoped>
#cube {
  width: 200px;
  height: 200px;
  position: relative;
  // perspective 属性定义 3D 元素距视图的距离，以像素计。该属性允许您改变 3D 元素查看 3D 元素的视图。
  // perspective: 800px;
  transform-style: preserve-3d;
  background-color: rgba(0, 0, 0, 0);
  transform: rotateX(45deg) rotateZ(45deg);
  animation: rotate 20s infinite linear;
  div {
    position: absolute;
  }
  img {
    width: 200px;
    height: 200px;
    opacity: 0.7;
  }
  .box1 {
    // 现在box1面向左/右，此时translateZ位移也是向左/右位移
    transform: rotateY(90deg) translateZ(100px);
  }
  .box2 {
    transform: rotateY(-90deg) translateZ(100px);
  }
  .box3 {
    transform: rotateX(90deg) translateZ(100px);
  }
  .box4 {
    transform: rotateX(-90deg) translateZ(100px);
  }
  .box5 {
    transform: rotateY(180deg) translateZ(100px);
  }
  .box6 {
    transform: rotateY(0deg) translateZ(100px);
  }
  // 动画
  @keyframes rotate {
    0% {
      transform: rotateX(0deg) rotateZ(0deg);
    }
    100% {
      transform: rotateX(360deg) rotateZ(360deg);
    }
  }
}
</style>