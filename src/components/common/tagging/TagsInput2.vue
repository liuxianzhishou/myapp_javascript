<template>
  <div>
    <p class="figure">角色：</p>
    <div class="input tags-wrap">
      <div class="tags"
           transition="tags"
           :style="{backgroundColor: bgc[item.bgc_no]}"
           v-for="(item,index) in dis_source"
           :key="item.index">
        <span class="content">{{item.text}}</span>
        <span class="del"
              v-show="isAlter"
              :key
              @click="del(index, false)">&times;
        </span>
      </div>
      <input class="tags-input"
             type="text"
             placeholder="标签，按 enter 创建"
             v-model="text"
             v-show="isAlter"
             @keyup.enter="add(text)"
             @keydown.delete="del(source.length - 1, true)">
    </div>
  </div>
</template>

<script>
export default {
  name: "TagsInput2",
  props: {
    source: {
      type: Array,
      default: []
    },
    isAlter: {
      type:Boolean,
      default: true
    }
  },
  data() {
    var dis_source = []
    var newFigure= []
    this.source.forEach(function (item) {
      var obj = {
        text: item,
        bgc_no: Math.ceil(Math.random() * 10) - 1
      }
      dis_source.push(obj)
      newFigure.push(item)
    })
    return {
      text: '',
      bgc: ['#e961b4', '#ed664b', '#7b6ac7', '#56abd1', '#f7af4c', '#fe5467', '#52c7bd', '#a479b7', '#cb81ce', '#5eabc5'],
      dis_source: dis_source,
      newFigure
    }
  },
  methods: {
    add(text){
      if(text != ''){
        var count = this.source.length
        this.$set(this.source,count, text)
        this.$set(this.dis_source,count, {
          text: text,
          bgc_no: Math.ceil(Math.random() * 10) - 1
        })
        this.$set(this.newFigure,count, text)
        this.text = ''
        this.$emit('addText',this.newFigure)
      }
    },
    del(index, way){
      if(way){
        if(index >=0 && this.text == ''){
          this.source.splice(index, 1)
          this.dis_source.splice(index, 1)
          this.newFigure.splice(index,1)
        }
      }else {
        this.source.splice(index, 1)
        this.dis_source.splice(index, 1)
        this.newFigure.splice(index,1)
      }
      this.$emit('delText',this.newFigure)
    }
  }
}
</script>

<style scoped>
.figure {
  width: 100%;
  margin: 5px 5px 5px 20px;
  line-height: 30px;
}
/*//输入框tags*/
.tags-wrap{
  width: 50%;
  outline: none;
  height: 80px;
}
tags-wrap::after{
   content: "";
   display: block;
   height: 0;
   clear: both;
 }
.tags, .tags-input{
  position: relative;
  float: left;
  color: #fff;
  line-height: 28px;
  margin: 0 4px 4px 10px;
  padding: 0 22px 0 10px;
  border-radius: 6px;
}
.content{
  line-height: 28px;
}
.del{
  width: 22px;
  height: 28px;
  text-align: center;
  cursor: pointer;
  position: absolute;
  top: -1px;
  right: 0;
}
.tags-input{
  font-size: 14px;
  padding: 0;
  background-color: inherit;
  border: 1px solid var(--color-tint);
  color: inherit;
  width: 10em;
}
</style>
