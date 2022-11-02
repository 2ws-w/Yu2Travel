interface TypeObjectStore {
    keyPath: string,
    indexs: string[]
}
const webRecord: TypeObjectStore = {
    keyPath: 'recordId',
    indexs: ['title', 'personNumber', 'pictureUrl', 'price']
}

const recordObjectStore = {
    web_record: webRecord

}
export default recordObjectStore