import { NextRequest, NextResponse } from 'next/server'
import { internalApi } from '../api'
import { localeConfig } from '@/localization/localeConfig'
import { isAxiosError } from 'axios'

export async function authMiddleware(req: NextRequest): Promise<NextResponse | void> {
  const session_id = req.cookies.get('session_id')?.value
  const pathname = req.nextUrl.pathname
  const locale = req.cookies.get(localeConfig.cookieName)?.value||localeConfig.defaultLocale

    if (pathname.startsWith(`/${locale}/profile`) && !session_id) {
      return NextResponse.redirect(new URL('/login', req.url))
    }


    if (pathname.startsWith(`/${locale}/dashboard`)) {
      try{
        const res = await internalApi.get('/api/auth/session', {
        headers: { cookie: `session_id=${session_id}` }
      })
      if (!res.data.user.is_admin){
        return NextResponse.redirect(new URL('/', req.url))
      }
      }
      catch(error){
        if (isAxiosError(error)){
          if (error.response?.status === 401) {
            return NextResponse.redirect(new URL(`/${locale}/login`, req.url))
          }
        }
      }
    }
  return 
}
