// https://axios.nuxtjs.org/helpers/#setheader-name-value-scopes-common
export default function ({ $axios, redirect, $auth }) {
  $axios.onRequest((config) => {
    console.log('Making request to ' + config.url)

    if (
      typeof $auth !== 'undefined' &&
      typeof $auth.strategy.token.get() !== 'undefined'
    ) {
      //header 預設帶入Login拿到的token
      $axios.defaults.headers.common['Authorization'] =
        $auth.strategy.token.get()
    }
  })

  $axios.onResponse((response) => {})

  $axios.onError((error) => {
    if (error.response.status === 401) {
      console.log('需要登入才能看到')
      // redirect('/')
    }
  })
}
