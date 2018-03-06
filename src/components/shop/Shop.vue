<template>
  <div>
    <!-- 公共头部 -->
    <app-header></app-header>
    <!-- 其他组件 -->
    <el-row>
      <el-col :span="22" :offset="1">
        <router-view></router-view>
      </el-col>
    </el-row>
    <!-- 公共尾部 -->
    <app-footer></app-footer>
  </div>
</template>

<script>
import appHeader from "./subCom/Header.vue";
import appFooter from "./subCom/Footer.vue";
export default {
  components: {
    appHeader,
    appFooter
  }
};
</script>

<style scoped>

</style>