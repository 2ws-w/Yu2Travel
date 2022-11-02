<script setup lang='ts'>
import { useStore } from 'vuex'
import { h, computed, onMounted, defineEmits } from 'vue'
const store = useStore()
const pageNo = computed(() => store.state.pageNo)
const pageSize = computed(() => store.state.pageSize)
const total = computed(() => store.state.total)
const emit = defineEmits<{ (e: 'changePage', pageNo: number): void }>()

const changePage = (pageNo: number) => {
    emit('changePage', pageNo)
}
</script>
 
<template>
    <el-pagination :current-page="pageNo" background layout="prev,pager,next" prev-text="<" next-text=">"
        :page-size="pageSize" :total="total" @current-change="changePage">
    </el-pagination>
</template>
 
<style  lang='scss'>
.el-pagination {
    width: 160px;
    text-align: center;
    margin: 20px auto;
}

.el-pagination.is-background .el-pager li:not(.is-disabled).is-active {
    background-color: #f56c6c;
}

.el-pagination {
    --el-pagination-hover-color: #eb4d4b
}
</style>