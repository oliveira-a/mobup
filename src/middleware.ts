import NextAuth from 'next-auth'
import { authConfig } from './auth.config'
import paths from './paths'
import { publicRoutes } from './auth.public-routes'

const { auth } = NextAuth(authConfig)

export default auth(async (req) => {
  if (!req.auth && !publicRoutes.includes(req.nextUrl.pathname)) {
    const loginPage = new URL(paths.login(), req.nextUrl.origin)
    return Response.redirect(loginPage)
  }
})

export const config = {
  // https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}
