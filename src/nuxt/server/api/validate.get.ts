export default defineEventHandler(async (event) => {

    const runtimeConfig = useRuntimeConfig()
    const cookies = parseCookies(event)
    // const headers = getRequestHeaders(event)
    let _cookies: Array<string> = []

    // console.log(cookies)
    // console.log(cookies)    

    Object.entries(cookies).forEach((keyArr) => {
            
        if(keyArr[0] === "refresh-token") {
            _cookies.push(`${keyArr[0]}=${keyArr[1]}`)
        }

    })

    try {;
console.log(runtimeConfig.public.apiBaseProxy)
        const response = await $fetch.raw('auth/validate', {
            method: 'GET',                
            baseURL: runtimeConfig.public.apiBaseProxy,
            headers: {
                'content-type': 'application/json',
                'cookie': _cookies.join(' ')
                // 'authorization': authorization
            }
        });
        
        // for (const header of ['set-cookie', 'cache-control']) {
        //     if (response.headers.has(header)) {
        //       appendHeader(event, header, response.headers.get(header));
        //     }
        // }    

        setResponseStatus(event, response.status)

        return response._data

    } catch(error) {       
        throw createError({
            statusCode: error.response.status,
            statusMessage: error.message,
            data: error.data,
        });
    }

});