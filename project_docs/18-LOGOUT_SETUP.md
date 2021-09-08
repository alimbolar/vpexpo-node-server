# Logout Setup For Client Side

Logging out basically means deleting or making void the cookie that was created
during login so that it's no longer accepted by the application.

As the httpOnly property is true, the client/browser cannot modify the current
cookie but we can create a similar named cookie, thus overwriting the earlier
one with data that would make it void for logging in.

Create a GET route in the authRouter file

```
router.route("/logout").get(authController.logout);

```

And in the authController, add the logout method

```
exports.logout = function(req, res, next) {
  res.cookie("jwt", "loggedout", {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });
  res.status(200).json({
    status: "success",
  });
};

```

Then in the login.js file, add a logout function that can be called by the
client/browser on click

```

const logout = async function(){

const res = await axios({
    method : 'GET',
    url : 'http://127.0.0.1/api/v1/users/logout'
})


}



```
