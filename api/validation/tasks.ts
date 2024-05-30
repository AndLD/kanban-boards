const id = {
    required: true,
    type: 'string',
    regexp: /^[0-9a-fA-F]{24}$/
}

export const tasksSchemas = {
    post: {
        body: {
            _allowedProps: ['title', 'description', 'status'],
            title: {
                required: true,
                type: 'string',
                maxStringLength: 100,
                minStringLength: 1
            },
            description: {
                required: false,
                type: 'string',
                maxStringLength: 200
            }
        },
        params: {
            boardId: id
        }
    },
    put: {
        body: {
            _allowedProps: ['title', 'description', 'status'],
            title: {
                required: false,
                type: 'string',
                maxStringLength: 100,
                minStringLength: 1
            },
            description: {
                required: false,
                type: 'string',
                maxStringLength: 200
            }
        },
        params: {
            boardId: id,
            id
        }
    },
    deleteOne: {
        params: {
            boardId: id,
            id
        }
    }
}
