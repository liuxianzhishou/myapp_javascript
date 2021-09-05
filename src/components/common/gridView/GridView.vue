<template>
  <div class="grid-view" ref="gridView">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "GridView",
  props: {
    //默认--2列
    cols: {
      type: Number,
      default: 2
    },
    //默认水平方向外边距--8
    hMargin: {
      type: Number,
      default: 8
    },
    //默认垂直方向外边距--8
    vMargin: {
      type: Number,
      default: 8
    },
    itemSpace: {
      type: Number,
      default: 8
    },
    lineSpace: {
      type: Number,
      default: 8
    }
  },
  methods: {
    autoLayout() {
      let gridEI=this.$refs.gridView;
      let children=gridEI.children;
      //设置内边距
      gridEI.style.padding=`${this.vMargin}px ${this.hMargin}px`
      //计算item的宽度
      let itemWidth=(gridEI.clientWidth-2*this.hMargin-(this.cols-1)*this.itemSpace)/this.cols;
      for(let i=0;i<children.length;i++) {
        let item=children[i];
        item.style.width=itemWidth+'px';
        if((i+1)%this.cols !==0)
        {
          item.style.marginRight=this.itemSpace+'px';
        }
        if(i>=this.cols) {
          item.style.marginTop=this.lineSpace+'px';
        }
      }
    }
  },
  mounted() {
    setTimeout(this.autoLayout,20)
  },
  updated() {
    this.autoLayout();
  }
}
</script>

<style scoped>
.grid-view {
  display: flex;
/*  拆行*/
  flex-wrap: wrap;
}
</style>
