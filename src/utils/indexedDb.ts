import { createObjectExpression } from "@vue/compiler-core";

export default class DB {
    //数据库名称
    private dbName: string
    //数据库对象
    private db: any
    constructor(dbName: string) {
        this.dbName = dbName
    }
    //接受 仓库名，主键，属性数组
    public openStore(stores: any) {
        // 打开数据库 （'数据库名称'，版本号）
        const request = window.indexedDB.open(this.dbName, 5 )
        return new Promise((resolve, reject) => {
            request.onsuccess = (event: any) => {
                // console.log('数据库启用成功', event);
                this.db = event.target.result
                resolve(true)
            }
            request.onerror = (event: any) => {
                // console.log('数据库打开失败', event);
                reject(event)
            }
            request.onupgradeneeded = (event: any) => {
                // console.log('数据库升级成功', event);
                const { result }: any = event.target
                for (const storeName in stores) {
                    const { keyPath, indexs } = stores[storeName]
                    if (!result.objectStoreNames.contains(storeName)) {
                        const store = result.createObjectStore(storeName, { autoIncrement: true, keyPath })
                        if (indexs && indexs.length > 0) {
                            indexs.map((v: string) => {
                                //增加b表  名-值-是否唯一
                                store.createIndex(v, v, { unique: false })
                            })
                        }
                        store.transaction.oncomplete = (event: any) => {
                            // console.log('创建对象仓库成功', event);
                        }
                    }
                }
            }
        })

    }
    //新增 修改 数据
    updateItem(storeName: string, data: any) {
        const store = this.db.transaction([storeName], 'readwrite').objectStore(storeName)
        const request = store.put({
            ...data,
            updateTime: new Date().getTime()
        })
        return new Promise((resolve, reject) => {
            request.onsuccess = (event: any) => {
                // console.log('数据写入成功', event);
                resolve(event)
            }
            request.onerror = (event: any) => {
                // console.log('数据写入失败', event);
                reject(event)
            }
        })

    }
    //删除 数据
    deleteItem(storeName: string, key: number | string) {
        const store = this.db.transaction([storeName], 'readwrite').objectStore(storeName)
        const request = store.delete(key)
        return new Promise((resolve, reject) => {
            request.onsuccess = (event: any) => {
                // console.log('数据删除成功', event);
                resolve(event)
            }
            request.onerror = (event: any) => {
                // console.log('数据删除失败', event);
                reject(event)
            }
        })
    }
    // 查询操作
    // 查询所有数据
    getList(storeName: string) {
        const store = this.db.transaction(storeName).objectStore(storeName)
        const request = store.getAll()
        return new Promise((resolve, reject) => {
            request.onsuccess = (event: any) => {
                // console.log('查询所有数据成功', event);
                resolve(event.target.result)
            }
            request.onerror = (event: any) => {
                // console.log('查询所有数据失败', event);
                reject(event)
            }
        })
    }
    //查询一条数据
    getItem(storeName: string, key: number | string) {
        const store = this.db.transaction(storeName).objectStore(storeName)
        const request = store.get(key)
        return new Promise((resolve, reject) => {
            request.onsuccess = (event: any) => {
                // console.log('查询单条数据成功', event);
                console.log(event.target.result);
                resolve(event.target.result)
            }
            request.onerror = (event: any) => {
                // console.log('查询单条数据失败', event);
                reject(event)
            }
        })
    }
}
