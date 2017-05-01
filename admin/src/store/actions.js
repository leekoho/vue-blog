/**
 * Created by leekoho on 2017/4/27.
 */
function makeAction (type) {
  return ({ commit }, ...args) => commit(type, ...args)
}

export const closeToastr = makeAction('closeToastr')
export const toggleSidebar = makeAction('toggleSidebar')
export const getArticlesList = makeAction('getArticlesList')
export const selectArticle = makeAction('selectArticle')
export const unPublishArticle = makeAction('unPublishArticle')
export const updateArticle = makeAction('updateArticle')
export const login = makeAction('login')
export const loginOut = makeAction('loginOut')
export const selectAbout = makeAction('selectAbout')

export function publishArticle (context, id) {
  context.commit('updateArticle', id)
  context.commit('publishArticle', id)
}

export function addArticle (context) {
  context.commit('addArticle')
  context.commit('getArticlesList')
}
export function deleteArticle (context, id) {
  context.commit('deleteArticle', id)
  context.commit('getArticlesList')
}
