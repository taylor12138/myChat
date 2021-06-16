<template>
  <div id="tab-bar">
    <slot></slot>
  </div>
</template>
<script>
export default {
  name: "tabBar",
};
</script>

<style scoped>
#tab-bar {
  height: 5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 4;
}
</style>