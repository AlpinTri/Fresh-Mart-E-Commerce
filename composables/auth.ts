interface userData {
  username: string
  isLogin: boolean
  nomor_hp: string | number
}

export function setUser(data: userData) {
  window.localStorage.setItem('user:primary', JSON.stringify({ ...data }))
}

// export function isLogin() {
//   if (useCookie('fresh_mart_authorization').value) {
//     return useState('user:login', () => true)
//   } else {
//     return useState('user:login', () => false)
//   }
// }