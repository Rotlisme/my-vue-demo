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
  { name: 'site', path: 'order/site/:id', component: Site },
  { name: 'pay', path: 'order/pay/:id', component: Pay },
  { name: 'complete', path: 'order/complete', component: Complete },
]

let shopcart = [
  { name: 'shopcart', path: 'shopcart', component: Shopcart }
]
export default new Router({
  routes: [
    { name: 'login', path: '/login', component: Login },
    {
      name: 'shop', path: '/', component: Shop,
      children: [...goods, ...order, ...shopcart]
    }
  ]
})
