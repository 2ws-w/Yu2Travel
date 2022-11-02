<script setup lang="ts">
import { ref, h, getCurrentInstance } from 'vue'
import { useRoute } from 'vue-router'
import headCommonVue from './components/common/layout/headCommon.vue';
import footerCommonVue from './components/common/layout/footerCommon.vue';
import { useStore } from 'vuex'
const store = useStore()
const route = useRoute()
// 第一次进入app
store.commit('setOrderVisible', false)
</script>   

<template>
  <el-config-provider :locale="store.state.locale">
    <!-- 头部主体 -->
    <!-- 判断是否是login页面，login页面不需要公用头部和尾部 -->
    <headCommonVue @changeLang=" " v-show="route.fullPath.indexOf('login') === -1"></headCommonVue>
    <div class="container">
      <router-view>
      </router-view>
    </div>

    <!-- 底部 -->
    <footerCommonVue v-show="route.fullPath.indexOf('login') === -1"></footerCommonVue>
  </el-config-provider>
</template>

<style >
.container {
  min-height: calc(100vh - 432px);
}
</style>
