// https://axios.nuxtjs.org/helpers/#setheader-name-value-scopes-common
export default function ({ $axios, redirect }) {
  $axios.onError((error) => {
    if (error.response.status === 500) {
      redirect('/sorry')
    }
  })
}
