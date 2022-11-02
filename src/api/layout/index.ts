import { http } from '../../utils/http';
import IndexedDB from '../../utils/indexedDb'
import { ElLoading } from 'element-plus'
import { IresultOr } from '../interface'


const yuyuDB = new IndexedDB('yuyu')

export const getRoomList = () => { return http.httpGet('', {}) }

// mock 模拟接口
// export const getElephant = async () => {
//     await yuyuDB.openStore('elephant', 'id', ['nose', 'ear'])
//     const result = await yuyuDB.getList('elephant').then(res => {
//         return { code: '', message: '操作成功', result: res, success: true }
//     })
//     return result
// }


// mock   保存当前语言包
export const savaLanguageApi = async (lang: any) => {
    //el loading
    const loading = ElLoading.service({
        lock: true,
    })

    await yuyuDB.openStore('language')
    const resultOr: IresultOr = await yuyuDB.getItem('language', 1).then(res => {
        return { code: '000000', message: '操作成功', result: res || null, success: true }
    })
    const { success } = resultOr
    let obj = {}
    if (success) {
        //数据存在则更新数据
        obj = { name: lang, id: 1 }
    } else {
        // 数据不存在则新增数据
        obj = { name: lang }
    }
    const result: IresultOr = await yuyuDB.updateItem('language', obj).then(res => {
        setTimeout(() => {
            loading.close()
        }, 200)
        return { code: '000000', message: '操作成功', result: res || null, success: true }
    })
    return result
}

// mock  获取当前语言包
export const getLanguageApi = async () => {
    const loading = ElLoading.service({
        lock: true,
    })
    await yuyuDB.openStore('language')
    const result: IresultOr = await yuyuDB.getItem('language', 1).then((res: any) => {
        setTimeout(() => {
            loading.close()
        }, 200)
        return { code: '000000', message: '操作成功', result: res || null, success: true }
    })
    return result
}