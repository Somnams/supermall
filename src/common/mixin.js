import {debounce} from "@/common/utils";
import BackTop from "@/components/content/backTop/BackTop";
import TabControl from "@/components/content/tabControl/TabControl";

export const itemListenerMinxin = {
  data() {
    return {
      itemImgListener: null,
      refresh: null
    }
  },
  mounted() {
    this.refresh = debounce(this.$refs.scroll.refresh, 200)
    this.itemImgListener = () => {
      this.refresh()
    }
    this.$bus.$on('itemImgLoad', this.itemImgListener)
  }
}

export const backTopMixin = {
  components: {
    BackTop
  },
  data() {
    return {
      isShowBackTop: false,
      isFixed: false
    }
  },
  methods: {
    backTop() {
      this.$refs.scroll.scrollTo(0, 0, 200)
    },
    listenerBack(position) {
      this.isShowBackTop = (-position.y) > 1000
      this.isFixed = (-position.y) > this.tabOffsetTop
    }
  }
}

export const tabControlMixin = {
  components: {
    TabControl
  },
  data() {
    return {
      currentType: 'pop'
    }
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
    }
  }
}
