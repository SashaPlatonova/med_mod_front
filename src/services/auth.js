import axios from 'axios'

const API_URL = 'http://localhost:8080/api/auth/'

class AuthService {
  login (user) {
    var options = {
      headers: {
      },
      credentials: true
    }
    return axios
      .post(API_URL + 'signin', {
        username: user.username,
        password: user.password
      }, options)
      .then(response => {
        if (response.data.token) {
          console.log('1111')
          localStorage.setItem('user', JSON.stringify(response.data))
          this.$cookies.set('token', response.data.token, 60 * 60 * 24 * 30)
          window.$cookies.set('token', response.data.token, 60 * 60 * 24 * 30)
          console.log(window.$cookies.get('token').toString())
          console.log('token')
        }

        return response.data
      })
  }
}
export default new AuthService()
