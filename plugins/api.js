export default function ({ $axios }, inject) {
  // Create a custom axios instance
  const api = $axios.create({
    headers: {
      common: {
        Accept: 'text/plain, */*'
      }
    }
  })

  // Set baseURL to something different
  api.setBaseURL('http://192.168.56.101:8000/api/')

  // Inject to context as $api
  inject('api', api)
}
