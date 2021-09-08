# Login and Logout Setup For Client Side

Create a js file to submit the POST data to the server from the login form

```

//import axios from 'axios'  // this would need to be CDNed unless you add parcel-bundler


export const login = async function(req,res,next){
	const res = await axios({
		method : 'POST',
		url : 'http://127.0.0.1/api/v1/users/login',
		data : {
			email,
			password
		}
	})

if(res.data.status === "success"){

res.redirect('/exhibitors');
}

}


```

Install and add in a cookie parser in app.js and test it

```

const cookieParser=require(cookie-parser)

...

app.use((req,res,next)=>{
console.log(req.cookies)
})


```

Remember to update the protect and allow to accept cookies

```

if(req.cookies.jwt){
  token==req.cookies.jwt;
}

```

Them protect the routes the VIEWS using PROTECT or ISLOGGEDIN.

```
router.user(authController.protect)

router.get('/',viewController.getOverview)
```

An 'IsLoggedIn' middleware which is similar to the protect middleware except
that it does not aim to thrown any error but simply checks if the user is logged
in and then goes to the next middleware

```
router.use(authController.isLoggedIn)

router.get('/',viewController.getOverview)

```

This is how the isLoggedIn middleware is structured

```

// Only for rendered pages, no errors!
exports.isLoggedIn = async (req, res, next) => {
  if (req.cookies.jwt) {
    try {
      // 1) verify token
      const decoded = await promisify(jwt.verify)(
        req.cookies.jwt,
        process.env.JWT_SECRET
      );

      // 2) Check if user still exists
      const currentUser = await User.findById(decoded.id);
      if (!currentUser) {
        return next();
      }

      // 3) Check if user changed password after the token was issued
      if (currentUser.changedPasswordAfter(decoded.iat)) {
        return next();
      }

      // THERE IS A LOGGED IN USER
      res.locals.user = currentUser;
      return next();
    } catch (err) {
      return next();
    }
  }
  next();
};


```

Note that the isLoggedIn middleware is not 'catchAsync' intentionally as it
causes an error when loggin in due to its catchAsync properties which don't
allow it to escape errors

Also the res.locals.user has been updated with the current logged in user in
PROTECT and ISLOGGEDIN middlewares
