<script setup lang='ts'>
import { ref, defineEmits, onMounted, defineAsyncComponent } from 'vue'
import en from 'element-plus/dist/locale/en.mjs'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import { savaLanguageApi, getLanguageApi } from '../../../api/layout/index'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import { userLogoutApi } from '../../../api/login/index'
import { IresultOr } from '../../../api/interface'
import { useStore } from 'vuex'
import { ElMessage } from 'element-plus'

const store = useStore()

//获取i18n实例，用t('')包裹需要切换语言的部件 使用插值语法即可生效
const { t, locale } = useI18n()
const router = useRouter()
const OrderPopover = defineAsyncComponent(() => import('../../../views/order/orderPopover.vue'))
onMounted(() => {
    getLanguage()
})
// const emit = defineEmits<{ (e: 'changeLang', language: any): void }>()
// 点击切换对应语言
const handleSelect = (e: any) => {
    if (e === 'zh') {
        store.dispatch('saveLanguage', zhCn)
        locale.value = e
    } else if (e === 'en') {
        store.dispatch('saveLanguage', en)
        locale.value = e
    } else if (e === 'login') {
        router.push({ name: 'login' })
    }
    else if (e === 'logout') {
        userLogout()
    }
    else if (e === 'orders') {
        store.commit('setOrderVisible', true)
    }
    else if (e === 'records') {
        router.push({ name: 'record' })
    }
}

// mock 保存用户选择的语言包
// const saveLanguage = (language: any) => {
//     savaLanguageApi(language).then(res => {
//         console.log(res, '成功');
//     }).catch(err => {
//         console.log(err, '失败');

//     })
// }

const getLanguage = () => {
    getLanguageApi().then(res => {
        const { success, result } = res
        const { name } = result
        if (success) {
            if (name === 'zh') {
                store.dispatch('saveLanguage', zhCn)
                locale.value = name
            } else if (name === 'en') {
                store.dispatch('saveLanguage', en)
                locale.value = name
            }
        }
    })
}
// 存储用户登录状态
// const status = localStorage.getItem('userStatus')

// 点击跳转首页
const toHome = () => {
    router.push({ name: 'home' })
}
// 退出登录
const userLogout = () => {
    userLogoutApi().then((res: IresultOr) => {
        const { success, message, result } = res
        if (success) {
            // router.push({ name: 'login' })
            ElMessage.success(message)
            store.commit('setUserStatus', 0)
            localStorage.setItem('userId', '')
        } else {
            ElMessage.error(message)
        }
    })
}
</script>
 
<template>
    <div class="header-common ">
        <img src="../../../assets/images/layout/chat.png" class="logo" alt="玉玉旅行" @click="toHome">
        <img src="../../../assets/images/layout/yuyuyou.png" class="wenzi" alt="玉玉游">
        <el-menu class="el-menu-demo" mode="horizontal" @select="handleSelect">
            <el-menu-item index="orders">
                {{ t('header.orders') }}
                <!-- 房屋订单中心异步组件 -->
                <template v-if="store.state.orderVisible">
                    <Suspense>
                        <template #default>
                            <OrderPopover> </OrderPopover>
                        </template>
                        <template #fallback>
                            <div class="fallback">
                                玩命加载中 . . .
                            </div>
                        </template>
                    </Suspense>
                </template>
            </el-menu-item>
            <el-menu-item index="records">{{ t('header.records') }}</el-menu-item>
            <el-sub-menu index="language">
                <template #title>{{ t('header.language') }}</template>
                <el-menu-item class='ss' index="zh">中文</el-menu-item>
                <el-menu-item index="en">English</el-menu-item>
            </el-sub-menu>
            <el-sub-menu index="avator" v-if="store.state.userStatus === 1">
                <template #title>
                    <img class="avatar" src="../../../assets/images/layout/zombie.png" alt="个人中心">
                </template>
                <el-menu-item index="logout">{{t('login.logout')}}</el-menu-item>
            </el-sub-menu>
            <el-menu-item index="login" v-else>
                {{ t('login.loginTab') }} / {{ t('login.signTab') }}
            </el-menu-item>
        </el-menu>
    </div>
</template>
 
<style scoped lang='scss'>
@import '../../../assets/scss/layout/header.scss';
</style>

<style lang="scss" >
// 有二级菜单的标题时鼠标悬停的颜色
.el-sub-menu__title.el-tooltip__trigger.el-tooltip__trigger:hover {
    color: #eb4d4b !important;
}

.el-menu-item.is-active,
.el-sub-menu.is-active,
.el-submenu .el-menu-item.is-active {
    --el-menu-active-color: #eb4d4b;
}

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
</style>
