export function adjustBody<T>(body: T) {
    const result = {} as T

    Object.keys(body).forEach((key) => {
        if (body[key] !== undefined && key !== '_id') {
            result[key] = body[key]
        }
    })

    return result
}

export function copyToClipboard(text: string) {
    const textarea = document.createElement('textarea')
    textarea.value = text
    textarea.style.position = 'fixed' // Prevent scrolling to bottom of page in MS Edge
    textarea.style.opacity = '0'
    document.body.appendChild(textarea)
    textarea.select()
    document.execCommand('copy')
    document.body.removeChild(textarea)
}
