<template>
  <div class="pic" @click="goToDetail">
    <img :src="pic.imgSrc"
         :key="pic.imgSrc"
         alt=""
         @load="imgLoad">
    <div class="pic-info">
      <span class="figure-name">{{pic.imgFigure}}</span>
      <span class="prefer">{{pic.imgPrefer}}</span>
      <br/>
      <span class="create-time">{{pic.imgCreateTime}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "PicListItem",
  props: {
    pic: {
      type: Object,
      default: {}
    }
  },
  methods: {
    imgLoad() {
      //发送事件总线
      //要用$bus需要在main.js中添加原型
      this.$bus.$emit('picLoad')
    },
    goToDetail() {
      let detailId=this.pic.id;
      //跳转到详情页
      this.$router.push({path: '/detail',query:{detailId}})
    }
  }
}
</script>

<style scoped>
.pic {
  padding-bottom: 40px;
  position: relative;
}
.pic img {
  width: 100%;
}
.pic-info {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 3px;
  text-align: center;
  line-height: 20px;
}
.pic-info .figure-name {
  position: absolute;
  left: 0;
  right: 0;
  top: 3px;
  bottom: 20px;
  text-align: center;
  font-size: 12px;
}
.pic-info .prefer {
  position: absolute;
  right: 0;
  top: 3px;
  bottom: 20px;
  text-align: right;
  font-size: 14px;
  font-weight: 900;
  color: var(--color-high-text);
}
.pic-info .create-time {
  /*position: absolute;*/
  /*left: 0;*/
  /*right: 0;*/
  /*top: 20px;*/
  /*bottom: 0;*/
  /*text-align: center;*/
  font-size: 10px;

}
</style>
