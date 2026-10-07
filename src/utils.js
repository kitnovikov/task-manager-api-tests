export const decodeJwt = (token) => {
    try {
        const base64Url = token.split('.').at(1)
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')

        const payload = Buffer.from(base64, 'base64').toString('utf8')

        return JSON.parse(payload)
    } catch (error) {
        return null
    }
}