<template>
    <div class="button-bar">
      <div class="check-area">
        <check-button class="checked" :is-checked="isSelectAll" @click.native="selectAll"/>
        <span>全选</span>
      </div>

      <div class="check-area price">
        合计:{{ totalPrice }}
      </div>

      <div class="calculate check-area" @click="calcClick">
        去结算:({{ totalCount }})
      </div>
    </div>
</template>

<script>
    import CheckButton from "@/components/content/checkButton/CheckButton";
    import { mapGetters } from 'vuex';
    export default {
        name: "CartButtonBar",
        components: {
          CheckButton
        },
        computed: {
          ...mapGetters([
            'cartList'
          ]),
          totalPrice() {
            return "￥" + this.cartList.filter(item => {
              return item.checked
            }).reduce((preValue, item) => {
              return preValue + item.price * item.count
            }, 0)
          },
          totalCount() {
            return this.cartList.filter(item => item.checked).length
          },
          isSelectAll() {
            // return !(this.cartList.filter(item => !item.checked).length)
            if(this.cartList.length === 0) return false
            return !this.cartList.find(item => !item.checked)
          }
        },
        methods: {
          selectAll() {
            if(this.isSelectAll) {
              this.cartList.forEach(ele => ele.checked = false)
            }else {
              this.cartList.forEach(ele => ele.checked = true)
            }
          },
          calcClick() {
            if(!this.isSelectAll) {
              this.$toast.show('您还没有选择商品')
            }
          }
      }
    }
</script>

<style scoped>
  .button-bar {
    width: 100%;
    display: flex;
    height: 40px;
    background-color: #f6f6f6;
    font-size: 14px;
  }
  .check-area {
    display: flex;
    padding: 10px 0 0 8px;
  }
  .checked {
    margin-right: 5px;
    width: 20px;
  }
  .price {
    flex: 1;
  }
  .calculate {
    color: white;
    width: 100px;
    background-color: var(--color-tint);
  }
</style>
