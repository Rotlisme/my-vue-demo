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
  </div>
</template>

<script>
import appHeader from "./subCom/Header.vue";
export default {
  components: {
    appHeader
  }
};
</script>

<style scoped>

</style>