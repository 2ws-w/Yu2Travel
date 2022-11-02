import { IresultOr } from '../../api/interface'
import { userLoginApi, userSignApi } from '../../api/login/index'
import { useStore } from 'vuex'
import { ElMessage } from 'element-plus'
import { useRoute } from 'vue-router'
interface IRuleForm {
    mobile: string
    password: string

}
export default function userFormOperates(router: any, params: any) {
    // 注册
    const store = useStore()
    const route = useRoute()

    const userSign = (params: IRuleForm) => {
        userSignApi(params).then((res: IresultOr) => {
            const { success, message } = res
            if (success) {
                ElMessage.success(message)

            } else {
                ElMessage.error(message)

            }
        })
    }
    // 登陆
    const userLogin = (params: IRuleForm) => {
        userLoginApi(params).then((res: IresultOr) => {
            const { success, message, result } = res
            if (success) {
                const { status, userId } = result
                localStorage.setItem('userId', userId)
                store.commit('setUserStatus', status)
                const { redirect } = route.query
                router.push({ path: redirect || '/home' })
                ElMessage.success(message)

            } else {
                ElMessage.error(message)
            }
        })
    }
    return { userLogin, userSign }
}
