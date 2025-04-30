import { type NextRequest, NextResponse } from 'next/server'

type Middleware = (req: NextRequest) => Promise<NextResponse | void>

export async function composeMiddleware(req: NextRequest, middlewares: Middleware[]): Promise<NextResponse> {
  let finalResponse: NextResponse | undefined

  for (const mw of middlewares) {
    const res = await mw(req)

    if (res) {
      if (!finalResponse) {
        finalResponse = res
      } else {
        res.cookies.getAll().forEach(cookie => {
          finalResponse!.cookies.set(cookie.name, cookie.value, cookie)
        })
      }
    }
  }

  return finalResponse ?? NextResponse.next()
}
