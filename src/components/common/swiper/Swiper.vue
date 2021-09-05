<template>
  <div id="a-swiper">
    <div class="swiper" @touchstart="touchStart" @touchmove="touchMove" @touchend="touchEnd">
      <slot></slot>
    </div>
<!--    <slot name="indicator"></slot>-->
    <div class="indicator">
      <slot name="indicator" v-if="showIndicator && slideCount>1">
        <div v-for="(item,index) in slideCount" class="indi-item"
             :class="{active:index===currentIndex-1}"
             :key="index"></div>
      </slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "Swiper",
  props: {
    interval: {
      type: Number,
      default: 3000
    },
    animDuration: {
      type: Number,
      default: 300
    },
    moveRatio: {
      type: Number,
      default: 0.25
    },
    showIndicator: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      scrolling: false, //是否正在滚动
      slideCount:0, //元素个数
      totalWidth: 0, //swiper的宽度
      swiperStyle: {}, //swiper的样式
      currentIndex: 1, //当前index值
    }
  },
  methods: {
    //----------------------------触碰开始--------------------------
    touchStart(e){
      //1.若正在滚动，不可以拖动
      if(this.scrolling)
        return;
      //2.停止定时器
      this.stopTimer();
      //3.保存开始滚动的位置
      this.startX=e.touches[0].pageX;
    },
    //---------------------------触碰移动过程中---------------------------
    touchMove(e) {
      //计算用户拖动的距离
      this.currentX=e.touches[0].pageX;
      this.distance=this.currentX-this.startX;
      let currentPosition=-this.currentIndex*this.totalWidth;
      let moveDistance=this.distance+currentPosition;
      //设置当前位置
      this.setTransform(moveDistance);
    },
    //------------------------------触碰结束-------------------------------
    touchEnd(e) {
      //获取移动的距离
      let currentMove=Math.abs(this.distance);
      //判断最终的位置
      if(this.distance===0)
      {
        return;
      }
      else if (this.distance>0 && currentMove>this.totalWidth*this.moveRatio)
      {
        //向右移动超过0.25
        this.currentIndex--;
      }
      else if(this.distance<0 && currentMove>this.totalWidth*this.moveRatio)
      {
        //向左移动超过0.25
        this.currentIndex++;
      }
      //移动到正确的位置
      this.scrollContent(-this.currentIndex*this.totalWidth);
      //移动完成后重新启动定时器
      this.startTimer();
    },
    //----------------------操作dom，在dom前后添加slide-----------------------
    handleDom() {
      //1.获取要操作的元素
      let swiperEI=document.querySelector('.swiper');
      let slidesEIs=swiperEI.getElementsByClassName('slide');
      //2.保存个数
      this.slideCount=slidesEIs.length;
       //3.如果大于1，在前后分别添加一个slide
      if(this.slideCount>1)
      {
        let cloneFirst=slidesEIs[0].cloneNode(true);
        let cloneLast=slidesEIs[this.slideCount-1].cloneNode(true);
        swiperEI.insertBefore(cloneLast,slidesEIs[0]);
        swiperEI.append(cloneFirst);
        this.totalWidth=swiperEI.offsetWidth;
        this.swiperStyle=swiperEI.style;
      }
      //4、让swiper元素显示第一个，目前显示的是前面添加的最后一个元素
      this.setTransform(-this.totalWidth);
    },
    //---------------------------------启动定时器----------------------------
    startTimer() {
      this.playTimer=window.setInterval(()=> {
        this.currentIndex++;
        this.scrollContent(-this.currentIndex*this.totalWidth);
      },this.interval)
    },
    //--------------------------------------关闭定时器--------------------------------
    stopTimer() {
      window.clearInterval(this.playTimer);
    },
    //-----------------------------------滚到正确的位置------------------------------
    scrollContent(currentPosition) {
      //设置正在滚动
      this.scrolling=true;
      //开始滚动动画
      this.swiperStyle.transition='transform'+this.animDuration+'ms';
      this.setTransform(currentPosition);
      //判断滚动到的位置
      this.checkPosition();
      //4.滚动完成
      this.scrolling=false;
    },
    //----------------------------------设置滚动的位置------------------------------
    setTransform(position) {
      this.swiperStyle.transform=`translate3d(${position}px,0,0)`;
      this.swiperStyle['-webkit-transform']=`translate3d(${position}px),0,0`;
      this.swiperStyle['-ms-transform']=`translate3d(${position}px),0,0`;
    },
    //-----------------------校验正确的位置------------------------------------
    checkPosition() {
      window.setTimeout(()=>{
        //校验正确的位置
        this.swiperStyle.transition='0ms';
        if(this.currentIndex >= this.slideCount+1)
        {
          this.currentIndex=1;
          this.setTransform(-this.currentIndex*this.totalWidth);
        }
        else if(this.currentIndex <=0)
        {
          this.currentIndex=this.slideCount;
          this.setTransform(-this.currentIndex*this.totalWidth);
        }
        //2.结束移动后回调
        this.$emit('transitionEnd',this.currentIndex-1);
      },this.animDuration)
    }
  },
  mounted() {
    setTimeout(()=> {
      //1.操作dom
      this.handleDom();
      //2.启动定时器
      this.startTimer();
    },3000)
  }
}
</script>

<style scoped>
#a-swiper {
  overflow: hidden;
  position: relative;
}
.swiper {
  display: flex;
}
.indicator {
  display: flex;
  justify-content: center;
  position: absolute;
  width: 100%;
  bottom: 8px;
}
.indi-item {
  box-sizing: border-box;
  width: 8px;
  height: 8px;
  border-radius: 4px;
  background-color: var(--color-background);
  /*line-height: 8px;*/
  /*text-align: center;*/
  /*font-size: 12px;*/
  /*设置每个小itme之间的间距*/
  margin: 0 5px;
}
.indi-item.active {
  background-color: var(--color-tint);
}
</style>
