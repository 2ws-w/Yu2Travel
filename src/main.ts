import yuyu from './db/index';
import { createApp } from 'vue'
import router from './router'
import App from './App.vue'
import ElementPlus, { ElMessage } from 'element-plus'
import 'element-plus/dist/index.css'
import i18n from './language/i18n'
import { store } from './store/index'


router.beforeEach((to, from, next) => {
    yuyu.yuyuDB.openStore({
        ...yuyu.languageObjectStore,
        ...yuyu.userObjectStore,
        ...yuyu.orderObjectStore,
        ...yuyu.recordObjectStore
    }).then((res: any) => {
        console.log('初始化所有对象仓库', res);
        // 登陆时会在localstorage存在，靠判断值是否存在给store赋值，以实现持久化存储
        localStorage.getItem('userId') && store.commit('setUserStatus',1)
        next()
    })
})


const app = createApp(App)
app.config.globalProperties.$message = ElMessage
app.use(router)
app.use(store)
app.use(ElementPlus)
app.use(i18n)
app.mount('#app')
