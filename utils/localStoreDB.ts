// import {} from '@nuxtjs/localforage'
// import { LOCAL_STORE_DB_NAME, COLLECT_KEY } from '~/utils/contants'

// const dbPromise = openDB(LOCAL_STORE_DB_NAME, 1, {
//   upgrade(db) {
//     db.createObjectStore(COLLECT_KEY)
//   },
// })

// export const localStoreDB = {
//   async get(key: string) {
//     await this.$localforage.images.setItem(key, value)
//   },
//   async set(key: string, val: any) {
//     return (await dbPromise).put(COLLECT_KEY, val, key)
//   },
//   async delete(key: string) {
//     return (await dbPromise).delete(COLLECT_KEY, key)
//   },
//   async clear() {
//     return (await dbPromise).clear(COLLECT_KEY)
//   },
//   async keys() {
//     return (await dbPromise).getAllKeys(COLLECT_KEY)
//   },
// }
// ;(window as any).$localStoreDB = localStoreDB
