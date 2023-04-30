export default defineEventHandler((event) => {
    console.log('[Server Middleware] New request: ' + event.node.req.url)
    // const { method, url, headers } = event.req;

    // console.log(headers)
})
  