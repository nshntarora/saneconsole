<img src="https://github.com/nshntarora/saneconsole/blob/master/logo.png?raw=true" />

<blockquote>
I don't remember adding a logging library the last time I worked on one of my quick side projects or experiments.

I don't remember publishing an npm package either.

***builds a simple logging library as his first npm package***
</blockquote>

This is how saneconsole came to be.


Using it is simple.

First, you'll have to install the package.

```

npm install saneconsole

```

Then, here's how to use it in one of your files

```

var saneconsole = require('saneconsole');
var meta = { }
// Set meta to any Object or String you'd like to be logged everytime.
// It could be the user's id or the entire user object
var console = saneconsole(meta);

```

**NOTE: Logging to the file does not work on the client as the `fs` module isn't avaible there.**

In order to use it on the web client, you will have to pass another boolean param when initializing the package.

```
var console = saneconsole(meta);
```

will become

```
var console = saneconsole(meta, true);
```

And add the below object to your webpack config

```
node: {
  fs: "empty"
}
```

You can also declare it in the global scope, using `global` on Node and `window.console` on the client.

It also adds a time stamp, and a prefix to the log.

```

console.log("Hi! I'm Nishant")

```

would be printed as

```

DEBUG: [ 2017-07-28T19:20:39.733Z ] :  Hi! I'm Nishant

```

As of now saneconsole only supports `console.log`, `console.warn`, and `console.error`

**No logs are printed on production.** You can finally say goodbye to that `no-console` rule in your eslint config.

All logs are found in the `saneconsole.log` file in the root of your project. They are just a series of JSON objects. You could easily convert them into an array of JSON objects and make them searchable.

Here is the object that gets added to the file:

```

{"timestamp":"2017-07-28T19:50:53.223Z","info":["Hi! I'm Nishant"],"meta":"123"}

```

A dashboard to view and search these logs coming up after the next boring class I attend.
