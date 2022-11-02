<script setup lang='ts'>
import paginationVue from '../../../components/common/pagination.vue';
import { h, getCurrentInstance, onMounted, defineEmits } from 'vue'
import homeTabsVue from './homeTabs.vue';
import { useStore } from 'vuex'
import { useRouter } from 'vue-router';
const router = useRouter()
const store = useStore()

onMounted(async () => {
    await store.dispatch('getRoomList')
})

const toDetail = (item: any) => {
    // console.log(item);
    let {id} =item
    router.push({path:`/detail/${id}`})
    // 存储id
    store.commit('setRoomId',id)

}

const changePage = (pageNo: number) => {
    store.dispatch('getRoomList', { pageNo })
}
</script>
 
<template>
    <!-- 城市筛选 -->
    <homeTabsVue></homeTabsVue>
    <div class="home-list">
        <div class="item" v-for="(item, i) in store.state.roomList " :key="i" @click="toDetail(item)">
            <img :src="item.pictureUrl" alt="">
            <p class="title"> {{ item.title }}</p>
            <p class="price"> ￥{{ item.price }}</p>
        </div>
    </div>
    <!-- 分页 -->
    <paginationVue @changePage="changePage"></paginationVue>
</template>
 
<style scoped lang='scss'>

</style>
