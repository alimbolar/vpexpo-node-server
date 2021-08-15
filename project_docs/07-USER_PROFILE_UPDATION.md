# User Profile Updations

**Ensure that the route is protected**

_As it is the protect function ensures the user (req.user) is passed on to the
next() middleware_

---

## Update My Password

_(This function should be in the authController.js)_

**Get user from collection and ensure .select('+password)**

**Check if POSTed password is correct**

**If so, update the password**

**Create And Send Token**

```
exports.updateMyPassword = catchAsync(async function(req, res, next) {
  //**Get user from collection and ensure .select('+password)**
  const user = await User.findById(req.user._id).select("+password");

  if (!user) return next(new AppError("User with this ID does not exist", 401));

  //**Check if POSTed password is correct**
  if (!(await user.correctPassword(req.body.passwordCurrent, user.password))) {
    return next(new AppError("Incorrect Password", 401));
  }

  //**If so, update the password**
  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  await user.save();

  //**Create And Send Token**
  createSendToken(user, 200, res);
});

```

**Ensure the createSendToken function is added**

```
const createSendToken = function(user, statusCode, res) {
  const token = signToken(user._id);
  res.status(statusCode).json({
    status: "success",
    token,
    user,
  });
};

```

---

## Update Me

_(This function should be in the userController.js)_

**Create Error if user posts password data**

**Filter out unwanted fields to ensure only needed fields and its data exist**

**Update Data**

```
exports.updateMe = catchAsync(async function(req, res, next) {
  // **Create Error if user posts password data**
  if (req.body.password || req.body.passwordConfirm)
    return next(
      new AppError(
        "This is the wrong route. For all password updates use /updateMyPassword",
        401
      )
    );
  // **Filter out unwanted fields to ensure only needed fields and its data exist**

  const filteredBody = filterObj(req.body, "name", "email");

  // **Update Data**
  const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    status: "success",
    data: {
      user: updatedUser,
    },
  });
});


```

**Ensure you have the filterObj function created**

```
const filterObj = function(obj, ...allowedFields) {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });

  return newObj;
};

```

---

## Delete Me

_(This function should be in the userController.js)_

**Ensure userSchema has 'active' field with default as true**

**Ensure there's a middleware Document Query that filters out all active fields
set to false**

**Find user and change value of active to false**

```
exports.deleteMe = catchAsync(async function(req, res, next) {
  //**Ensure userSchema has 'active' field with default as true**

  //**Ensure there's a middleware Document Query that filters out all active fields set to false**

  //**Find user and change value of active to false**

  const deletedUser = await User.findByIdAndUpdate(req.user.id, {
    active: false,
  });

  res.status(204).json({
    status: "success",
    data: {
      user: null,
    },
  });
});


```

**Ensure the Document Middleware below exists in the userModel.js**

```
userSchema.pre(/^find/, function(next) {
  this.find({ active: { $ne: false } });
  next();
});

```
