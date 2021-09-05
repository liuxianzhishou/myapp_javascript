<template>
  <div class="back-top" @click="topClk">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "BackTop",
  methods: {
    topClk() {
      this.$emit('backTop')
    }
  }
}
</script>

<style scoped>
.back-top img{
  width: 40px;
  height: 40px;
}
</style>
