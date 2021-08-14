# User Authentication (Signup and Login)

## Postman

1. Setup Postman Environment

**Setting Up Postman**

Create development and production environments and create 'URL' environment
variable.

Assign http://localhost:3000 as value to URL and use {{URL}} to replace it in
the endpoints

Create 'jwt' variable in Test 'tab' to Set An Environment Variable

```
pm.environment.set("jwt", pm.response.json().token);
```

## Sign Up

1. Create /controllers/authController.js
2. Create routes for signup and login
3. Create signup function and create token
4. Validate passwordConfirm in userSchema
5. Encrypt password with bcrycptjs using pre-save middleware in userSchema

**All methods related to Authenticaton and Authorization should be in
authController.js**

**Create signup function and create token in function**

```
exports.signup = catchAsync( async function(req,res,next){
    const newUser = User.create({
        name : req.body.name,
        email : req.body.email,
        password : req.body.password,
        passwordConfirm:req.body.passwordConfirm,
        passwordChangedAt : req.body.passwordChangedAt
    })



const token = signToken(newUser._id);

res.status(200).json({
    status : "success",
    data : {
        user:newUser;
    }
})


})
```

**Validate passwordConfirm in userSchema**

In userSchema pass this validation

```
passwordConfirm : {
    type:String,
    validate : {
        validator : function(el){
            return el === this.password
        },
        message : "Password does not match with passwordConfirm. Please try again"
    }
}

```

**Encrypt password in pre-save middleware userModel.js**

```
userSchema.pre('save', async function (next){

    if(!this.isModified('password')) return next();

    this.password = await bcrypt.hash(this.password, 12)
    this.passwordConfirm = undefined;
    next();

})
```

## Login

1. Verify login request
2. Sign JWT and send to client

**Check if email and password exist**

```
const {email,password} = req.body;

if(!email || !password){
    return next(new AppError('Not Logged In'),401)
}

```

**Check if user exists and ensure password in visible in currentUser variable**

```
currentUser = User.findOne({email : email}).select('+password')

if(!currentUser){
    return next(new AppError('User does not exist',401))
}

```

**Create 'correctPassword' instance method in userModels.js**

```
userSchema.methods.correctPassword = async function(candidatePassword,userPassword){
    return await bcrypt.compare(candidatePassword,userPassword)
}
```

**Use correctPassword method on currentUser to check if password matches**

```
if(!(await currentUser.correctPassword(password,currentUser.password))
return next(new AppError('Password does not match',401))

```

**Sign JWT Token and send to client**

```
const signToken = function(id){
    return jwt.sign({id:id}, process.env.JWT_SECRET,{
        expiresIn : process.env.JWT_EXPIRES_IN
    })
}

const token = signToken(currentUser._id);

res.status(200).json({
    status: "success",
    token
})

```

## Protect Route

1. Create /authController.protect and use as middleware to protect routes

**Check if token exists and if it starts with 'Bearer' and create token**

```
if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
const token = req.headers.authorization.split(' ')[1];
}

if(!token) return next(new AppError('User does not have token',401))

```

**Verify Token**

```
const decoded = await promisify(jwt.verify)(token,process.env.JWT_SECRET);

```

**Note that above does not return next(new AppError) as the protect function is
wrapped with catchAsync and a Rejected promise would throw an error that would
be handled by globalErrorController**

**Check if user still exists**

```
const currentUser = User.findById(decoded.id);

if (!currentUser){
    return next(new AppError('User with this token does not exist',401));
}

```

**Create changedPasswordAfter instance method in userModels.js**

```
userSchema.methods.changedPasswordAfter = function(JWTTimeStamp){

    if(this.passwordChangedAt){

    const changedTimeStamp = parseInt(this.passwordChangedAt.getTime()/1000,10);

    return JWTTimeStamp < changedTimeStamp
    }

return false;

}
```

**Check if user changed password after token was issued**

```
if(currentUser.changedPasswordAfter(decoded.iat)){
    return next (new AppError('Password was changed after token was issued',401))
}

```

**Assign current user as req.user as it is an imp step in User Authorisation
ahead and then Grant Access by declaring next()**

```
req.user = currentUser;
next()

```
