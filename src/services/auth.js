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
          // localStorage.setItem('user', JSON.stringify(response.data))
          this.$cookies.set('token', response.data.token, 60 * 60 * 24 * 30)
          this.$cookies.set('role', response.data.roles[0])
          window.$cookies.set('token', response.data.token, 60 * 60 * 24 * 30)
        }

        return response.data
      })
  }
}
export default new AuthService()
