export default defineEventHandler(async (event) => {

    setResponseStatus(event, 200)

    appendHeader(event, 'set-cookie', `refresh-token=''; path=/; max-age=0; httponly;`);

    return 'OK'

});