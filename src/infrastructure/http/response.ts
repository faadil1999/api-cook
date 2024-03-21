import { constants } from "http2";

export type HttpResponse = {
    status: number
    body: any
}

const {
    HTTP_STATUS_OK,
    HTTP_STATUS_NOT_FOUND,
    HTTP_STATUS_BAD_REQUEST,
    HTTP_STATUS_INTERNAL_SERVER_ERROR,
    HTTP_STATUS_CREATED,
    HTTP_STATUS_NO_CONTENT,
    HTTP_STATUS_FORBIDDEN
} = constants


export const ok = (body: HttpResponse['body']): HttpResponse => ({
    status: HTTP_STATUS_OK,
    body
})

export const created = (body: HttpResponse['body']): HttpResponse => ({
    status: HTTP_STATUS_CREATED,
    body
})

export const noContent = (): HttpResponse => ({
    status: HTTP_STATUS_NO_CONTENT,
    body: undefined
})

export const notFound = (body: HttpResponse['body']): HttpResponse => ({
    status: HTTP_STATUS_NOT_FOUND,
    body
})

export const badRequest = (body: HttpResponse['body']): HttpResponse => ({
    status: HTTP_STATUS_BAD_REQUEST,
    body
})

export const forbidden = (body: HttpResponse['body']): HttpResponse => ({
    status: HTTP_STATUS_FORBIDDEN,
    body
})
export const internal = (): HttpResponse => ({
    status: HTTP_STATUS_INTERNAL_SERVER_ERROR,
    body: { message: 'Internal server error', code: 'internal-server-error' }
})

