# User Authorisation

1. Restrict access to fixed set of roles

**Create a restrictTo method and use as middleware before route but after
'protect' middleware**

Please note that the req.user.role comes from the 'protect' middleware where it
assigns the currentUser to the req.user

```
exports.restricTo=function(...roles){

    return (req,res,next)=>{
        if(!roles.includes(req.user.role)) {
            return next(new AppError("Not Authorised"),403)
        }
        next();
    }

}

```
