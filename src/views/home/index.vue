<script setup lang='ts'>
import { h, getCurrentInstance, onMounted } from 'vue'
import homeListVue from './components/homeList.vue';
import { useStore } from 'vuex'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
const store = useStore()
onMounted(async () => {
    const { pageNo } = store.state
    await store.dispatch('getRoomList', { pageNo })

})



// const toDetail = (item: any) => {
//     console.log(item);

// }
</script>
<template>
    <div class="home-page">
        <!-- banner -->
        <div class="banner">
            <el-carousel height="530px" pause-on-hover="false" indicator-position="outside" interval="5000">
                <el-carousel-item>
                    <img src="../../assets/images/home/4.jpg" alt="">
                </el-carousel-item>
                <el-carousel-item>
                    <img src="../../assets/images/home/2.jpg" alt="">
                </el-carousel-item>
                <el-carousel-item>
                    <img src="../../assets/images/home/3.jpg" alt="">
                </el-carousel-item>
                <el-carousel-item>
                    <img src="../../assets/images/home/1.jpg" alt="">
                </el-carousel-item>
            </el-carousel>
            <!-- <img src="../../assets/images/login/bgc-login2.0.png" alt=""> -->
        </div>
        <!-- 房屋列表 -->
        <div class="main-wapper">
            <h2 class="title"> {{ t('home.h2Title') }}</h2>
            <p class="sub-title">{{ t('home.subTitle') }}</p>
            <homeListVue></homeListVue>

        </div>
        <!-- 筛选和分页 -->
    </div>
</template>
 
<style  lang='scss'>
@import '../../assets/scss/home/index.scss';

.el-tabs .el-tabs__item.is-active {
    border-bottom: none;
}
</style>