import { debounce } from "lodash"

export function Debounce(delay: number) {
  return (target: any, prop: string) => {
    return {
      configurable: true,
      enumerable: false,
      value: debounce(target[prop], delay),
    }
  }
}
