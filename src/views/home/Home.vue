<template>
  <div id="home">
<!--    最上方导航栏-->
<!--    <NavBar class="home-nav"><div slot="mid">购物街</div></NavBar>-->
<!--    时间选项卡-->
    <TabControl class="tab-control-fixed"
                :titles="['now','recent','previous']"
                v-show="fixedShow"
                ref="tabFixed"
                @itemClk="tabClick"></TabControl>
<!--    滚动插件-->
    <Scroll class="content"
            :probe-type="3"
            :data="deliverPics"
            :pull-up="true"
            @scroll="contentScroll"
            @pullingUp="loadMore"
            ref="scroll">
      <div>
        <!--      轮播图-->
        <HomeSwiper :banners="banners"
                    ref="aSwiper"
                    @swiperLoad="swiperLoad">

        </HomeSwiper>
        <!--      时间选项卡-->
        <TabControl class="tab-control"
                    :titles="['now','recent','previous']"
                    @itemClk="tabClick"
                    ref="tabControl">

        </TabControl>
        <!--      图片列表展示-->
        <PicList :pics="deliverPics"></PicList>
      </div>
    </Scroll>
    <back-top class="back-top"
              @backTop="backTop"
              v-show="backTopShow">
      <img src="~assets/img/common/top.png" alt="">
    </back-top>
  </div>
</template>

<script>
// @ is an alias to /src
import HomeSwiper from "./childComps/HomeSwiper";
import TabControl from "../../components/content/tabControl/TabControl";
import Scroll from "../../components/common/scroll/Scroll";
import PicList from "./childComps/PicList";
import BackTop from "../../components/content/backTop/BackTop";
import {getHomeMultidata, getHomeList} from "@/network/home";
import {BACK_TOP_DISTANCE} from "@/common/const";

export default {
  name: 'Home',
  components: {
    HomeSwiper,
    Scroll,
    TabControl,
    PicList,
    BackTop
  },
  data() {
    return {
      banners: [],
      pics: {
        'now': {page:0, list: []},
        'recent': {page: 0, list: []},
        'previous': {page: 0, list: []},
      },
      currentType: 'now',//当前显示的页面
      backTopShow: false,//默认不显示返回顶部按钮
      fixedShow:false,//默认不显示tab-control-fixed
      fixedPos:0,//scroll滑到什么位置时，tab-control-fixed显示
      saveY:0,//保存离开时的y值，保证再回来的时候还是这个位置
      savaFixedShow:false,
    }
  },
  computed: {
    deliverPics() {
      // console.log('deliver数据：'+this.pics[this.currentType].list);
      return this.pics[this.currentType].list;
    }
  },
  created() {
    //1.请求轮播图数据
    this.getHomeMultidata();
    //2.请求商品列表数据
    this.getHomeList('now');
    this.getHomeList('recent');
    this.getHomeList('previous');
  },
  mounted() {
    //3.监听图片列表中的图片是否加载完成
    //加入防抖处理
    const refresh=this.debounce(this.$refs.scroll.refresh,200);
    this.$bus.$on('picLoad',()=>{
      refresh();
    })
  },
  activated() {
    this.$refs.aSwiper.startTimer();
    //回来时还是上次离开的位置
    this.$refs.scroll.scrollTo(0,this.saveY,0)
  },
  deactivated() {
    this.$refs.aSwiper.stopTimer();
    //保存离开时的y值
    this.saveY=this.$refs.scroll.y
  },
  methods: {
    //[now, recent, previous]被点击
    tabClick(index) {
      // console.log(index)
      switch (index)
      {
        case 0:
          this.currentType='now'
          break
        case 1:
          this.currentType='recent'
          break
        case 2:
          this.currentType='previous'
          break
      }
      //将index传给tab-control-fixed
      this.$refs.tabFixed.currentIndex=index;
      //同时将index传给tab-control自身
      this.$refs.tabControl.currentIndex=index;
    },

    contentScroll(pos) {
      // console.log(pos);
      //判断backTop是否显示
      this.backTopShow=pos.y<-BACK_TOP_DISTANCE
      //判断tab-control-fixed是否显示
      this.fixedShow=pos.y<-this.fixedPos
    },
    loadMore() {
      this.getHomeList(this.currentType)
    },
    //刷新频繁防抖处理
    debounce(func,delay) {
      let timer=null;
      return function (...args) {
        if(timer)
          clearTimeout(timer)
        timer=setTimeout(()=> {
          func.apply(this,args)
        },delay)
      }
    },
    //返回顶部
    backTop() {
      this.$refs.scroll.scrollTo(0,0,300)
    },
    //监听轮播图加载完成，获取tab-control的值，并保存
    swiperLoad() {
      // console.log(this.$refs.tabControl.$el.offsetTop)
      this.fixedPos=this.$refs.tabControl.$el.offsetTop;
    },
    /**
     * 网络请求相关的方法
     */
    getHomeMultidata() {
      getHomeMultidata().then(res => {
        this.banners = res;
      })
    },
    getHomeList(type) {
      const newPage=this.pics[type].page*10;
      getHomeList(type,newPage).then(res => {
        this.pics[type].list.push(...res);
        this.pics[type].page++;
        // console.log(res);
        this.$refs.scroll.finishPullUp();
      })
    }
  }
}
</script>

<style scoped>
#home {
  height: 100vh;
}
.content {
  overflow: hidden;
  position: absolute;
  top: 0;
  bottom: 49px;
  left: 0;
  right: 0;
}
/*.home-nav {*/
/*  background-color: var(--color-tint);*/
/*  color: #fff;*/
/*  font-weight: 700;*/
/*}*/
.back-top {
  position: fixed;
  bottom: 55px;
  right: 10px;
}
.tab-control-fixed {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
}
</style>
