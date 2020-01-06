<template>
  <scroll>
    <div class="tab-menu">
      <ul>
        <li v-for="(item, index) in menuList"
            :key="index" @click="menuItemClick(index)"
            class="menu-item" :class="{active: index === currentIndex}">
          <p>{{ item.title }}</p>
        </li>
      </ul>
    </div>
  </scroll>
</template>

<script>
    import Scroll from "@/components/common/scroll/Scroll";
    export default {
        name: "TabMenu",
        components: {
          Scroll
        },
        data() {
          return {
            currentIndex: 0,
          }
        },
        props: {
          menuList: {
            type: Array,
            default() {
              return []
            }
          }
        },
      methods: {
          menuItemClick(index) {
            this.currentIndex = index
            this.$emit('TabMenuClick', index)
          }
      }
    }
</script>

<style scoped>
  .tab-menu {
    background-color: #eeeeee;
  }
  .menu-item {
    line-height: 38px;
    text-align: center;
  }
  .menu-item p {
    font-size: 12px;
  }
  .active {
    color: var(--color-high-text);
    background-color: #fff;
    font-weight: 600;
  }
</style>
