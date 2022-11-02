import { ElLoading } from 'element-plus';
import { IresultOr } from '../interface'
import yuyu from '../../db';
// import { } 
// import yuyuDB from '../'
// code 000000 操作成功  000001 数据已存在  000002密码不正确  000003 手机号不正确 000004 其他异常 000005 登录过期
// 登陆接口

const storeName = Object.keys(yuyu.userObjectStore)[0]

//mock 用户注册
export const userSignApi = async (params: any) => {
    const loading = ElLoading.service({
        lock: true,
        background: 'raba(0,0,0,0.1)'
    })
    // 库中是否存在相同手机号
    const hasMobile = await new Promise((resolve, reject) => {
        yuyu.yuyuDB.getList(storeName).then((res: any) => {
            setTimeout(() => {
                loading.close()
            }, 200)
            res && res.filter((item: any) => {
                if (item.mobile === params.mobile) {
                    resolve(true)
                }
            })
            resolve(false)
        })
    })
    let result: IresultOr
    if (hasMobile) {
        result = await new Promise((resolve, reject) => {
            resolve({ code: '000001', success: false, message: '数据已存在', result: null })
        })
    } else {
        const obj = { status: 0 }
        Object.assign(params, obj)
        result = await new Promise((resolve, reject) => {
            yuyu.yuyuDB.updateItem(storeName, params).then(res => {
                setTimeout(() => {
                    loading.close()
                }, 200)
                resolve({ code: '000000', success: true, message: '注册成功', result: null })
            })
        })
    }
    return result
}

//mock 用户登录
export const userLoginApi = async (params: any) => {
    const loading = ElLoading.service({
        lock: true,
        background: 'raba(0,0,0,0.1)'
    })
    // 校验手机号和密码是否正确
    const correct: any = await new Promise((resolve, reject) => {
        yuyu.yuyuDB.getList(storeName).then((res: any) => {
            setTimeout(() => {
                loading.close()
            }, 200)
            res && res.filter((item: any) => {
                if (item.mobile === params.mobile) {
                    // 校验手机号 
                    if (item.password === params.password) {
                        // 校验密码
                        resolve({ code: '000000', userId: item.userId })
                    } else {
                        resolve({ code: '000002' })
                    }
                }
            })
            resolve({ code: '000004' })
        })
    })
    let result: IresultOr
    if (correct.code !== '000000') {
        result = await new Promise((resolve, reject) => {
            resolve({
                code: correct.code, success: false,
                message: correct.code === '000002' ?
                    '密码不正确' : (correct.code === '000003' ? '手机号不正确' :
                        (correct.code === '000004' ? '未知错误' : '请重试')), result: null
            })
        })
    } else {
        const token = (new Date()).getTime() + ''
        document.cookie = `token=${token}`
        const obj = { status: 1, userId: correct.userId, token }
        Object.assign(params, obj)
        result = await new Promise((resolve, reject) => {
            yuyu.yuyuDB.updateItem(storeName, params).then(res => {
                setTimeout(() => {
                    loading.close()
                }, 200)
                resolve({ code: '000000', success: true, message: '登录成功', result: obj })
            })
        })
    }
    return result
}

//mock 用户登出
export const userLogoutApi = async () => {
    const loading = ElLoading.service({
        lock: true,
        background: 'raba(0,0,0,0.1)'
    })
    // 根据用户token更改登陆状态为0
    const correct: any = await new Promise((resolve, reject) => {
        yuyu.yuyuDB.getList(storeName).then((res: any) => {
            setTimeout(() => {
                loading.close()
            }, 200)
            res && res.filter((item: any) => {
                const cookie = document.cookie
                const token = 0//获取cookie中的token
                // const token = getQueryCookie(cookie, 'token')//获取cookie中的token

                if (item.token && item.token.indexOf(token) !== -1) {
                    resolve({ userId: item.userId })
                }
            })
            resolve({ code: '000005' })
        })
    })
    let result: IresultOr
    if (correct.code === '000005') {
        result = await new Promise((resolve, reject) => {
            resolve({ code: '000005', success: false, message: '登录过期', result: null })
        })
    } else {
        const params = await new Promise((resolve, reject) => {
            yuyu.yuyuDB.getItem(storeName, correct.userId).then(res => {
                resolve(res)
            })
        })
        const obj = { status: 0, token: null }
        Object.assign(obj)
        result = await new Promise((resolve, reject) => {
            yuyu.yuyuDB.updateItem(storeName, correct.userId).then(res => {
                setTimeout(() => {
                    loading.close()
                }, 200)
                resolve({ code: '000000', success: true, message: '成功登出', result: null })
            })
        })
    }
    return result
}