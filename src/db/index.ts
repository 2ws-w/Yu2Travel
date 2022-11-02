import DB from '../utils/indexedDb'
import languageObjectStore from './objectStores/language'
import userObjectStore from './objectStores/user'
import orderObjectStore from './objectStores/order'
import recordObjectStore from './objectStores/record'

export const yuyuDB = new DB('yuyu')

export default {
    yuyuDB,
    languageObjectStore,
    userObjectStore,
    orderObjectStore,
    recordObjectStore
}