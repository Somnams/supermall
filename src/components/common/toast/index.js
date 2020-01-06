//以插件形式封装Toast
import Toast from "./Toast";
const obj = {}

obj.install = function (Vue) {
  //1.创建组建构造器
  const toastContrustor = Vue.extend(Toast)
  //2.创建组建对象
  const toast = new toastContrustor()
  //3.将对象挂载到某一元素上
  toast.$mount(document.createElement('div'))
  //4.这时div就是toast.$el
  document.body.appendChild(toast.$el)

  Vue.prototype.$toast = toast
}

export default obj
