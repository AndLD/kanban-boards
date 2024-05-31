const params = {
    id: {
        required: true,
        type: 'string',
        regexp: /^[0-9a-fA-F]{24}$/
    }
}

export const boardsSchemas = {
    getOne: {
        params
    },
    post: {
        body: {
            _allowedProps: ['name'],
            name: {
                required: true,
                type: 'string',
                maxStringLength: 100,
                minStringLength: 1
            }
        }
    },
    put: {
        body: {
            _allowedProps: ['name', 'order'],
            name: {
                required: false,
                type: 'string',
                maxStringLength: 100,
                minStringLength: 1
            },
            order: {
                required: false,
                _store: {
                    _allowedProps: ['ToDo', 'InProgress', 'Done'],
                    ToDo: {
                        required: false,
                        type: 'array',
                        arrayElementType: 'string'
                    },
                    InProgress: {
                        required: false,
                        type: 'array',
                        arrayElementType: 'string'
                    },
                    Done: {
                        required: false,
                        type: 'array',
                        arrayElementType: 'string'
                    }
                }
            }
        },
        params
    },
    deleteOne: {
        params
    }
}
