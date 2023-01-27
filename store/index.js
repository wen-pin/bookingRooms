import dayjs from 'dayjs'

export const state = () => ({
  // 日期
  dates: [],
  // 選擇的付款方式
  select: {},

  // 房客
  tenants: [
    {
      id: 1,
      ageGroup: '大人',
      ageRange: '13 歲以上',
      quantity: 1,
    },
    {
      id: 2,
      ageGroup: '兒童',
      ageRange: '2 - 12歲',
      quantity: 0,
    },
    {
      id: 3,
      ageGroup: '嬰幼兒',
      ageRange: '2 歲以下',
      quantity: 0,
    },
    {
      id: 4,
      ageGroup: '寵物',
      ageRange: '會攜帶服務性動物嗎？',
      quantity: 0,
    },
  ],

  // 登入對話框是否可見
  loginDialog_visible: false,
  // 註冊對話框是否可見
  registerDialog_visible: false,
  // 評價對話筐
  evaluationDialog_visible: false,
  // 地圖對話筐
  googleMapsDialog_visible: false,
  // 房客卡片是否可見
  tenantCard_visible: false,
  // 是否啟用全站的google地圖
  googleMaps_visible: false,
})

export const getters = {
  room: (state) => {
    return state.room
  },
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
  // 住宿日期範圍
  dateRangeText: (state, getters) => {
    return getters.datesQueue.join(' ~ ')
  },
  // 住宿天數
  calculateDays(state, getters) {
    return dayjs(getters.datesQueue[1]).diff(getters.datesQueue[0], 'day')
  },
  // 大人人數
  allTenants(state) {
    return state.tenants[0].quantity + state.tenants[1].quantity
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
  toggleRegisterBtn(state, toggle) {
    state.registerDialog_visible =
      typeof toggle === 'boolean' ? toggle : !state.registerDialog_visible
  },
  toggleEvaluationBtn(state, toggle) {
    state.evaluationDialog_visible =
      typeof toggle === 'boolean' ? toggle : !state.evaluationDialog_visible
  },
  toggleGoogleMapsBtn(state, toggle) {
    state.googleMapsDialog_visible =
      typeof toggle === 'boolean' ? toggle : !state.googleMapsDialog_visible
  },
  toggleTenantCardBtn(state, toggle) {
    state.tenantCard_visible =
      typeof toggle === 'boolean' ? toggle : !state.tenantCard_visible
  },
  // 房客+1
  addTenant(state, idx) {
    state.tenants[idx].quantity++
  },
  // 房客-1
  reduceTenant(state, idx) {
    state.tenants[idx].quantity--
  },
  // 選擇付款方式
  selectPayment(state, v) {
    state.select = v
  },
}

export const actions = {}
