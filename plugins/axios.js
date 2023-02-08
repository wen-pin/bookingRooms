// https://axios.nuxtjs.org/helpers/#setheader-name-value-scopes-common
export default function ({ $axios, redirect, $auth, $toast }) {
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
    // const code = parseInt(error.response && error.response.status)
    // if (code === 401) {
    //   console.log('需要登入才能看到')
    //   $toast.error('需要登入才能看到')
    //   redirect('/401')
    // }
  })

  $axios.onResponseError((error) => {
    const code = parseInt(error.response && error.response.status)

    if (code === 401) {
      $toast.error('帳號或密碼錯誤')
    }

    if (code === 409) {
      $toast.error('帳號已重複，請更改帳號')
    }
  })
}
