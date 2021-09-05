<template>
  <Swiper v-if="banners.length" ref="swiper">
    <SwiperItem v-for="(item,index) in banners" @click="goToDetail(index)">
      <img :src="item.imgSrc"
           alt=""
           @load="swiperLoad">
    </SwiperItem>
  </Swiper>
</template>

<script>
  import {Swiper,SwiperItem} from 'common/swiper/index'
export default {
  name: "HomeSwiper",
  components: {
    Swiper,SwiperItem
  },
  props: {
    banners: {
      type: Array,
      default: () =>[]
    }
  },
  data() {
    return {
      ifEmit: true
    }
  },
  methods: {
    startTimer() {
      if(this.$refs.swiper)
      {
        this.$refs.swiper.startTimer();
      }
    },
    stopTimer() {
      this.$refs.swiper.stopTimer();
    },
    swiperLoad() {
      //保证只发送一次事件
      if(this.ifEmit)
      {
        this.$emit('swiperLoad');
        this.ifEmit=false;
      }
    },
    goToDetail(index) {
      let detailId=this.banners[index];
      console.log(detailId)
      /**
       * TODO: 完善根据轮播图进入商品详情页
       */
    }
  }
}
</script>

<style scoped>

</style>
