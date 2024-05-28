const body = {
    _allowedProps: ['name'],
    name: {
        required: true,
        type: 'string'
    }
}
const params = {
    id: {
        required: true,
        type: 'string',
        regexp: /^[0-9a-fA-F]{24}$/
    }
}

export const boardsSchemas = {
    post: {
        body
    },
    put: {
        body,
        params
    },
    deleteOne: {
        params
    }
}
