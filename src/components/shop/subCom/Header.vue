<template>
    <div id="header" class="header">
        <div class="head-top">
            <div class="section">
                <div class="left-box">
                    <!-- <span>知识分享系统</span> -->
                    欢迎您&nbsp;&nbsp;
                    <span style="font-size:18px;color:#f60">{{userName}}</span>
                    <a target="_blank" href="#"></a>
                    <a target="_blank" href="#"></a>
                </div>
                <div id="menu" class="right-box">
                    <router-link v-if="!userName" :to="{name:'login'}">登录</router-link>
                    <el-button type="warning" size="mini" v-if="userName" @click="logout">退出登录</el-button>
                    <el-button type="primary" size="mini" v-if="userName" @click="logout">注册</el-button>
                    <strong>|</strong>
                </div>
            </div>
        </div>
        <div class="head-nav">
            <div class="section">
                <!-- <div class="logo">
                       <a href="/index.html"><img width="230px" height="70px" src="/templates/main/images/logo.png" /></a>
                   </div>-->
                <div id="menu2" class="nav-box menuhd">
                    <ul>
                        <li class="index">
                            <router-link :to="{name:'list'}">首页</router-link>
                        </li>
                        <li class="news">
                            <a href="/news.html">
                                学员问题汇总
                            </a>
                        </li>
                        <li class="photo">
                            <a href="/photo.html">
                                重难点专区
                            </a>
                        </li>
                        <!--<li class="goods"><a href="">就业阶段</a></li>-->
                        <li class="video">
                            <a href="/video.html">
                                前端常用功能
                            </a>
                        </li>
                        <li class="down">
                            <a href="/down.html">
                                资源下载
                            </a>
                        </li>
                        <li>
                            <a target="_blank" href="/admin/index.aspx">
                                问题提交
                            </a>
                        </li>
                    </ul>
                </div>
                <div class="search-box">
                    <div class="input-box">
                        <input id="keywords" name="keywords" type="text" onkeydown="if(event.keyCode==13){SiteSearch('/search.html', '#keywords');return false};" placeholder="输入关健字" x-webkit-speech="">
                    </div>
                    <a href="javascript:;" onclick="SiteSearch('/search.html', '#keywords');">
                        <i class="iconfont icon-search"></i>
                    </a>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import "@/lib/nav/css/style.css";
import $ from "jquery";
export default {
  data() {
    return {
      userName: localStorage.getItem("user")
    };
  },
  mounted() {
    $(document).ready(function() {
      $("#menu2 li a").wrapInner('<span class="out"></span>');
      $("#menu2 li a").each(function() {
        $('<span class="over">' + $(this).text() + "</span>").appendTo(this);
      });

      $("#menu2 li a").hover(
        function() {
          $(".out", this)
            .stop()
            .animate({ top: "48px" }, 300); // move down - hide
          $(".over", this)
            .stop()
            .animate({ top: "0px" }, 300); // move down - show
        },
        function() {
          $(".out", this)
            .stop()
            .animate({ top: "0px" }, 300); // move up - show
          $(".over", this)
            .stop()
            .animate({ top: "-48px" }, 300); // move up - hide
        }
      );
    });
  },
  methods: {
    logout() {
      this.$confirm("您确定要退出登录", "退出提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$http.get(this.$api.logout).then(res => {
            if (res.data.status == 0) {
              localStorage.removeItem("user");
              this.$router.push({ name: "login" });
            }
          });
        })
        .catch(() => {});
    }
  }
};
</script>

<style scoped>

</style>