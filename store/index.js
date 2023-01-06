export const state = () => ({
  // 登入對話框是否可見
  loginDialog_visible: false,
  evaluationDialog_visible: false,
  googleMapsDialog_visible: false,
})

export const getters = {}

export const mutations = {
  // 關閉登入對話框
  toggleLoginBtn(state, toggle) {
    state.loginDialog_visible =
      typeof toggle === 'boolean' ? toggle : !state.loginDialog_visible
  },
  toggleEvaluationBtn(state, toggle) {
    state.evaluationDialog_visible =
      typeof toggle === 'boolean' ? toggle : !state.evaluationDialog_visible
  },
  toggleGoogleMapsBtn(state, toggle) {
    state.googleMapsDialog_visible =
      typeof toggle === 'boolean' ? toggle : !state.googleMapsDialog_visible
  },
}

export const actions = {}
