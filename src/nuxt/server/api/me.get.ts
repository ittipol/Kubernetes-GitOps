export default defineEventHandler(async (event) => {

    const runtimeConfig = useRuntimeConfig();
    // const { method, url, headers } = event.req;
    // const body = await readBody(event)
    // const cookies = parseCookies(event)
    const authorization = getRequestHeader(event,'authorization')

    try {;

        const response = await $fetch.raw('users/profile', {
            method: 'GET',                
            baseURL: runtimeConfig.public.apiBaseProxy,
            headers: {
                'content-type': 'application/json',
                // cookie: headers.cookie,
                'authorization': authorization
            }
        });        

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