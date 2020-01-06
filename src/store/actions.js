import {ADD_COUNT, ADD_TO_CART} from "@/store/mutations_types";

export default {
  addCart(context, payload) {
   return new Promise((resolve) => {
     //多次加入同一件商品应该只改变数量值
     //查找数组之前是否有该商品
     let oldProduct = context.state.cartList.find(item => item.iid === payload.iid)
     if(oldProduct) {
       context.commit(ADD_COUNT, oldProduct)
       resolve("加入购物车成功～")
     }else {
       payload.count = 1
       context.commit(ADD_TO_CART, payload)
       resolve("加入购物车成功～")
     }
   })
  }
}
