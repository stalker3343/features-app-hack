const { resolve } = require('path')
const PortfolioModule = function () {
  this.extendRoutes((routes) => {
    routes.unshift({
      name: 'login',
      path: '/login',
      component: resolve(__dirname, 'pages/login.vue'),
    })

    // routes.unshift({
    //   name: 'register',
    //   path: '/register',
    //   component: resolve(__dirname, 'pages/register.vue'),
    // })
    // routes.unshift({
    //   name: 'code',
    //   path: '/code',
    //   component: resolve(__dirname, 'pages/code.vue'),
    // })

    // routes.unshift({
    //   name: 'restore-password',
    //   path: '/restore-password',
    //   component: resolve(__dirname, 'pages/restorePasswordEmail.vue'),
    // })
    // routes.unshift({
    //   name: 'restore-password-confirm',
    //   path: '/restore-password-confirm',
    //   component: resolve(__dirname, 'pages/restorePassword.vue'),
    // })
  })
}

export default PortfolioModule
