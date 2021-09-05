<template>
  <div class="detail" v-if="detailMsg!=null">
    <Scroll class="content"
            :probe-type="3"
            :data="[detailMsg,detailId]"
            :refresh-delay="300"
            ref="scroll">
      <div>
        <ReturnPage class="return-page" @returnPage="returnPage">
          <img src="~assets/img/common/back.svg">
        </ReturnPage>
        <img  :src="detailMsg.imgSrc" alt="">
        <div class="title-center">图片信息</div>
        <div class="alter-box">
          <TagsInput2 :source.sync="deliverTags"
                      :is-alter="isAlter"
                      @addText="updateFigure"
                      @delText="updateFigure">
          </TagsInput2>
        </div>
        <button class="alter-btn"
                @click="updateSQL"
                v-show="true">确定
        </button>
      </div>
    </Scroll>
<!--    <h1>hello</h1>-->
  </div>
</template>

<script>
import axios from "axios";
import Scroll from "../../components/common/scroll/Scroll";
import TagsInput2 from "../../components/common/tagging/TagsInput2";
import ReturnPage from "../../components/content/returnPage/ReturnPage";
import {getDetail,updateSQL} from "../../network/detail";

export default {
  name: "Detail",
  components: {
    Scroll,
    ReturnPage,
    TagsInput2
  },
  data() {
    return {
      detailId: '',
      detailMsg: null,
      isAlter: true,//默认不修改
      updateMsg: {
        'imgId': this.detailId,
        'imgType':'',
        'imgPrefer':0,
        'imgCate':'',
        'imgFigure':'',
        'imgCount': '',
        'imgCreateTime':''
      }
    }
  },
  computed: {
    //将角色标签数据转换成数组发送到子组件
    deliverTags() {
      //正则表达式，根据中文和英文逗号都进行分割
      return this.detailMsg.imgFigure.split(/[,，]/)
    }
  },
  methods: {
    //网络请求得到数据
    getDetailData() {
      //1.获取detailId
      const detailId=this.$route.query.detailId;
      this.detailId=detailId;
      //2.请求数据
      getDetail(detailId).then(res => {
        this.detailMsg=res;
      })
    },
    //网络请求修改sql数据
    updateSQL() {
      this.updateMsg.imgId=this.detailId;
      //发送数据
      updateSQL(this.updateMsg).then(res => {
        console.log('成功发送数据到后端')
      })
    },
    //修改人物标签数据
    updateFigure(newFigure) {
      this.updateMsg.imgFigure=newFigure.toString()
      // console.log(this.updateMsg)
    },
    //判断是否要修改信息
    selectAlter() {
      this.isAlter=true
    },
    //返回上一页
    returnPage() {
      this.$router.back()
    },
  },
  created() {
    this.getDetailData();
  }
}
</script>

<style scoped>
.detail {
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
.return-page {
  position: fixed;
  left: 5px;
  top: 5px;
  background-color: rgba(241, 169, 169, 0.3);
}
.title-center {
  position: relative;
  text-align: center;
  height: 30px;
  margin: 0 40%;
  border-bottom: 2px solid var(--color-tint);
}
.pic-box {
  line-height: 30px;
  padding-left: 5%;
}
.info-box {
  width: 60%;
  line-height: 30px;
  padding-left: 5%;
}
.alter-box {
  display: flex;
  align-items: center;
  /*justify-content: center;*/
  margin-bottom: 100px;
}
/*.btn {*/
/*  position: relative;*/
/*  margin-left: 50%;*/
/*}*/
</style>
