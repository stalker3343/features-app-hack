import jsCookies from 'js-cookie'
import serverCookie from 'cookie'

export default function ({ store, redirect, $pinia, req, route }) {
  // If the user is not authenticated
  let user = null
  if (process.server) {
    if (!req.headers.cookie && route.name !== 'login') {
      redirect('/login')
    } else if (req.headers.cookie) {
      const parsedCookies = serverCookie.parse(req.headers.cookie)
      user = parsedCookies.user
    }
  } else {
    const parsedCookies = jsCookies.get() // => { name: 'value' }
    user = parsedCookies.user
  }

  if (!user && route.name !== 'login') {
    return redirect('/login')
  }
}
