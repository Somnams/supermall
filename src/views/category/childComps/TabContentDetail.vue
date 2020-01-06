<template>
    <div class="con-detail">
      <grid-view>
        <div v-for="(item, index) in categoryDetail" :key="index">
          <goods-list-item :goods="item"/>
        </div>
      </grid-view>
    </div>
</template>

<script>
    import GridView from "@/components/common/gridView/GridView";
    import GoodsListItem from "@/components/content/goods/GoodsListItem";
    export default {
        name: "TabContentDetail",
        components: {
          GridView,
          GoodsListItem
        },
        props: {
            categoryDetail: {
              type: Array,
              default() {
                return []
              }
            }
        }
    }
</script>

<style scoped>

</style>
