export interface LocalStorageEx {
  _prefix: string
  set(key: string, value: any): boolean
  get(key: string, defaultValue: any): any
  clearAll(): boolean
  getKey(key: string): string
  clear(key: string): boolean
}
