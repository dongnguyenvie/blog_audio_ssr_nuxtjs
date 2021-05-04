import { browserStorage } from '~/utils/localStorage'
import { TOKEN_KEY } from '~/utils/contants'

class Authencation {
  getToken() {
    let token = ''
    if (process.client) {
      token = browserStorage.get(TOKEN_KEY, '')
    }
    return token
  }
}

export const authencation = new Authencation()
