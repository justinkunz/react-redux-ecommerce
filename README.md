# React Redux Store

A customizable, templated, React/Redux ecommerce platform. **Stand up an ecommerce site from scratch in under an hour.**

Check out a test demo at https://redux.store _(Cool domain right?)_

![Store example](./screenshots/storeExample.png)

## How to Use

#### Set Up

1. Register for the Stripe API [here](https://dashboard.stripe.com/register). Take note of your public and secret keys for both the test and live environments, you'll need them later.
2. Register for the Easyship API [here](https://app.easyship.com/signup)
3. _OPTIONAL_: Set up your custom domain with Google [here](https://gsuite.google.com/solutions/new-business/) _(this will enable sending emails from `whatever@yourdomain.com`)_.
4. Enable `Less Secure Apps` on the Gmail account you will be using _(this is needed to run Nodemailer with Gmail)_
5. Add the following environment variables:

```
STRIPE_TEST_PK= <YOUR STRIPE TEST PUBLIC KEY>
STRIPE_TEST_SK= <YOUR STRIPE TEST SECRET KEY>

STRIPE_LIVE_PK= <YOUR STRIPE LIVE PUBLIC KEY>
STRIPE_LIVE_SK= <YOUR STRIPE LIVE SECRET KEY>

STRIPE_MODE=test

EASYSHIP_TOKEN= <YOUR EASYSHIP API ACCESS TOKEN>

EMAIL_USER= <YOUR GMAIL EMAIL ACCOUNT>
EMAIL_PW= <YOUR GMAIL EMAIL PASSWORD>

ADMIN_KEY= <KEY TO AUTHENTICATE ADMIN FOR PROTECTED API CALLS>
```

_NOTE: The `ADMIN_KEY` variable can be whatever you'd like, although a long alpha numeric key is recommended._

6. Customize the `config.json` file at the root of the repository to your liking.
7. Grab and beer and make some money 🍻💵
