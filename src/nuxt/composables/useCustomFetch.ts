import { useAuthStore } from "../stores/auth";
import { ResponseEntity } from '../models/type'

const RETRY_ATTEMP_LIMIT = 3

const useCustomFetch = () => {
    
    const requestWithAttempt = async (url: string, options: {} = {}) => {        

        const store = useAuthStore()
        const { client } = fetchInstance()

        if(options.retryCount === undefined) {
            options.retryCount = 1
        }

        try {
            const response = await client.raw(url, options)
            return response._data
        } catch(error) {            
            if(options.retryCount < RETRY_ATTEMP_LIMIT && error.status === 401) {
                console.log('[Un Auth] => try to get new refresh token')

                const _res:ResponseEntity = await store.refreshToken()

                if(_res.status === 200) {
                    console.log('retry...')
                    options.retryCount++
                    return await requestWithAttempt(url, options)
                }

                await store.logout()           
            }
                    
            throw createError({
                statusCode: error.response.status,
                statusMessage: error.message,
            });
        }
    }

    return {requestWithAttempt}
}

const fetchInstance = () => {

    const client = $fetch.create({
        // baseURL: '',
        async onRequest({ request, options }) {
            const store = useAuthStore()
    
            // Log request
            console.log('[Request]', request, options)
    
            if(store.accessToken !== "") {
                options.headers = {
                    'authorization': `Bearer ${store.accessToken}`,
                }
            }        
        },
        async onResponseError({ request, response, options }) {
            // Log error
            console.log('[Response error]', request, response.status, response.body)
        }
    })

    return {client}

}

export default useCustomFetch