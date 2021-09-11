# Deployment On Heroku

In the package.json, it's need that you mention this line below based on the
node version you are using

```

"engines": {
    "node": "^12.0.0"
  }

```

It's mandatory to listen the process.env.PORT in the app.js or server.js

```

port = process.env_PORT

```

Update all the config vars with this command below or directly on the server

```

heroku config:set -a vp-expo-node-server EMAIL_PASSWORD=fcd88378ac0031

```

In the createSendToken function change the exist line to a heroku specific one

```
  // if (process.env.NODE_ENV === "production") cookieOptions.secure = true;

  if (req.secure || req.header("x-forwarded-proto") === "https")
    cookieOptions.secure = true;

```

In app.js add the line below just after app=express()

```


app.enable('trust proxy');


```

Add a function to exit gracefully on any SIGTERM event on heroku by adding the
code below in app/server.js

```
process.on('SIGTERM', () => {
console.log('SIGTERM received. Shutting downn gracefully...');
server.close(()=>console.log('process terminated'))

})


```
