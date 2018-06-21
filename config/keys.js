if (process.env.NODE_ENV === "production") {
  module.exports = require("./production");
} else {
  module.exports = require("./development");
}

/* 
This file handles our private keys for our environment variables.

When in development, it references our keys from the development.js file, which are locally stored
and not committed to git, hence why you cannot see the 'development.js' file.  We will all have to manually
create this file on our machines.

In production, they reference the private keys that are stored on our 
actual webserver (such as Heroku), which is why they are all prefixed with 'process.env....' 
in the production file.

Note: production.js is not useful at the moment since our project is not currently hosted on a server
*/
