import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  const allCookies = request.cookies.getAll()
  
  // request.cookies.has('nextjs') // => true
  // request.cookies.delete('nextjs')
  // request.cookies.has('nextjs') // => false
  // let token = request.cookies.get('refresh-token')?.value  

  console.log(' >>>>>  [Middleware] ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^')
  console.log(request.nextUrl.pathname)
//   console.log(allCookies)
  

let _isAuth:boolean = false
if(request.cookies.has('refresh-token')) {

    // if has cookie then refresh token here
    // await refreshToken(allCookies)

    _isAuth = await validateUser(allCookies)
}

console.log('^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^')

//   try {
    
//     // if(request.cookies.has('refresh-token')) {
//       
//     // }       

//   }
//   catch {
//     console.log('User validate failed')
//   }

  switch(request.nextUrl.pathname) {
    case '/login':

        if(_isAuth) {
            return NextResponse.redirect(new URL('/', request.url))
        }

        break;

    case '/profile':
        
        if(!_isAuth) {
            return NextResponse.redirect(new URL('/', request.url))
        }

        break;
  }

  
//   if (request.nextUrl.pathname.startsWith('/profile')) {
    // return NextResponse.redirect(new URL('/about', request.url))
//   }
  
//   if (request.nextUrl.pathname.startsWith('/dashboard')) {
//     return NextResponse.rewrite(new URL('/dashboard/user', request.url))
//   }

//   return NextResponse.json({ message: 'Auth required' }, { status: 401 })

    return NextResponse.next();

}

export const config = {
  matcher: [
      '/login',
      '/profile/:path*'
  ],
}

const validateUser = async (cookies: Array<{}>) => {
    let validate = false
    let _cookies: Array<string> = []

    for(let i = 0; i < cookies.length; i++) {
        _cookies.push(`${cookies[i].name}=${cookies[i].value}`)
    }

    try
    {
      const res = await fetch('http://localhost:3002/api/validate', {
          method: 'GET',
          headers: {
              "cookie": _cookies.join(' '),
          },
      })
      .then((response) => {
          return response.status
      })

      if(res === 200) {
          validate = true
      }

      console.log('middleware => is_validate: '+validate+' ['+res+']')
      return validate
    }
    catch
    {
      console.log('middleware => Validate Error')
      return false
    }
}

const refreshToken = async (cookies: Array<{}>) => {
    let validate = false
    let _cookies: Array<string> = []

    for(let i = 0; i < cookies.length; i++) {
        _cookies.push(`${cookies[i].name}=${cookies[i].value}`)
    }

    try
    {
      const res = await fetch('http://localhost:3001/api/refreshToken', {
          method: 'GET',
          headers: {
              "cookie": _cookies.join(' '),
          },
      })
      .then((response) => {
          return response.status
      })

      if(res === 200) {
        validate = true
      }

      return validate
    }
    catch
    {
        return false
    }
}