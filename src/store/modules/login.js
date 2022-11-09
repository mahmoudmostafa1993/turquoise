import axios from 'axios'
import { API_URL } from '../../config'
import router from '../../router/router'
const Login = {
  state: {
    // isLoading: false,
    loginErrorMessage: '',
    loginSuccessful: false,
    token: localStorage.getItem('token'),
    userDataPermission: null,
    userAuth: '',
    userToken: '',
    successMessage: '',
    successMessageReset: '',

  },
  getters: {
    token (state) {
        return state.token
    },
  },
  mutations: {
    resetState (state) {
      state.isLoading = false
      state.loginErrorMessage = null
      state.loginSuccessful = false
      state.successMessage = ''
      state.successMessageReset = ''
  },
    // Logout
    logout () {
      localStorage.removeItem('token')
      localStorage.removeItem('userData')
      router.push('/login')
    },
    //  Set Token
    setToken (state, data) {
      localStorage.setItem('token', data.token)
      state.token = data.token
  },
  },
  actions: {
    doLogin ({ commit, state, dispatch }, loginData) {
      commit('resetState')
      const userData = {
        email: loginData.email.replace(/\s+/g, ''),
        password: loginData.password,
        scope: '*',
      }
      axios.post(`${API_URL}/login`, userData)
        .then((response) => {
          state.isLoading = true
          console.log('login response', response)
          if (response.status === 200) {
            localStorage.setItem('token', response.data.access_token)
            localStorage.setItem('refresh-token', response.data.refresh_token)
            localStorage.setItem('userLang', 'en')
            localStorage.setItem('userName', response.data.name)
            state.userToken = response.data.token
            window.location.href = process.env.BASE_URL
          } else {
            console.log('response=>', response)
            state.loginErrorMessage = response.data.message
            state.isLoading = true
          }
        })
        .catch(error => {
          console.log('error=>', error)
          state.loginErrorMessage = error.response.data.message
          state.isLoading = true
        })
    },
  },
}

export default Login
