/**
 * Created by leekoho on 2017/4/27.
 */

export default {
  getTitle (str) {
    if (str) {
      return str.split(/-+d?/)[0]
    }
  },
  getContent (str) {
    if (str) {
      // const idx = str.indexOf('---') + 3
      return str.substring(str.indexOf('---') + 3, str.length)
    }
  }
}
