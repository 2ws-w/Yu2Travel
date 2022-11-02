import { ref, reactive, getCurrentInstance } from 'vue'
interface IRuleForm {
    mobile: string
    password: string

}

export default function userFormProperties(t: any) {
    const activeName = ref('login')
    let loginText = ref(t('login.loginBtn'))
    const ruleFormRef = ref()
    const ruleForm = reactive<IRuleForm>({
        mobile: '',
        password: ''
    })
    const rules = reactive({
        mobile: [
            {
                require: true,
                min: 11,
                max: 11,
                message: t('login.placeMobile'),
                trgger: 'blur'
            }
        ],
        password: [
            {
                require: true,
                min: 3,
                message: t('login.placePass'),
                trgger: 'blur'
            }
        ],
    })
    return {
        loginText, activeName, ruleForm, ruleFormRef, rules
    }
}
