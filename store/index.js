export const state = () => ({
  dates: [],

  // 登入對話框是否可見
  loginDialog_visible: false,
  evaluationDialog_visible: false,
  googleMapsDialog_visible: false,
})

export const getters = {
  datesQueue: (state) => {
    if (state.dates.length === 2) {
      if (this.$dayjs(this.dates[0]).isAfter(this.$dayjs(state.dates[1]))) {
        let temp = state.dates[0]
        let newDates = []
        newDates[0] = state.dates[1]
        newDates[1] = temp
        return newDates
      } else {
        return state.dates
      }
    } else {
      return state.dates
    }
  },
}

export const mutations = {
  fetchDates(state, v) {
    state.dates = v
  },
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
