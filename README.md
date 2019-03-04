# Last.Fm Node Client

[![npm](https://img.shields.io/npm/v/lastfm-node-client.svg)](https://www.npmjs.com/package/lastfm-node-client)
[![Build Status](https://travis-ci.org/rattletone/lastfm-node-client.svg?branch=master)](https://travis-ci.org/rattletone/lastfm-node-client)
[![Coverage Status](https://coveralls.io/repos/github/rattletone/lastfm-node-client/badge.svg?branch=master)](https://coveralls.io/github/rattletone/lastfm-node-client?branch=master)

This is a Node.js JavaScript library for interfacing with the Last.fm API.

* **Consistent**: Providing you a uniform set of abstractions that allows you to use the interface predictably and reliably.
* **Versatile**: Adapting it's communication with the API, complying with it's specifications without you needing to adapt your code.
* **Low level**: Delivering you the response as it comes directly from the API, using it's native `format` parameter, to deliver a consistent JSON response.

See the [Last.Fm API web page](https://www.last.fm/api) for information about the Last.Fm API, including details on how to register an account and get your API key, shared secret, and session key. 

## Installation

```sh
$ npm install lastfm-node-client
```

Node.js **7.0.0** or later is required.

## Usage

First, you must instantiate the LastFm Class with an object parameter containing the details of your API account. `apiKey` is required, however since many endpoints of the API do not require authentication, `secret` and `sessionKey` are optional.

```js
const LastFm = require("lastfm-node-client");
const lastFm = new LastFm({
    "apiKey": "API_KEY",
    "secret": "SECRET",
    "sessionKey": "SESSION_KEY"
});
```

### Making requests

The Last.fm API is structured into packages and methods, accessed as `Package.method`. The LastFm Class contains directly corresponding methods for each package method, written as `lastFm.packageMethod()`. For example, endpoint `User.getRecentTracks` is accessed as `lastFm.userGetRecentTracks()`.

```js
lastFm.userGetRecentTracks();
```

Parameters can be passed to the API through the `params` argument as an object that will be sent directly with the request, either as a query for a GET request, or a body for a POST request. The property names will not be transformed or abstracted, and so they must match the endpoint parameters exactly.

**Note**: Endpoints `Auth.getToken` and `Tag.getTopTags` do not require additional parameters, as such, methods `lastFm.authGetToken()` and `lastFm.tagGetTopTags()` do not accept a `params` argument.

```js
lastFm.userGetRecentTracks({
    "user": "USER"
});
```

### Capturing responses

Every method returns a promise of the pending request by default. To access the response, you can chain `.then()` to the method, or use `await`.

Chaining `.then()`:

```js
lastFm.userGetRecentTracks({
    "user": "USER"
})
.then(data => {
    console.log(data);
};
```

Using `await`:

```js
const data = await lastFm.userGetRecentTracks({
    "user": "USER"
});

console.log(data);
```

An optional callback can be passed as the last argument. It is invoked with conventional `(err, data)` parameters; `err` being any exceptions thrown in the event of an error, `data` containing the JSON response of the API upon success.

**Note**: "Success" in this context means a successful request, however the API may return an error response for a number of reasons detailed in their [error codes documentation](https://www.last.fm/api/errorcodes).

```js
lastFm.userGetRecentTracks({
    "user": "USER"
},
(err, data)) => {
    console.log(data);
});
```

When callback is passed, methods do not return a `promise`, instead return the LastFm instance the method was called on. This allows you to chain requests.
