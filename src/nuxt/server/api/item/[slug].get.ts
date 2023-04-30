export default defineEventHandler(async (event) => {

    const runtimeConfig = useRuntimeConfig();
    const { method, url, headers } = event.req;
    const params =  event.context.params;

    // const query = getQuery(event)

    // event.context.params.name
});