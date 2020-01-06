//mutations的唯一目的是修改state中的状态
//mutations中的每个方法功能尽可能单一一点

import {ADD_COUNT, ADD_TO_CART} from "@/store/mutations_types";

export default {
  [ADD_COUNT](state, payload) {
    payload.count += 1
  },
  [ADD_TO_CART](state, payload) {
    payload.checked = false
    state.cartList.push(payload)
  }
}
