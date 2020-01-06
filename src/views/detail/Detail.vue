 <template>
    <div id="detail">
      <detail-nav-bar class="detail-nav" @titleClick="titleClick"
                      :currentIndex="currentIndex" ref="nav"/>
      <scroll class="detail-scroll" ref="scroll"
              :probe-type="3"
              @scroll="contentScroll">
        <detail-swiper ref="base" :top-images="topImages"/>
        <detail-base-info :goods="goods"/>
        <detail-shop-info :shop="shop"/>
        <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"/>
        <detail-param-info ref="param" :param-info="paramInfo"/>
        <detail-comment-info ref="comment" :comment-info="commentInfo"/>
        <detail-recommend-info ref="recommend" :recommends="recommends"/>
      </scroll>
      <back-top @click.native="backTop" v-show="isShowBackTop"/>
      <detail-bottom-bar @addToCart="addToCart"/>
    </div>
</template>

<script>
    import DetailNavBar from "@/views/detail/childComps/DetailNavBar";
    import DetailSwiper from "@/views/detail/childComps/DetailSwiper";
    import DetailBaseInfo from "@/views/detail/childComps/DetailBaseInfo";
    import DetailShopInfo from "@/views/detail/childComps/DetailShopInfo";
    import DetailGoodsInfo from "@/views/detail/childComps/DetailGoodsInfo";
    import DetailParamInfo from "@/views/detail/childComps/DetailParamInfo";
    import DetailCommentInfo from "@/views/detail/childComps/DetailCommentInfo";
    import DetailRecommendInfo from "@/views/detail/childComps/DetailRecommendInfo";
    import Scroll from "@/components/common/scroll/Scroll";
    import {getDetail, getRecommend, Goods, Shop, GoodsParam} from "@/network/detail";
    import {itemListenerMinxin, backTopMixin} from "@/common/mixin";
    import {debounce} from "@/common/utils";
    import DetailBottomBar from "@/views/detail/childComps/DetailBottomBar";
    import { mapActions } from "vuex";

    export default {
      name: "Detail",
      components: {
          DetailBottomBar,
          DetailNavBar,
          DetailSwiper,
          DetailBaseInfo,
          DetailShopInfo,
          DetailGoodsInfo,
          DetailParamInfo,
          DetailCommentInfo,
          DetailRecommendInfo,
          Scroll,
      },
      mixins: [itemListenerMinxin, backTopMixin],
      data() {
          return {
            iid: null,
            topImages: [],
            goods: {},
            shop: {},
            detailInfo: {},
            paramInfo: {},
            commentInfo: {},
            recommends: [],
            themeTopYs: [],
            getThemeTopY: null,
            currentIndex: 0
          }
        },
      created() {
          this.iid  = this.$route.params.iid

          getDetail(this.iid).then(res => {
            const data = res.result
            this.topImages = data.itemInfo.topImages

            this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)

            this.shop = new Shop(data.shopInfo)

            this.detailInfo = data.detailInfo

            this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)

            if(data.rate.cRate !== 0) {
              this.commentInfo = data.rate.list[0]
            }
          })

          getRecommend().then(res => {
            this.recommends = res.data.list
          })

          this.getThemeTopY = debounce(() => {
            this.themeTopYs = []

            this.themeTopYs.push(0)
            this.themeTopYs.push(this.$refs.param.$el.offsetTop)
            this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
            this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
            this.themeTopYs.push(Number.MAX_VALUE)
          }, 100)
        },
      mounted() {},
      destroyed() {
          this.$bus.$off('itemImgLoad', this.itemImgListener)
      },
      methods: {
        ...mapActions([
          'addCart'
        ]),
        imageLoad() {
            this.refresh()
            this.getThemeTopY()
          },
        titleClick(index) {
          this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 200)
        },
        contentScroll(position) {
          //1.获取y值
          const positionY = -position.y
          //2.与主题中的值进行比较
         let length = this.themeTopYs.length
          for(let i = 0; i < length - 1; i++) {
            // if((this.currentIndex !== i && i < length-1 && positionY > this.themeTopYs[i] && positionY < this.themeTopYs[i+1])
            //   || (i === length-1 && positionY > this.themeTopYs[i])) {
            //   console.log(i);
            // }
            if(this.currentIndex !== i && (positionY >= this.themeTopYs[i] && positionY <= this.themeTopYs[i+1])) {
              this.currentIndex = i
              this.$refs.nav.currentIndex = this.currentIndex
            }
          }

          this.listenerBack(position)
        },
        addToCart() {
          //1.获取购物车需要展示的商品信息
          const product = {}
          product.image = this.topImages[0]
          product.title = this.goods.title
          product.desc = this.goods.desc
          product.price = this.goods.realPrice

          product.iid = this.iid
          //2.将商品加入购物车，要使用Vuex
          this.addCart(product).then(res => {
            this.$toast.show(res)
          })
        }
      }
    }
</script>

<style scoped>
  #detail {
    position: relative;
    z-index: 9;
    background-color: #fff;
    height: 100vh;
  }
  .detail-nav {
    position: relative;
    z-index: 9;
    background-color: #fff;
  }
  .detail-scroll {
    height: calc(100% - 44px);
  }
</style>
