export const state = () => ({
  // 登入對話框是否可見
  loginDialog_visible: false,
  favoritesDialog_visible: false,
})

export const getters = {}

export const mutations = {
  // 關閉登入對話框
  toggleLoginBtn(state) {
    state.loginDialog_visible = !state.loginDialog_visible
  },
  toggleFavoritesBtn(state) {
    state.favoritesDialog_visible = !state.favoritesDialog_visible
  },
}

export const actions = {}
