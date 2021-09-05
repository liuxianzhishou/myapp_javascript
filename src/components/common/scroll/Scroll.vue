<template>
  <div ref="wrapper" class="wrapper">
    <slot></slot>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
export default {
  name: "Scroll",
  props: {
    probeType: {
      type: Number,
      default: 1
    },
    //是否监听滚动事件
    listenScroll: {
      type: Boolean,
      default: true
    },
    //列表的数据
    data: {
      type: Array,
      default: null
    },
    //是否监听滚动到底部的事件，用于上拉加载
    pullUp: {
      type: Boolean,
      default: false
    },
    //是否监听滚动到顶部的事件，用于下拉加载
    pullDown: {
      type: Boolean,
      default: false
    },
    //刷新scroll的延时时间
    refreshDelay: {
      type: Number,
      default: 20
    }
  },
  mounted() {
    //保证在dom渲染完毕后初始化better-scroll
    setTimeout(()=> {
      this.initScroll()
    },20)
  },
  methods: {
    //---------------------初始化-------------------------
    initScroll() {
      if(!this.$refs.wrapper)
        return;
      //better-scroll初始化
      this.scroll=new BScroll(this.$refs.wrapper, {
        probeType: this.probeType,
        click: true,
        pullUpLoad:this.pullUp
      })
      //监听滚动事件并回调到上级
      if(this.listenScroll)
      {
        this.scroll.on('scroll',(pos)=> {
          this.$emit('scroll',pos)
        })
      }
      //监听上拉到底部，用于上拉加载
      if(this.pullUp)
      {
        this.scroll.on('pullingUp',()=> {
          //滚动到底部
          this.$emit('pullingUp')
        })
      }
      //监听下拉到顶部，用于下拉刷新
      if(this.pullDown) {
        this.scroll.on('pullDownFresh',(pos)=> {
          if(pos.y > 50) {
            this.$emit('pullDownFresh')
          }
        })
      }
    },
    //----------------刷新-------------------
    refresh() {
      //代理better-scroll的refresh方法
      this.scroll && this.scroll.refresh()
      // console.log('调用refresh')
    },
    //-----------------滚动到哪里-----------------
    scrollTo(x,y,time) {
      //代理better-scroll的scrollTo方法
      this.scroll && this.scroll.scrollTo(x,y,time)
    },
    //--------------------完成上拉加载------------------
    finishPullUp() {
      //代理better-scroll的方法
      this.scroll && this.scroll.finishPullUp && this.scroll.finishPullUp()
    }
  },
  watch: {
    //监听数据的变化，延时一定时间后调用refresh方法重新计算，保证滚动正常
    data() {
      setTimeout(()=> {
        this.refresh()
      },this.refreshDelay)
    }
  }
}
</script>

<style scoped>

</style>
