# Deployment On Heroku



In the package.json, it's need that you mention this line below based on the node version you are using

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
