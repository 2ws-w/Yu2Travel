<script setup lang='ts'>
import { validate } from 'json-schema';
import { ref, reactive, getCurrentInstance } from 'vue'
import { useI18n } from 'vue-i18n'
import { IresultOr } from '../../api/interface'
import { useRouter } from 'vue-router'
import useFormProperties from '../../hooks/login/useFormProperties'
import userFormOperates from '../../hooks/login/userFormOperates'
import { ElMessage } from 'element-plus'

const { t } = useI18n()
const { porxy } = getCurrentInstance() as any
const router = useRouter()
const { ruleForm, loginText, activeName, ruleFormRef, rules } = useFormProperties(t)
const { userLogin, userSign } = userFormOperates(router, ruleForm)
const hangleClick = (e: any) => {
    let { name } = e.props
    loginText.value = t(`login.${name}Btn`)
}

const tohome = () => {
    router.push({name:'home'})
}
const submitForm = () => {
    ruleFormRef.value.validate((valid: any) => {
        if (valid) {
            if (activeName.value === 'login') {
                userLogin(ruleForm)
            } else if (activeName.value === 'sign') {
                userSign(ruleForm)
            }
        } else {
            return false
        }
    })
}
</script>
 
<template>
    <div class="login-page">
        <div class="left-part">
            <img src="../../assets/images/login/wallhaven-wqgq7p.jpg" alt="">
        </div>
        <div class="right-part">
            <div class="login-panel">
                <div class="titlelogo" @click="tohome">
                    <img src="../../assets/images/layout/yuyuyou.png" alt="">
                </div>
                <!-- tabs -->
                <el-tabs v-model="activeName" class="demo-tabs" @tab-click="hangleClick">
                    <el-tab-pane :label="t('login.loginTab')" name="login"></el-tab-pane>
                    <el-tab-pane :label="t('login.signTab')" name="sign"></el-tab-pane>
                </el-tabs>
                <!-- 表单 -->
                <el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" status-icon>
                    <el-form-item prop="mobile">
                        <el-input :placeholder="t('login.placeMobile')" v-model="ruleForm.mobile" />
                    </el-form-item>
                    <el-form-item prop="password">
                        <el-input :placeholder="t('login.placePass')" v-model="ruleForm.password" />
                    </el-form-item>
                    <el-form-item>
                        <el-button @click="submitForm">{{ loginText }}</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
    </div>

</template>
 
<style  lang='scss'>
@import '../../assets/scss/login/index.scss';
</style>
<style>

</style>