<template>
  <div id="nav-bar">
    <div class="nav-left"><slot name="left"></slot> </div>
    <div class="nav-mid"><slot name="mid">标题</slot> </div>
    <div class="nav-right"><slot name="right"></slot> </div>
  </div>
</template>

<script>
export default {
  name: "NavBar"
}
</script>

<style scoped>
#nav-bar {
  position: relative;
  /*设置堆叠顺序，越大越在上面*/
  z-index: 10;
  display: flex;
  /*设置行高，能使文字水平方向居中*/
  line-height: 44px;
  height: 44px;
  text-align: center;
  box-shadow: 0 1px 1px rgba(100,100,100,0.08);
}
.nav-left {
  width: 60px;
}
.nav-mid {
  flex: 1;
}
.nav-right {
  width: 60px;
}
</style>
