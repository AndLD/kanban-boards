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
                type: 'string'
            },
            description: {
                required: false,
                type: 'string'
            },
            status: {
                required: true,
                type: 'string',
                equals: ['ToDo', 'InProgress', 'Done']
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
                type: 'string'
            },
            description: {
                required: false,
                type: 'string'
            },
            status: {
                required: false,
                type: 'string',
                equals: ['ToDo', 'InProgress', 'Done']
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
