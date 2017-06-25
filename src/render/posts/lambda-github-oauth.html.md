---
title: Using AWS lambda in github authentication flow

author: admin
mtime: 2017/06/25 13:26:00

slug: lambda-github-authentication-flow
layout: 'post'
---

In a Single Page Application (SPA) I am creating I needed authorization with github to allow the application to talk to the github apis on behalf of the user. Being a SPA I prefer static hosting (for instance on AWS S3) to keep costs down. But that leaves me without a server to exchange the temporary code for an access token.

Enter AWS lambda. (or azure functions, [now](https://zeit.co/now) or other FaaS providers)

In my opinion this a perfect use case for AWS lambda, all we need is a simple web service to make a request on our behalf (with the client secret) and then return that token to the SPA. Since we have a secret we can't do this entirely on the client from javascript. The cost of lambda is also very small, or probably free for most apps your write.

My authentication flow is like the one described here: https://github.com/sahat/satellizer#-login-with-oauth-20 If you use satellizer or [vue-authenticate](https://github.com/dgrubelic/vue-authenticate) this is the flow that will be used. If not you can implement the flow for yourself.

I am not using step 6-9 tough, as all I want is a simple token and return this to the SPA.

Here's how I did it:

First let's create the code:

Create a new folder somewhere and run `npm install request` in it
Now create an index.js file with the following content in it:

```js
var request = require('request');
var clientId = <your client id>;
var clientSecret = <your client secret>;

exports.handler = (event, context, callback) => {

  var body = JSON.parse(event.body);

  request({
    method: 'POST',
    url: 'https://github.com/login/oauth/access_token',
    json: {
      client_id: clientId,
      client_secret: clientSecret,
      code: body.code,
    }
  }, function(err, res, body) {
    if (err) {
      callback(null, {
        statusCode: '500',
        body: JSON.stringify(err),
        headers: {
          'Content-Type': 'application/json',
        },
      });
    } else {
      callback(null, {
        statusCode: '200',
        body: JSON.stringify(body),
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        },
      });
    }
  });
}
```

Then zip the contents of the folder to a zip (not the folder itself, just the content)

Now to configure AWS:

1. Go to the lambda dashboard and create a new function.
2. Select the blank-function blueprint
3. Configure your trigger, use API gateway
4. Configure the function with a name, runtime node.js 6.10 or similar
5. Instead of entering code inline, select upload a zip file
6. Handler should be index.handler (this matches the index file name and its exported handler function)
7. Create a role if you don't have one
8. Complete the rest of the wizard as you see fit (or just use the defaults)
9. When done you will be at the triggers tab and here you can see the unique url to your service
10. Click on the method: ANY, this will take you to the api gateway dashboard. You should see the endpoint you created
11. Select the endpoint and in actions click enable CORS, just click yes to all.
12. Create a new method from the action meny, select POST. Then select the newly created POST action. Select Lambda function, and check "Use lambda proxy integration"
13. Select the region your lambda lives in and enter the name of your lambda function
14. You can now delete the ANY method for your endpoint. We don't need that anymore.
15. Now you can POST to this url with body as follows:

```js
{
	"code": "<code received from github>"
}
```

This is done automatically for you with satellizer or vue-authenticate.

The response from the lambda will be like this:

```js
{
	"access_token": "e72e16c7e42f292c6912e7710c838347ae178b4a",
	"scope": "repo,gist",
	"token_type": "bearer"
}
```

Now you can use the token in your application. Again this is done automatically with the frameworks mentioned.


The code above can be used for token exchange with any OAuth service with only small modifications.
