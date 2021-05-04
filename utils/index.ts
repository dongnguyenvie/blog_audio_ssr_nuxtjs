import { FORMAT_SLUG, AUDIO_LISTED_HISTORY_KEY } from '~/utils/contants'
import { IArticle } from '~/types/article'

export async function asyncForEach(array: any[], callback: Function) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array)
  }
}

export function checkAndGetSlug(url: string) {
  if (url.endsWith(FORMAT_SLUG)) {
    return url.slice(0, url.length - FORMAT_SLUG.length)
  }
  return false
}

export async function updateAudioWachedHistory(VueInstance: Vue, article: IArticle) {
  const mediaHistory: string[] = (await VueInstance.$localForage.media.getItem(AUDIO_LISTED_HISTORY_KEY)) || []
  const mediaUpdate = [article.id, ...mediaHistory.filter((id) => id !== article.id)]
  VueInstance.$localForage.media.setItem(AUDIO_LISTED_HISTORY_KEY, mediaUpdate)
}

export function defaultDataWithPagination() {
  return {
    links: {
      next: null,
      previous: null,
    },
    count: 0,
    results: [],
  }
}

export function createRandomCode(length: number) {
  let randomCodes = ''
  let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let charactersLength = characters.length
  for (let i = 0; i < length; i++) {
    randomCodes += characters.charAt(Math.floor(Math.random() * charactersLength))
  }
  return randomCodes
}
