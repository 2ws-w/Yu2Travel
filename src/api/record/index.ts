import yuyu from '../../db'
import { ElLoading } from 'element-plus'
import { IresultOr  } from '../../api/interface'

const storeName = Object.keys(yuyu.recordObjectStore)[0]

// Mock：保存浏览记录
export const saveRecordApi = async (params: any) => {
    const userId = localStorage.getItem('userId')
    const loading = ElLoading.service({
        lock: true,
        background: 'rgba(0,0,0,0.1)'
    })
    // 是否存在相同订单的id
    const hasRecordId = await new Promise((resolve, reject) => {
        yuyu.yuyuDB.getList(storeName).then((res: any) => {
            setTimeout(() => {
                loading.close()
            }, 200)
            res && res.filter((item: any) => {
                if (item.recordId === params.recordId) {
                    // 存在相同id   
                    resolve(true)
                }
            })
            resolve(false)
        })
    })
    let result: IresultOr
    if (hasRecordId) {
        result = await new Promise((resolve, reject) => {
            resolve({ code: '000001', success: false, message: '数据已存在', result: null })
        })
    } else {
        Object.assign(params, { userId })
        result = await new Promise((resolve, reject) => {
            yuyu.yuyuDB.updateItem(storeName, params).then(res => {
                setTimeout(() => {
                    loading.close()
                }, 200)
                resolve({ code: '000000', success: true, message: '操作成功', result: null })
            })
        })
    }
    return result
}

// Mock 获取历史记录
export const getRecordApi = async () => {
    const userId = localStorage.getItem('userId')
    const loading = ElLoading.service({
        lock: true,
        background: 'rgba(0,0,0,0.1)'
    })
    const result: IresultOr = await new Promise((resolve, reject) => {
        yuyu.yuyuDB.getList(storeName).then((res: any) => {
            setTimeout(() => {
                loading.close()
            }, 200)
             setTimeout(() => {
                // 筛选userId以实现权限隔离            
                res = res.filter((item: any) => {
                    return item.userId === userId
                })
                //刻意延迟，观察异步组件
                resolve({ code: '000000', success: true, message: '操作成功', result: res || null })

            }, 500)
        })
    })
    return result
}