<template>
  <nav-bar>
    <div slot="left" class="back" @click="itemBack">
      <img src="../../../assets/img/common/back.svg" alt="">
    </div>
    <div slot="center" class="title">
      <div v-for="(item, index) in titles" :key="index"
           class="title-item" @click="titleClick(index)" :class="{ active: index === currentIndex }">
        {{ item }}
      </div>
    </div>
  </nav-bar>
</template>

<script>
    import NavBar from "@/components/common/navbar/NavBar";
    export default {
        name: "DetailNavBar",
        components: {
          NavBar
        },
      data() {
          return {
            titles: ['商品', '参数', '评价', '推荐'],
            currentIndex: 0
          }
      },
      methods: {
          itemBack() {
            this.$router.back()
          },
          titleClick(index) {
            this.currentIndex = index
            this.$emit('titleClick', index)
          }
      }
    }
</script>

<style scoped>
.title {
  display: flex;
  padding: 0 20px;
  font-size: 12px;
}

.title-item {
    flex: 1;
}

.back {
  margin-top: 8px;
}

.active {
  color: var(--color-tint);
}
</style>
