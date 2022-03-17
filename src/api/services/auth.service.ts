export class AuthService {
  login(login: string, password: string) {
    const role = login === 'admin' ? 'admin' : 'user';
    return new Promise((resolve, reject) => {
      setTimeout(() => {
          resolve(role)
          // reject(new Error('Test Error'))
        }, 1500
      );
    })
  }
  logout() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
          resolve(true)
          // reject(new Error('Test Error'))
        }, 100
      );
    })
  }
}
