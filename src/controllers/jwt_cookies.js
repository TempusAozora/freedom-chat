import jwt from "./jwt_promises.js";

export function tokenCookies(secretkey) {
    return function(req, res, next) {  
        const original_cookies = res.cookie;

        res.cookie = async function(key, value, options) { // Will soon make it expire after 7 days.
            const token = await jwt.sign({payload: value}, secretkey);
            original_cookies.call(this, key, token, options);
        };
        
        next();
    };
}

export function parseCookies(secretKey, BYPASS_UPGRADE=false) {
    return async function(req, res, next) {
        if (!BYPASS_UPGRADE && req.headers.upgrade) {
            return next && next();
        }

        const cookie_raw = `; ${req.headers.cookie}`;
        let cookies = cookie_raw.split(`; `);
        cookies.shift();

        const token_cookies = Object.fromEntries(
            await Promise.all(
                cookies.map(async (str) => {
                    const [key, value] = str.split('=');
                    const decoded = await jwt.decode(value, secretKey);
                    return [key, decoded && decoded.payload];
                })
            )
        );

        req.token_cookie = token_cookies;
        next && next();
    };
}