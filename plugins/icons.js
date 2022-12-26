import Vue from 'vue'
// 引用組件
import SvgIcon from '@/components/SvgIcon.vue'

// 註冊全局組件,組建名為svg-icon
Vue.component('svg-icon', SvgIcon)

// 引用svg圖標
// 引用項目 assets/svg 目錄下的所有 .svg 文件
// 如果第二個參數為 true, 程序將會 assets/svg 目錄下的子目錄, 並引用其中的 .svg 文件
// 如果不需要遍歷子目錄,可設為 false
const requireAll = (requireContext) => requireContext.keys().map(requireContext)
const req = require.context('@/assets/svg', true, /\.svg$/)
requireAll(req)
