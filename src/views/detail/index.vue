<script setup lang='ts'>
import { ref, reactive, onMounted, computed, watch } from 'vue'
import { useStore } from 'vuex'
import { useRoute, useRouter } from 'vue-router'
import { saveOrderApi } from '../../api/order';
import { ElMessage } from 'element-plus'
import { saveRecordApi } from '../../api/record';
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
const route = useRoute()
const router = useRouter()
const store = useStore()
const roomDetail = computed(() => store.state.roomDetail)
const orderForm = reactive({
    personNumber: 1
})
let loading = ref(true)
const ruleForm = ref()
onMounted(async () => {
    // 进入页面后先关闭弹窗
    const { roomId } = await store.state
    const { id } = route.params
    // 使用watch实时监听传入的id变化
    watch(() => route.params, (newVal, oldVal) => {
        store.commit('setOrderVisible', false)
        store.dispatch('getRoomDetail', newVal)
    })
    await store.dispatch('getRoomDetail', { id: roomId || id })

    saveReord()
    loading.value = false
})
const submitForm = () => {
    // 判断是否登陆
    if (store.state.userStatus) {
        saveOrder()
    } else {
        // console.log('未登录');
        const { pathname } = window.location
        router.replace({
            path: '/login',
            query: {
                redirect: pathname
            }
        })
    }
}
// 调用mock接口  存储用户提交的数据
const saveOrder = () => {
    const { id: orderId } = route.params
    // const { personNumber } = orderForm
    const { price, title, imgs } = roomDetail.value
    const params = {
        orderId,
        title,
        price,
        personNumber: orderForm.personNumber,
        pictureUrl: imgs[0]
    }
    saveOrderApi(params).then((res: any) => {
        let { success, message } = res
        if (success) {
            ElMessage.success('预定成功')
        } else {
            ElMessage.warning(message)
        }


    })
}
// 保存历史足迹
function saveReord() {
    const { id: recordId } = route.params
    const { price, title, imgs, personNumber } = roomDetail.value
    const params = {
        recordId,
        title,
        price,
        personNumber,
        pictureUrl: imgs[0]
    }
    saveRecordApi(params).then((res: any) => {
        let { success, message } = res
        if (success) {
            // 记录浏览记录
            // ElMessage.success('记录成功')
        } else {
            // ElMessage.warning(message)
        }
    })

}
</script>
 
<template>
    <div v-if="roomDetail && roomDetail.info && roomDetail.owner && roomDetail.imgs">
        <!-- 轮播图  显示该房屋的照片-->
        <el-carousel v-if="roomDetail.imgs.length > 0" trigger="click" height="380px" :interval='3000'
            indicator-position="none" type="card">
            <el-carousel-item v-for="(item, i) in roomDetail.imgs " :key="i">
                <img :src="item" alt="i">
            </el-carousel-item>
        </el-carousel>
        <div class="main-wapper">
            <!-- 房屋详情 -->
            <el-skeleton style="--el-skeleton-circle-size: 100px" :loading="loading" animated>
                <template #template>
                    <el-skeleton-item variant="p" style="height:60px" />
                    <div class="roominfo">
                        <el-skeleton-item variant="span" />
                    </div>
                    <div class="tags">
                        <el-skeleton-item variant="span" />
                    </div>
                    <div class="owner-detail">
                        <el-skeleton-item variant="circle" />
                    </div>
                    <div>
                        <el-skeleton-item variant="p" style="height:160px" />
                    </div>
                </template>
                <template #default>
                    <div class="room-detail">
                        <div class="detail-part">
                            <template v-for="(item, index) in roomDetail" :key="index">
                                <div v-if="index === 'title' as any">
                                    <h2 class="title">{{ roomDetail.title }}</h2>
                                    <!-- 房屋信息 -->
                                    <div class="roominfo">
                                        <span class="room">
                                            <img src="../../assets/images/detail/room.png" alt="">
                                            {{ roomDetail.info.room }}间卧室</span>
                                        <span class="bed">
                                            <img src="../../assets/images/detail/bed.png" alt="">
                                            {{ roomDetail.info.bed }}张床</span>
                                        <span class="toilet">
                                            <img src="../../assets/images/detail/toilet.png" alt="">
                                            {{ roomDetail.info.toilet }}洗手间</span>
                                        <span class="live-number">
                                            <img src="../../assets/images/detail/people.png" alt="">
                                            可住{{ roomDetail.info.liveNumber }}人</span>
                                    </div>
                                    <div class="tags">
                                        <el-tag size="small" round class="ml-10">{{ roomDetail.info.remarks }}条评论
                                        </el-tag>
                                        <el-tag size="small" round class="ml-10" type="danger"
                                            v-if="roomDetail.info.metro">近地铁
                                        </el-tag>
                                        <el-tag size="small" round class="ml-10" type="warning" v-if="roomDetail.info.parking
                                        ">免费停车</el-tag>
                                        <el-tag size="small" round class="ml-10" type="success"
                                            v-if="roomDetail.info.metro">
                                            可以存放行李
                                        </el-tag>
                                    </div>
                                    <!-- 房东信息 -->
                                    <div class="owner-detail">
                                        <img :src="roomDetail.owner.avatar" alt="">
                                        <div class="info">
                                            <p class="upp">
                                                <span>房东: {{ roomDetail.owner.name }}</span>
                                                <span class="tel">{{ t('detail.contactlandlord') }}</span>
                                            </p>
                                            <p class="downp">
                                                <span v-if="roomDetail.owner.certify">已认证房东身份</span>
                                                <span v-if="roomDetail.info.goodOwner" class="good">超赞房东</span>
                                            </p>
                                        </div>
                                    </div>
                                    <!-- 基本介绍 -->
                                    <div>
                                        <div class="introduce">{{ roomDetail.owner.introduce }}</div>
                                    </div>
                                </div>
                            </template>
                        </div>
                        <div class="form-part">
                            <p class="price">
                                <span>￥{{ roomDetail.price }}</span> / {{ t('detail.night') }}
                            </p>
                            <!-- 表单 -->
                            <el-form ref="ruleForm " :model="orderForm">
                                <el-form-item prop="personNumber " :label="t(`detail.guest`)" class="people">
                                    <select class="peopleinput" v-model="orderForm.personNumber">
                                        <option v-for="item in 3" :value="item" :key="item">{{ item }}</option>
                                    </select>
                                </el-form-item>
                                <el-form-item>
                                    <el-button type='primary' class="btn-primary" @click="submitForm">{{
                                            t('detail.reserve')
                                    }}
                                    </el-button>
                                </el-form-item>
                            </el-form>
                        </div>
                    </div>
                </template>
            </el-skeleton>

        </div>
    </div>



</template>
 
<style scoped lang='scss'>
@import '../../assets/scss/detail/index.scss';
</style>