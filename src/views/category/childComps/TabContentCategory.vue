<template>
    <div class="con-category">
      <grid-view :cols="3" :line-space="15" v-if="subcategories.list">
        <div class="item" v-for="(item, index) in subcategories.list" :key="index">
          <a :href="item.link">
            <img :src="item.image" class="item-img" alt="">
            <div class="item-title">{{ item.title }}</div>
          </a>
        </div>
      </grid-view>
    </div>
</template>

<script>
    import GridView from "@/components/common/gridView/GridView";
    export default {
        name: "TabContentCategory",
        components: {
          GridView
        },
        props: {
          subcategories: {
            type: Object,
            default() {
              return {}
            }
          }
        }
    }
</script>

<style scoped>
  .item {
    text-align: center;
    font-size: 12px;
  }
  .item-img {
    width: 80%;
  }
  .item-title {
    margin-top: 15px;
  }
</style>
