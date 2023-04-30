export type ResponseEntity = {
    data: {} | string | number,
    message: string,
    status: number
}

export const responseData = (error: ResponseEntity): ResponseEntity => {
    return error
}