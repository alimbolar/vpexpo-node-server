# Security Setup

1. Send JWT via Cookie
2. Express Rate Limit
3. Helmet
4. Mongo Sanitization and xss-clean

### Send JWT Via Cookie

**Before you send the final response, add the following response**

```

const cookieOptions= {
    expires : new Date(Date.now()+process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000),
    httpOnly : true
}

if(process.env.NODE_ENV === production) cookieOptions.secure=true;

res.cookie( "jwt", token, cookieOptions)


```

### Express Rate Limit

**Use express-rate-limit in app.js with the following code**

```
const rateLimit = require(express-rate-limit);

....

const limiter = rateLimit({
    max :100,
    windowMs : 60 * 60 * 1000;
    message : "Too many requests from this IP. Try again after 1 day"

})

app.use('/api',limiter);

```

### Helmet

**Use helmet in app.js as below. put it as the first middleware as it's
important to have the headers resolved before other middlewares are called**

```
app.use(helmet());

```

### Sanitize Data

**Use the code below after importing xss-clean**

```
const mongoSanitize = require (express-mongo-sanitize);
app.use(mongoSanitize());

const xss = require('xss-clean');
app.use(xss());

```
