import rateLimit from 'express-rate-limit'

const rateLimiter = rateLimit({
    windowMs: 60 * 1000,   // 1 minute window
    max: 40,                // max 3 requests per minute
    message: 'Too many messages, please slow down!'
})

export default rateLimiter