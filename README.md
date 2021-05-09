# vpexpo-node-server

Zoho configuration : Client ID/Secret needs to be created in zoho console
Zoho refresh token needs to be generated using postman (do not generate a new one if not needed, after 20 generations, oldest refresh token will be revoked)
# To generate a refresh token : Go to this URL in your browser, log in and get the authorization code from the URL : https://accounts.zoho.com/oauth/v2/auth?response_type=code&client_id=xxxx&scope=ZohoCreator.report.READ&redirect_uri=https://vpexpodubai.com/redirect-uri&access_type=offline&prompt=consent
# Then POST to this URL : https://accounts.zoho.com/oauth/v2/token?grant_type=authorization_code&client_id=xxxx&client_secret=xxxxx&redirect_uri=https://vpexpodubai.com/redirect-uri&code=xxxxx

Use this in your env file :

```
# Zoho configuration
ZOHO_CLIENT_ID=xxxx
ZOHO_CLIENT_SECRET=xxxxx
ZOHO_REFRESH_TOKEN=xxxxx
ZOHO_CREATOR_URL=https://creator.zoho.com/api/v2/fourplusindia

# Mailgun configuration
MAILGUN_API_KEY=xxxxx
MAILGUN_DOMAIN=mg.youandeyemag.com

#In dev environment, if you don't want to send real emails, activate this variable and use your own email address
#MAILGUN_TESTMODE=xxx@xxxx.com
```

Other configuration is done in src/config.js