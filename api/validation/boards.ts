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
                type: 'string'
            }
        }
    },
    put: {
        body: {
            _allowedProps: ['name', 'order'],
            name: {
                required: false,
                type: 'string'
            },
            order: {
                required: false,
                _store: {
                    _allowedProps: ['ToDo', 'InProgress', 'Done'],
                    ToDo: {
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
