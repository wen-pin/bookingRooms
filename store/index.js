import dayjs from 'dayjs'

export const state = () => ({
  dates: [],

  // 登入對話框是否可見
  loginDialog_visible: false,
  // 評價對話筐
  evaluationDialog_visible: false,
  // 地圖對話筐
  googleMapsDialog_visible: false,
})

export const getters = {
  // 排列較早日期在前
  datesQueue: (state) => {
    if (state.dates.length === 2) {
      if (dayjs(state.dates[0]).isAfter(dayjs(state.dates[1]))) {
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
  // 選擇日期
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
