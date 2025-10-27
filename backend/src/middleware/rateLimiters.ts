import { logger } from '@/utils/logger';
import rateLimit from 'express-rate-limit';

class RateLimiters {
    public static GlobalRateLimiter = rateLimit({
        windowMs: 15 * 60 * 1000, // ⏱️ 15 minutes
        limit: 250, // 🔐 limit each IP to 100 requests per windowMs
        message: 'Too many requests from this IP, please try again after 15 minutes',
        standardHeaders: true, // Return rate limit info in `RateLimit-*` headers
        legacyHeaders: false, // Disable the `X-RateLimit-*` headers
        handler: (req, res, next, options) => {
            logger.error(`[${req.ip}] exceeded limit (${options.limit} req/15min)`);
            return res.status(429).json({ message: 'Rate limit exceeded' });
        },
    });
}

export default RateLimiters;
