const express = require('express');
const rateLimit = require('express-rate-limit');

const app = express();
const port = process.env.PORT | 3300
// Defining rate limiting rule
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per 15 minutes
    message: (req, res) => {
        return `Too many requests from IP ${req.ip}. Please try again later.`;
    }
});

// Apply the rate limiting middleware to all requests
app.use(limiter);

app.get('/api', (req, res) => {
    res.send('This route is rate-limited.');
});

app.get('/', (req, res) => {
    res.send('This is a Rate Limiting test api');
});

app.listen(3300, () => {
    console.log(`Server running on http://localhost:${port}`);
});
