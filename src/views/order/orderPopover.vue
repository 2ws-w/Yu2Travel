<script setup lang='ts'>
import { ref, reactive } from 'vue'
import { fetchOrderApi } from '../../api/order/index'
import { ElMessage } from 'element-plus'
import { useStore } from 'vuex';
import { useRouter } from 'vue-router'
const router = useRouter()
const store = useStore()
let orderData = reactive<Array<any>>([])
// 点击遮罩关闭订单中心
const closeMask = () => {
    store.commit('setOrderVisible', false)
}
// 房屋订单中心接口
const fetchOrder = async () => {
    return fetchOrderApi().then((res: any) => {
        let { success, message, result } = res
        if (success) {
            // ElMessage.success(message)
            orderData = result
        } else {
            ElMessage.warning(message)
        }
    })
}
// 判断是否登陆
if (store.state.userStatus) {
    await fetchOrder()

} else {
    const { pathname } = window.location
    router.replace({
        path: '/login',
        query: {
            redirect: pathname
        }
    })
    closeMask()
}

const toDetail = (item: any) => {
    let { orderId: id } = item
    router.push({ path: `/detail/${id}` })
    // 存储id
    store.commit('setRoomId', id)
    // store.commit('setOrderVisible', false)
}
</script>
 
<template>
    <Teleport to="#app">
        <div class="mask" @click="closeMask"></div>
    </Teleport>
    <ul v-if="orderData.length > 0">
        <li v-for="(item, index) in orderData" :key="index" @click="toDetail(item)">
            <img :src="item.pictureUrl" alt="item.title">
            <div class="mess">
                <p class="title">{{ item.title }}</p>
                <p class="info">{{ item.price }}/晚 * {{ item.personNumber }}人</p>
            </div>
        </li>
    </ul>
    <div v-else class="fallback"> 空空如也 ~</div>
</template>
 
<style scoped lang='scss'>
.fallback {
    position: absolute;
    top: 80px;
    right: 0;
    padding: 0 30px;
    color: #eb4d4b;
    background-color: rgb(255, 255, 255);
    box-shadow: 0 2px 5px 0 rgba(0, 0, 0, .2);
    z-index: 999;
}

ul {
    position: absolute;
    top: 80px;
    background-color: #fff;
    padding: 0px 10px;
    box-shadow: 0 2px 5px 0 rgba(0, 0, 0, .2);
    right: 0;
    max-height: 240px;
    overflow-y: auto;
    z-index: 999;
    width: 180px;

    &::-webkit-scrollbar {
        width: 4px;
        background-color: rgb(255, 255, 255)
    }

    &::-webkit-scrollbar-thumb {
        border-radius: 10px;
        box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
        opacity: 0.2;
    }

    li {
        @include flex-layout(row, space-between, center);
        border-bottom: 1px solid #eee;
        padding: 10px 0;

        &:last-child {
            border-bottom: none;
        }

        img {
            width: 65px;
            height: 45px;
            border-radius: 4px;
            margin-right: 5px;
            object-fit: cover;
        }

        .mess {
            display: flex;
            flex-direction: column;

            p {
                line-height: 16px;
                font-weight: normal;
                margin: 5px 0;
                max-width: 100px;
            }

            .title {
                font-weight: bold;
                color: #333;
                font-size: 14px;
                display: inline-block;
                @include line-text-overflow;
            }

            .info {
                color: #666;
                font-size: 12px;
            }
        }
    }


}
</style>
