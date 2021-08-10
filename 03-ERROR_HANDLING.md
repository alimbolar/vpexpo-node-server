# Error Handling

1. Global Error Handler
2. Handle Errors in Async Functions
3. 404 Errors
4. Mongoose Errors
5. Unhandled Rejections
6. Unhandled Exceptions

---

## Global Error Handler

**Create AppError Class**

- Ideally in utils folder create a class AppError by extending the inbuilt Error
  class for all new Error

```
class AppError extends Error{
    constructor(message,statusCode){
        super(message);
        this.statusCode = statusCode || 500;
        this.status = `${statusCode}`.startsWith('4') ? "fail" : "error";
        this.isOperational = true;
        Error.captureStackTrace(this,this.constructor);
    }
}

module.exports = AppError;


```

**Import AppError Class into app.js to test with middleware for non-existent
routes**

```
const AppError = require('./utils/AppError)
```

**Test with middleware for non-existent routes**

```
app.use('*',function(req,res,next){
    err = new AppError(`This is the message for the error at ${req.originalUrl}`,404);
    next(err);
})

```

```
app.use(globalErrorController);

```

** Make sure the function for globalErrorController is created in
/controllers/errorController.js**

```
const AppError = require("./../utils/AppError");

const handleCastErrorDB = function(err) {
  const message = `Invalid ${err.path} : ${err.value}`;
  console.log(message);
  return new AppError(message, 400);
};

const sendErrorDev = function(err, res) {
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};

const sendErrorProd = function(err, res) {
  // Operational Errors and can be sent to client

  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
    // Programatic errors and hence send a generic error message
  } else {
    // 1) Log Error
    console.error("ERROR 💥 :", err);

    // 2) Send Error to client
    res.status(500).json({
      status: "error",
      message: "Something went wrong",
    });
  }
};

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  if (process.env.NODE_ENV === "development") {
    sendErrorDev(err, res);
  } else if (process.env.NODE_ENV === "production") {
    let error = Object.assign(err);
    console.log(error.name);
    console.log(err.name);

    if (error.name === "CastError") {
      error = handleCastErrorDB(error);
    }

    sendErrorProd(error, res);
  }


  next();
};



```

---

## Catching Errors on Async Functions

**Create function in ./utils/catchSync.js to return Async functions and then use
.catch for Errors**

```
module.exports = fn =>{
    return (req,res,next)=>{
        fn(req,res,next).catch(next);
    }
}

```

**Import function and use on all Async functions in controller folders**

```
exports.getAllUsers = catchAsync(async function(){
    const data = await Tour.find();
    res.status(200).json({
        status:"success",
        data
    })
})

```

---

## 404 Errors

**For requests based on incorrect IDs the result is NULL and should be handled
as below**

```
const user = await User.findById('req.params.id')

if(!user){
    return next(new AppError('A user with this ID does not exist',404));
}

```

---

## Mongoose Errors

**Create following functions for 3 types of Mongoose errors related to
database**

```
const handleCastErrorDB = function(err) {
  const message = `Invalid ${err.path} : ${err.value}`;
  return new AppError(message, 400);
};

const handleDuplicateFieldsDB = function(err) {
  const message = `The  '${
    Object.keys(err.keyValue)[0]
  }' field has a  duplicate value of '${Object.values(err.keyValue)[0]}'`;
  return new AppError(message, 400);
};

const handleValidationError = function(err) {
  const errors = Object.values(err.errors)
    .map(el => el.message)
    .join('. ');
  const message = `Validation Errors : ${errors} `;
  return new AppError(message, 400);
};

```

**Optional function for handleDuplicateFieldsDB**

```
const handleDuplicateFieldsDB = function(err) {
  const [error] = Object.entries(err.keyValue);
  const message = `This field '${error[0]}' has a duplicate value of '${error[1]}'`;
  return new AppError(message, 400);
};

```

**Add following code to the exported function from errorController.js**

```
   // let error = { ...err };
    let error = Object.assign(err);

    if (error.name === 'CastError') {
      error = handleCastErrorDB(error);
    }

    if (error.code === 11000) {
      error = handleDuplicateFieldsDB(error);
    }

    if (error.name === 'ValidationError') {
      error = handleValidationError(error);
    }

    sendErrorProd(error, res);


```

---

## Unhandled Rejections

**Catch all unhandled rejects by placing code below in server.js after all the
other code**

```
process.on('unhandledRejection,()=>{
  console.log('UNHANDLED REJECTION 💥 : ',err.name,err.message );
  console.log('STACK :',err.stack);
  console.log('Shutting down server...');
  // ensure the server const has been created by assigning value of app.listen() to server
  server.close(()=>process.exit(1));
})
```

---

## Unhandled Exceptions

**Catch all unhandled exceptions by placing code below in server.js as much as
possible before any other code**

```
process.on('unhandledException',()=>{
  console.log('UNHANDLED EXCEPTION 💥 : ', err.name, err.message);
  console.log('Shutting down server...');
  process.exit(1);
})

```
