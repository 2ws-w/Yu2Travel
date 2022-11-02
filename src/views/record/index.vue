<script setup lang='ts'>
import { ref, reactive, onMounted, computed } from 'vue'
import { getRecordApi } from '../../api/record/index'
import { ElMessage } from 'element-plus'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
const store = useStore()
const router = useRouter()
const recordData = ref()
const loading = ref(true)//骨架屏的现实和隐藏
const fetchRecord = () => {
    getRecordApi().then(res => {
        let { success, message, result } = res
        loading.value = false
        if (success) {
            recordData.value = result
        } else {
            ElMessage.error(message)
        }
    })
}
// 判断是否登陆u
if (store.state.userStatus) {
    fetchRecord()
} else {
    const { pathname } = window.location
    router.replace({
        path: '/login',
        query: {
            redirect: pathname
        }
    })
}
// 点击跳转详情页
const toDetail = (item: any) => {
    // console.log(item);
    let { recordId: id } = item
    router.push({ path: `/detail/${id}` })
    // 存储id
    store.commit('setRoomId', id)

}
</script>
 
<template>
    <div class="record-page">
        <div class="main-wrapper">
            <!-- 使用el骨架屏组件 ，提高用户体验 ，#template 和#default 样式对应 -->
            <el-skeleton :loading="loading" animated>
                <template #template>
                    <div class="column-style">
                        <div class="item" v-for="index in 9" :key="index">
                            <el-skeleton-item variant="image" style="width:315px;height:240px;boder-raduis:4px">
                            </el-skeleton-item>
                            <el-skeleton-item variant="p" style="width:100%;margin-top: 15px;">
                            </el-skeleton-item>
                            <el-skeleton-item variant="p" style="width:30%">
                            </el-skeleton-item>
                        </div>
                    </div>
                </template>
                <template #default>
                    <div class="column-style" v-if="recordData.length > 0">
                        <div class="item" v-for="(item, index) in recordData" :key="index" @click="toDetail(item)">
                            <el-image :src="item.pictureUrl" :alt="item.title"></el-image>
                            <p class="title">{{ item.title }}</p>
                            <p class="price">￥ {{ item.price }}</p>
                        </div>
                    </div>
                    <el-empty v-else description="暂无浏览记录哦~"></el-empty>
                </template>
            </el-skeleton>
        </div>
    </div>
</template>
 
<style  lang='scss'>
.record-page {
    .main-wrapper {
        @include main-wapper(30px);

        .column-style {
            column-count: 3;

            .item {
                width: 315px;
                overflow: hidden;
                margin-bottom: 25px;
                cursor: pointer;
                text-align: left;
                display: inline-block;

                img {
                    width: 315px;
                    height: auto;
                    border-radius: 4px;
                }

                .title {
                    width: 315px;
                    font-size: 18px;
                    margin: 15px 0px;
                    font-weight: bold;
                }

                .price {
                    font-size: 16px;
                }
            }
        }
    }
}
</style>