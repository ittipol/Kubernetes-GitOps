export default defineEventHandler(async (event) => {

    const runtimeConfig = useRuntimeConfig()
    const cookies = parseCookies(event)
    // const headers = getRequestHeaders(event)
    let _cookies: Array<string> = []

    Object.entries(cookies).forEach((keyArr) => {
            
        if(keyArr[0] === "refresh-token") {
            _cookies.push(`${keyArr[0]}=${keyArr[1]}`)
        }

    })

    try {;

        const response = await $fetch.raw('auth/refresh', {
            method: 'GET',                
            baseURL: runtimeConfig.public.apiBaseProxy,
            headers: {
                'content-type': 'application/json',
                'cookie': _cookies.join(' ')
                // 'authorization': authorization
            }
        });
        
        for (const header of ['set-cookie', 'cache-control']) {
            if (response.headers.has(header)) {
              appendHeader(event, header, response.headers.get(header));
            }
        }    

        setResponseStatus(event, response.status)

        return response._data

    } catch(error) {   
        appendHeader(event, 'set-cookie', `refresh-token=''; path=/; max-age=0; httponly;`);
            
        throw createError({
            statusCode: error.response.status,
            statusMessage: error.message,
            data: error.data,
        });
    }
});