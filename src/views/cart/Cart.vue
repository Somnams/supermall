<template>
  <div class="cart">
    <nav-bar class="cart-nav">
      <div slot="center">购物车({{ cartLength }})</div>
    </nav-bar>
    <cart-list/>
    <cart-button-bar @click.native="checkedAll"/>
  </div>
</template>

<script>
  import NavBar from "@/components/common/navbar/NavBar";
  import CartList from "@/views/cart/childComps/CartList";
  import CartButtonBar from "@/views/cart/childComps/CartButtonBar";
  import { mapGetters } from "vuex"

  export default {
    name: "Cart",
    components: {
      NavBar,
      CartList,
      CartButtonBar
    },
    computed: {
      ...mapGetters([
        'cartLength'
      ])
    },
    methods: {
      checkedAll() {

      }
    }
  }
</script>

<style scoped>
  .cart {
    height: 100vh;
  }
  .cart-nav {
    background-color: var(--color-tint);
    color: #ffffff;
  }
</style>
