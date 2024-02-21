export {default } from 'next-auth/middleware'

export const config = { match: [
    '/dashboard',
    '/app/:path*'
]
}