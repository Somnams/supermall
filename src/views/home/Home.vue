<template>
  <div id="home" class="wrapper">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <tab-control :titles="['流行', '新款', '精选']"
                 @itemClick="itemClick"
                 ref="tabControl1" class="tab-control"
                 v-show="isFixed"/>
    <scroll class="content" ref="scroll" :probe-type="3"
    @scroll="contentScroll" :pull-up-load="true" @pullingUp="loadMore">
      <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"/>
      <recommend-view :recommends="recommends"/>
      <feature-view/>
      <tab-control :titles="['流行', '新款', '精选']"
                   @itemClick="itemClick" ref="tabControl2" />
      <goods-list :goods-list="showGoods"/>
    </scroll>
    <back-top @click.native="backTop" v-show="isShowBackTop"/>
  </div>
</template>

<script>
    import NavBar from "@/components/common/navbar/NavBar";
    import HomeSwiper from "./childComps/HomeSwiper"
    import RecommendView from "./childComps/RecommendView";
    import FeatureView from "./childComps/FeatureView";
    import GoodsList from "@/components/content/goods/GoodsList"
    import TabControl from "@/components/content/tabControl/TabControl";
    import Scroll from "@/components/common/scroll/Scroll";

    import {getHomeMultidata,
            getHomeGoods} from "@/network/home";
    import {backTopMixin, itemListenerMinxin } from "@/common/mixin";

    export default {
        name: "home",
        components: {
            NavBar,
            HomeSwiper,
            RecommendView,
            FeatureView,
            GoodsList,
            TabControl,
            Scroll,
        },
        mixins: [itemListenerMinxin, backTopMixin],
        data(){
          return {
              banners: [],
              recommends: [],
              goods: {
                  'pop': {page: 0, list: []},
                  'new': {page: 0, list: []},
                  'sell': {page: 0, list: []},
              },
              currentType: 'pop',
              tabOffsetTop: 0,
          }
        },
        computed: {
            showGoods() {
                return this.goods[this.currentType].list
            }
        },
        created() {
            this.getHomeMultidata()
            this.getHomeGoods('pop')
            this.getHomeGoods('new')
            this.getHomeGoods('sell')
        },
        mounted() {},
        deactivated() {
          this.$bus.$off('itemImgLoad', this.itemImgListener)
        },
        methods: {
            itemClick(index) {
              switch (index) {
                case 0:
                  this.currentType = 'pop'
                  break
                case 1:
                  this.currentType = 'new'
                  break
                case 2:
                  this.currentType = 'sell'
                  break
              }
              this.$refs.tabControl1.currentIndex = index;
              this.$refs.tabControl2.currentIndex = index;
            },
            contentScroll(position) {
              this.listenerBack(position)
            },
            loadMore() {
                this.getHomeGoods(this.currentType)
            },
            swiperImageLoad() {
              this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop
            },
            //
            getHomeMultidata(){
                getHomeMultidata().then(res => {
                    this.banners = res.data.banner.list;
                    this.recommends = res.data.recommend.list;
                })
            },
            getHomeGoods(type){
                const page = this.goods[type].page + 1
                getHomeGoods(type, page).then(res => {
                    this.goods[type].list.push(...res.data.list)
                    this.goods[type].page += 1

                    this.$refs.scroll.finishPullUp()
                })
            }
        }
    }
</script>

<style scoped>
  #home {
    height: 100vh;
    position: relative;
  }
  .home-nav {
    background-color: var(--color-tint);
    color: #fff;
  }
  .tab-control {
    position: sticky;
    top: 44px;
    z-index: 9;
  }
  .content {
    overflow: hidden;
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }
</style>
