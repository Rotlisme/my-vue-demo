import Vue from 'vue'
import Router from 'vue-router'
import Login from '../components/account/login/Login.vue';
import Shop from '../components/shop/Shop.vue';
import List from '../components/shop/goods/List.vue';
import Detail from '../components/shop/goods/Detail.vue';
import Site from '../components/shop/order/Site.vue';
import Pay from '../components/shop/order/Pay.vue';
import Complete from '../components/shop/order/Complete.vue';
import Shopcart from '../components/shop/shopcart/Shopcart.vue';
Vue.use(Router);

let goods = [
  { name: 'list', path: 'goods/list', component: List },
  { name: 'detail', path: 'goods/detail/:id', component: Detail }
]

let order = [
  { name: 'site', path: 'order/site/:ids', component: Site },
  { name: 'pay', path: 'order/pay/:id', component: Pay },
  { name: 'complete', path: 'order/complete', component: Complete },
]

let shopcart = [
  { name: 'shopcart', path: 'shopcart', component: Shopcart }
]
let router = new Router({
  routes: [
    { name: 'login', path: '/login', component: Login },
    {
      name: 'shop', path: '/', component: Shop,
      children: [...goods, ...order, ...shopcart]
    }
  ]
})

let baidan = ['list', 'detail', 'shopcart'];
router.beforeEach((to, from, next) => {
  let isTrue = baidan.some(v => v == to.name);
  if (isTrue) {
    next();
    return;
  }
  Vue.prototype.$http.get(Vue.prototype.$api.isLogin).then(res => {
    let isLogin = false;

    // 已登陆
    if (res.data.code == 'logined') {
      isLogin = true;
    }
    if (to.name == 'login') {
      if (isLogin) {
        next({ name: 'list' });
      }
      else {
        next();
      }
    }
    if (to.name != 'login') {
      if (isLogin) {
        next();
      }
      else {
        next({ name: 'login', query: { next: to.fullPath } });
      }
    }

  })
}
)
export default router;
