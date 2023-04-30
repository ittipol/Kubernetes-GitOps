// import { createError, sendError } from 'h3';

export default defineEventHandler(async (event) => {

    const runtimeConfig = useRuntimeConfig();
    const { method, url, headers } = event.req;

    // const body = await readBody(event)

    console.log('####### Server')
    console.log(runtimeConfig.apiSecret)
    console.log(runtimeConfig.public.apiBase)

    // console.log(headers)

    if (event.req.method === 'POST') {
        // create a blog
        // return the blog;
    }

    try {

        // const response = await $fetch('http://localhost:4040/auth/validate');

        // const result = await $fetch('https://my.api.com/test', {
        //     headers: {
        //     Authorization: `Bearer ${useRuntimeConfig().apiSecret}`
        //     }
        // })

        console.log('Success')

    } catch {
        console.log('Error')
    }
    

//   if (!config.apiBaseUrl) {
//     throw new Error('Missing `runtimeConfig.apiBaseUrl` configuration.');
//   }

//   const { method, url, headers } = event.req;
//   const body = method !== 'GET' && method !== 'HEAD' ? await useBody(event) : undefined;

//   try {
//     const response = await $fetch.raw(url, {
//       method,
//       baseURL: config.apiBaseUrl,
//       headers: {
//         'content-type': 'application/json',
//         cookie: headers.cookie,
//       },
//       body,
//     });

//     for (const header of ['set-cookie', 'cache-control']) {
//       if (response.headers.has(header)) {
//         appendHeader(event, header, response.headers.get(header));
//       }
//     }

//     return response._data;
//   } catch (error) {
//     return createError({
//       statusCode: error.response.status,
//       statusMessage: error.message,
//       data: error.data,
//     });
//   }

    appendHeader(event, "aaaa", "bbb");

    // throw createError({ statusCode: 403, statusMessage: 'Page Not Found' })
    // return createError({ statusCode: 401, statusMessage: 'success', data: {} })

    return {
        test: 'post...'
    }
});