<script setup lang='ts'>
import { useStore } from 'vuex'
import { ref, computed, onMounted, defineEmits } from 'vue'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
const store = useStore()
const cityCode = ref(store.state.cityCode)

const cityArr = [{
    cityCode: 'hz',
    cityName: '杭州'
}, {
    cityCode: 'sh',
    cityName: '上海'
}, {
    cityCode: 'nj',
    cityName: '南京'
}, {
    cityCode: 'cd',
    cityName: '成都'
}, {
    cityCode: 'cq',
    cityName: '重庆'
}, {
    cityCode: 'bj',
    cityName: '北京'
}, {
    cityCode: 'sz',
    cityName: '苏州'
},]

const cityClick = (tab: any) => {
    console.log(tab);
    let { name } = tab.props
    cityCode.value = name
    store.dispatch('getRoomList', { pageNo: 1, cityCode: name })
}
</script>
 
<template>
    <!-- 城市帅选 -->
    <el-tabs v-model="cityCode" @tab-click="cityClick" type="card">
        <el-tab-pane v-for="(item, i) in cityArr" :key="i" :label="t(`home.city.${item.cityCode}`)"
            :name="item.cityCode">
        </el-tab-pane>
    </el-tabs>
</template>
 
<style  lang='scss'>
.el-tabs {
    margin-left: 10px;
    padding: 0px;

    .el-tabs__item {
        font-size: 20px;
        // background-color: antiquewhite;
        padding: 0 30px;

        &:last-child {
            // padding: 0 40px;
            // background-color: #eb4d4b;
            padding-right: 30px !important;
        }
    }

    // 下划线颜色
    // .el-tabs--card>.el-tabs__header .el-tabs__item.is-active {
    //    border-bottom: 1px solid #eb4d4b;
    // }

    // 字体选中颜色
    .el-tabs__item.is-active {
        color: #eb4d4b;
        background-color: rgb(255, 255, 255);
        border-bottom: 1px solid #eb4d4b;
    }

    .el-tabs__item:hover {
        color: #ff7979
    }
}
</style>