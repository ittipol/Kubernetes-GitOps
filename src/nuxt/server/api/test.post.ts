// import { createError, sendError } from 'h3';

export default defineEventHandler(async (event) => {

    const runtimeConfig = useRuntimeConfig();
    // const { method, url, headers } = event.req;
    const body = await readBody(event)
    // const cookies = parseCookies(event)

    console.log('############################################### Server')
    // console.log(runtimeConfig.apiSecret)
    // console.log(runtimeConfig.public.apiBase)
    // console.log(cookies)

    try {

        const response = await $fetch.raw('auth/signin', {
            method: 'POST',                
            baseURL: runtimeConfig.public.apiBase,
            headers: {
                'content-type': 'application/json',
                // cookie: headers.cookie,
            },
            body: body
        });
        
        for (const header of ['set-cookie', 'cache-control']) {
            if (response.headers.has(header)) {
              appendHeader(event, header, response.headers.get(header));
            }
        }
      

        console.log('Success')
        // console.log(response._data)

        setResponseStatus(event, response.status)

        return response._data

    } catch(error) {        
        return createError({
            statusCode: error.response.status,
            statusMessage: error.message,
            data: error.data,
        });
    }

});