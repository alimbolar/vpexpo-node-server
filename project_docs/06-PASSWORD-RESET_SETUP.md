# Forgot and Reset Password Setup

## Forgot Password

**Create POST Route**

```

router.route('/forgotPassword').post(authController.forgotPassword)

```

**Create Controller based on these requirements**

1. Get user based on POST email
2. Generate random token
3. Send it back as an email

```
exports.forgotPassword = catchAsync(async function(req, res, next) {
  // 1. Get user based on POST email
  const user = await User.findOne({ email: req.body.email });

  if (!user) return next(new AppError("Email not registered", 404));

  // 2. Generate random token

  const resetToken = user.createPasswordResetToken();
  user.save({ validateBeforeSave: false });

  // 3. Send it back as an email

  const resetURL = `${req.protocol}://${req.get(
    "host"
  )}/api/v1/users/resetPassword/${resetToken}`;
  const message = `Forgot your password? Use this link : ${resetURL}`;
  try {
    await sendMail({
      email: user.email,
      subject: "Your link to reset your password",
      message: message,
    });

    res.status(200).json({
      status: "success",
      message: "Token sent by email",
    });
  } catch (err) {
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    user.save({ validateBeforeSave: false });

    return next(new AppError("Email could not be sent", 500));
  }
});

```

**Ensure the instance method below is created in the userModels.js**

```
userSchema.methods.createPasswordResetToken = async function() {
  const resetToken = crypto.randomBytes(32).toString("hex");

  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  this.passwordResetExpires = Date.now + 10 * 60 * 1000;

  return resetToken;
};

```

**Ensure that sendMail method is created in /utils/email.js**

```
const nodemailer = require("nodemailer");

const sendMail = async function(options) {
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: "Test<test@fourplusmedia.com>",
    to: options.email,
    subject: options.subject,
    text: options.message,
  };
  await transporter.sendMail(mailOptions);
};

module.exports = sendMail;


```

## Reset Password

**Create Reset Route**

```

router.route('/resetPassword').patch(authController.resetPassword);

```

**Create Controller based on these requirements**

1. Get User based on token
2. Check that there's a user and that the token has not expired
3. Set New Password
4. Update passwordChangedAt property for the user
5. Log in the user by sending the JWT Token

```


```

**Ensure the instance method below is added to the userModel.js**

```
userSchema.pre("save", function(next) {
  if (this.isModified("password") || this.isNew) return next();

  this.passwordChangedAt = Date.now() - 1000;
});
```
