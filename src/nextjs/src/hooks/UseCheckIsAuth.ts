import { store } from '../lib/store'
import { updateRender } from '../lib/slices/common'
import { refreshToken, fetchUser } from '../lib/slices/auth'

const UseCheckIsAuth = () => {

    const autoLogin = async () => {

        try {                
          const _res = await store.dispatch(refreshToken())          
          const _resUser = await store.dispatch(fetchUser())
        }
        catch (ex) {}
        finally {
          store.dispatch(updateRender({isRender: true}))
        }
    
    }

    return [autoLogin]
}

export default UseCheckIsAuth