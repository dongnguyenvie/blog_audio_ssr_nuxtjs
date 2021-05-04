import { LOCALSTORAGE_PREFIX } from './contants'
import _ from 'lodash'
import { LocalStorageEx } from '~/types/utils'

class LocalStorage implements LocalStorageEx {
  _prefix = LOCALSTORAGE_PREFIX

  set(key: string, value: any) {
    let flg = true
    try {
      const _key = this.getKey(key)
      let _value = JSON.stringify(value)
      localStorage.setItem(_key, _value)
    } catch (error) {
      flg = false
    }
    return flg
  }

  get(key: string, defaultValue?: any) {
    const _key = this.getKey(key)
    let _value = null
    try {
      _value = JSON.parse(localStorage.getItem(_key) as any)
    } catch (error) {
      _value = defaultValue
    }
    return _value
  }

  clearAll() {
    let flg = true
    try {
      localStorage.clear()
    } catch (error) {
      flg = false
    }
    return flg
  }

  clear(key: string) {
    let flg = true
    try {
      const _key = this.getKey(key)
      localStorage.removeItem(_key)
    } catch (error) {
      flg = false
    }
    return flg
  }

  getKey(key: string) {
    return this._prefix + key
  }
}

export const browserStorage = new LocalStorage()
