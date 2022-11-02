<script setup lang="ts">
import { ref, h, getCurrentInstance } from 'vue'
import { useRoute } from 'vue-router'
import headCommonVue from './components/common/layout/headCommon.vue';
import footerCommonVue from './components/common/layout/footerCommon.vue';
// import { ElMessage } from 'element-plus'

// import en from 'element-plus/dist/locale/en.mjs'
// import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
// import { useI18n } from 'vue-i18n'
import { useStore } from 'vuex'

const store = useStore()
// const { locale } = useI18n()
// const lolang = ref(zhCn)
// const changeLang = (language: any) => {
//   lolang.value = language
//   locale.value = language.name
//   // console.log('切换成功', lolang.value);
// }

const route = useRoute()


// const sss = () => {
//   console.log(1123);

//   const { porxy }: any = getCurrentInstance()
//   porxy.$message({
//     message: h('p', null, [
//       h('span', null, 'Message can be'),
//       h('i', { style: 'color:red' }, '1111'),
//     ])
//   })
// }


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
