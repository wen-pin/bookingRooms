export const state = () => ({
  // 登入對話框是否可見
  loginDialog_visible: false,
})

export const getters = {}

export const mutations = {
  // 關閉登入對話框
  toggleLoginBtn(state, toggle) {
    state.loginDialog_visible =
      typeof toggle === 'boolean' ? toggle : !state.loginDialog_visible
  },
}

export const actions = {}
