import Vue from "vue";
export default {

    // 定义状态, 相当于data数据
    state: {
        cart: JSON.parse(localStorage.getItem('cart')) || {}, // 数据结构预览: { 153: 5, 154: 10, 155: 12 }, ID为key, 数量为value
        totalPrice: 0
    },
    // 定义修改状态的方法, 这里的方法需要通过store.commit(方法名称, 参数)
    mutations: {

        // 这里的方法第一个参数固定为state, 由vuex类库固定传递, 第二个参数由方法调用者自递, 可传可不传
        modify(state, data) {
            let { id, num } = data; // es6的语法, 解构里面的id与num值
            // state.cart[id] = num;   // 根据id, 修改对应的购买数量值
            Vue.set(state.cart, id, num);
            localStorage.setItem('cart', JSON.stringify(state.cart));
        },
        del(state, id) {
            Vue.delete(state.cart, id);
            localStorage.setItem('cart', JSON.stringify(state.cart));
        },
        totalPrice(state, sum) {
            state.totalPrice = sum;
        }
    },
    getters: {
        total(state) {
            return Object.values(state.cart).reduce((sum, v) => sum += v, 0);
        }
    }

};