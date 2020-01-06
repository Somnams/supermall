<template>
  <div id="category">
    <nav-bar class="nav-bar"><div slot="center">商品分类</div></nav-bar>
    <div class="content">

      <tab-menu class="con-menu" :menu-list="categoryList" @TabMenuClick="TabMenuClick"/>

      <scroll id="con-scroll"
              ref="scroll" :probe-type="3"
              @scroll="contentScroll" :pull-up-load="true">
        <tab-control :titles="['综合', '销量', '新品']"
                     ref="tabControl1"
                     @itemClick="itemClick"
                     class="tab-control" v-show="isFixed"/>
        <div>
          <tab-content-category :subcategories="showSub"/>
          <tab-control :titles="['综合', '销量', '新品']"
                       ref="tabControl2"
                       @itemClick="itemClick"/>
          <tab-content-detail :category-detail="showDeatil"/>
        </div>
      </scroll>
      <back-top @click.native="backTop" v-show="isShowBackTop"/>
    </div>
  </div>
</template>

<script>
  import NavBar from "@/components/common/navbar/NavBar";
  import TabMenu from "@/views/category/childComps/TabMenu";
  import Scroll from "@/components/common/scroll/Scroll";
  import TabContentCategory from "@/views/category/childComps/TabContentCategory";
  import TabContentDetail from "@/views/category/childComps/TabContentDetail";

  import {  backTopMixin, tabControlMixin } from "@/common/mixin";
  import { getCategory, getSubcategory, getCategoryDetail } from "@/network/category";

  export default {
    name: "Category",
    components: {
      NavBar,
      TabMenu,
      Scroll,
      TabContentCategory,
      TabContentDetail
    },
    data() {
      return {
        currentIndex: -1,
        categoryList: [],
        categoryData: {}
      }
    },
    mixins: [ backTopMixin , tabControlMixin],
    computed: {
      showSub() {
        if(this.currentIndex === -1) return {}
        return this.categoryData[this.currentIndex].subcategory
      },
      showDeatil() {
        if(this.currentIndex === -1) return []
        return this.categoryData[this.currentIndex].categoryDetail[this.currentType]
      }
    },
    created() {
      this._getCategory()
    },
    methods: {
      contentScroll(position) {
        this.listenerBack(position)
      },
      TabMenuClick(index) {
        this._getSubcategory(index)
      },
      _getCategory() {
        getCategory().then(res => {
          this.categoryList = res.data.category.list
          //初始化每个类别的数据
          for(let i = 0; i < this.categoryList.length; i++) {
            this.categoryData[i] = {
              subcategory: {},
              categoryDetail: {
                'pop': [],
                'new': [],
                'sell': []
              }
            }
          }
          this._getSubcategory(0)
        })
      },
      _getSubcategory(index) {
        this.currentIndex = index
        const mailKey = this.categoryList[index].maitKey
        getSubcategory(mailKey).then(res => {
          this.categoryData[index].subcategory = res.data
          this.categoryData = {...this.categoryData}
          this._getCategoryDetail('pop')
          this._getCategoryDetail('new')
          this._getCategoryDetail('sell')
        })
      },
      _getCategoryDetail(type) {
        const miniWallKey = this.categoryList[this.currentIndex].miniWallkey
        getCategoryDetail(miniWallKey, type).then(res => {
          this.categoryData[this.currentIndex].categoryDetail[type] = res
          this.categoryData = {...this.categoryData}
        })
      }
    }
  }
</script>

<style scoped>
  #category {
    height: 100vh;
    position: relative;
  }
  .nav-bar {
    top: 0;
    background-color: var(--color-tint);
    color: white;
  }
  .tab-control {
    position: sticky;
    top: 44px;
    z-index: 9;
  }
  .content {
    display: flex;
    height: calc(100% - 44px - 49px);
    overflow: hidden;
  }
  .content .con-menu {
    flex: 1;
  }
  .content #con-scroll {
    flex: 3;
  }
</style>
