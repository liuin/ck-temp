<template>
  <div id="app">
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    <van-loading v-if="$store.state.ajaxLoad" class="loading" type="circle" color="width" />
  </div>
</template>

<script>
export default {
  name: "app"
};
</script>

<style scoped lang="less">
.loading {
  position: fixed;
  padding: 10px;
  border-radius: 5px;
  background-color: rgba(0, 0, 0, 0.5);
  left: 50%;
  top: 50%;
  margin-left: -18px;
  margin-top: -18px;
}
</style>
