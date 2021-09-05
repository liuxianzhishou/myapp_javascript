<template>
  <div id="app">
    <MainTabBar/>
<!--    到其他界面返回后，原来界面位置保持-->
    <keep-alive exclude="Detail">
      <router-view/>
    </keep-alive>
  </div>
</template>

<script>
import MainTabBar from "@/components/content/mainTabbar/MainTabBar";

export default {
  name: 'app',
  components: {
    MainTabBar
  }
}
</script>

<style>
@import "assets/css/base.css";
#app {
  position: relative;
}
</style>
