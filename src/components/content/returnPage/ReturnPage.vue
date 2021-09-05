<template>
  <div class="return-page" @click="returnPage">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "ReturnPage",
  methods: {
    returnPage() {
      this.$emit('returnPage')
    }
  }
}
</script>

<style scoped>
.return-page img {
  width: 20px;
  height: 20px;
}
</style>
