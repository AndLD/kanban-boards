export function adjustBody<T>(body: T) {
    const result = {} as T

    Object.keys(body).forEach((key) => {
        if (body[key] !== undefined && key !== '_id') {
            result[key] = body[key]
        }
    })

    return result
}
