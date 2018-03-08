<template>
    <div>
        <div class="section">
            <div class="location">
                <span>当前位置：</span>
                <router-link :to="{name: 'goodsList'}">首页</router-link>&gt;
                <router-link :to="{ name: 'shopcart' }">购物车</router-link>&gt;
                <router-link to="">提交订单</router-link>
            </div>
        </div>

        <div class="section">
            <div class="wrapper">
                <div class="bg-wrap">
                    <!-- 头部进度 -->
                    <div class="cart-head clearfix">
                        <h2>
                            <i class="iconfont icon-cart"></i>我的购物车</h2>
                        <div class="cart-setp">
                            <el-steps :space="300" :active="1" finish-status="success">
                                <el-step title="放进购物车"></el-step>
                                <el-step title="填写订单信息"></el-step>
                                <el-step title="支付/确认订单"></el-step>
                            </el-steps>
                        </div>
                    </div>

                    <!-- 大表单 -->
                    <div class="cart-box">
                        <h2 class="slide-tit">
                            <span>1、收货地址</span>
                        </h2>
                        <form id="orderForm" name="orderForm" @submit="submit">
                            <div class="form-box address-info">
                                <dl class="form-group">
                                    <dt>收货人姓名：</dt>
                                    <dd>
                                        <input name="book_id" id="book_id" type="hidden" value="0">
                                        <input v-model="form.accept_name" name="accept_name" id="accept_name" type="text" class="input" datatype="s2-20" sucmsg=" ">
                                        <span class="Validform_checktip">*收货人姓名</span>
                                    </dd>
                                </dl>
                                <dl class="form-group">
                                    <dt>所属地区：</dt>
                                    <dd>
                                        省市区三级联动
                                    </dd>
                                </dl>
                                <dl class="form-group">
                                    <dt>详细地址：</dt>
                                    <dd>
                                        <input v-model="form.address" name="address" id="address" type="text" class="input" datatype="*2-100" sucmsg=" ">
                                        <span class="Validform_checktip">*除上面所属地区外的详细地址</span>
                                    </dd>
                                </dl>
                                <dl class="form-group">
                                    <dt>手机号码：</dt>
                                    <dd>
                                        <input v-model="form.mobile" name="mobile" id="mobile" type="text" class="input" datatype="m" sucmsg=" ">
                                        <span class="Validform_checktip">*收货人的手机号码</span>
                                    </dd>
                                </dl>
                                <dl class="form-group">
                                    <dt>电子邮箱：</dt>
                                    <dd>
                                        <input v-model="form.email" name="email" id="email" type="text" class="input" value="">
                                        <span class="Validform_checktip">方便通知订单状态，非必填</span>
                                    </dd>
                                </dl>
                                <dl class="form-group">
                                    <dt>邮政编码：</dt>
                                    <dd>
                                        <input v-model="form.post_code" name="post_code" id="post_code" type="txt" class="input code">
                                        <span class="Validform_checktip">所在地区的邮政编码，非必填</span>
                                    </dd>
                                </dl>
                            </div>
                            <h2 class="slide-tit">
                                <span>2、支付方式</span>
                            </h2>
                            <ul class="item-box clearfix">
                                <!-- 我们后台只有一个支付方式, 在线支付 -->
                                <li>
                                    <label>
                                        <el-radio v-model="form.payment_id" label="6">在线支付</el-radio>
                                    </label>
                                </li>
                            </ul>
                            <h2 class="slide-tit">
                                <span>3、配送方式</span>
                            </h2>
                            <ul class="item-box clearfix">
                                <!--取得一个DataTable-->
                                <li>
                                    <label>
                                        <el-radio v-model="form.express_id" label="1">顺丰</el-radio>
                                    </label>
                                </li>
                                <li>
                                    <label>
                                        <el-radio v-model="form.express_id" label="2">圆通</el-radio>
                                    </label>
                                </li>
                                <li>
                                    <label>
                                        <el-radio v-model="form.express_id" label="3">韵达</el-radio>
                                    </label>
                                </li>
                            </ul>

                            <!-- 商品列表 -->
                            <h2 class="slide-tit">
                                <span>4、商品清单</span>
                            </h2>
                            <div class="line15"></div>
                            <table width="100%" border="0" align="center" cellpadding="8" cellspacing="0" class="cart-table">
                                <tbody>
                                    <tr>
                                        <th colspan="2" align="left">商品信息</th>
                                        <th width="84" align="left">单价</th>
                                        <th width="84" align="center">购买数量</th>
                                        <th width="104" align="left">金额(元)</th>
                                    </tr>
                                    <tr v-for="item in goodsList" :key="item.id">
                                        <td width="68">
                                            <router-link :to="{name:'detail',params:{id:item.id}}">
                                                <img class="img" :src="item.img_url">
                                            </router-link>
                                        </td>
                                        <td>
                                            <router-link to="">
                                                {{item.title}}
                                            </router-link>
                                        </td>
                                        <td>
                                            <span class="red">
                                                ￥{{item.sell_price}}
                                            </span>
                                        </td>
                                        <td align="center">{{$store.state.cart[item.id]}}</td>
                                        <td>
                                            <span class="red">
                                                ￥{{$store.state.cart[item.id]*item.sell_price}}
                                            </span>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <div class="line15"></div>
                            <h2 class="slide-tit">
                                <span>5、结算信息</span>
                            </h2>
                            <div class="buy-foot clearfix">
                                <div class="left-box">
                                    <dl>
                                        <dt>订单备注(100字符以内)</dt>
                                        <dd>
                                            <textarea name="message" class="input" style="height:160px" resize="none" v-model="form.message"></textarea>
                                        </dd>
                                    </dl>
                                </div>
                                <div class="right-box">
                                    <p>
                                        商品
                                        <label class="price">{{$store.getters.total}}</label> 件&nbsp;&nbsp;&nbsp;&nbsp; 商品金额：￥
                                        <label id="goodsAmount" class="price">{{totalPrice}}
                                        </label> 元&nbsp;&nbsp;&nbsp;&nbsp;
                                    </p>
                                    <p>
                                        运费：￥
                                        <label id="expressFee" class="price">200</label> 元
                                    </p>
                                    <p class="txt-box">
                                        应付总金额：￥
                                        <label id="totalAmount" class="price">1100</label>
                                    </p>
                                    <p class="btn-box">
                                        <button class="btn button">返回购物车</button>
                                        <button id="btnSubmit" class="btn submit" name="btnSubmit" type="submit">确认提交</button>
                                    </p>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  data() {
    return {
      goodsList: [],
      ids: this.$route.params.ids,
      form: {}
    };
  },
  computed: {
    totalPrice() {
      return this.goodsList
        .map(v => v.sell_price * this.$store.state.cart[v.id])
        .reduce((sum, v) => (sum += v), 0);
    }
  },
  methods: {
    getGoodsList() {
      this.$http.get(this.$api.shopcartGoods + this.ids).then(res => {
        if (res.data.status == 0) {
          this.goodsList = res.data.message;
        }
      });
    },
    submit() {}
  },
  created() {
    this.getGoodsList();
  }
};
</script>

<style scoped>

</style>