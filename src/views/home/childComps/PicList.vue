<template>
  <GridView>
    <PicListItem v-for="(item,index) in pics"
                 :key="index"
                 :pic="item">
    </PicListItem>
  </GridView>
</template>

<script>
import GridView from "../../../components/common/gridView/GridView";
import PicListItem from "./PicListItem";
export default {
  name: "PicList",
  components: {
    GridView,
    PicListItem
  },
  props: {
    pics: {
      type:Array,
      default:()=>[]
    }
  }
}
</script>

<style scoped>

</style>
