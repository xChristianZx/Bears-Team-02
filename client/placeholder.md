## How I'm Organizing Webpack

Example repo is here (Warning: Uses Yarn instead of NPM): https://github.com/rmorabia/todo

The relevant files are `package.json` & `webpack.config.js`. 

This is set up for React only, we can add other things as they go along.

First, an explanation of the npm dependencies in `package.json`:

babel-core: The actual package that has Babel inside of it
babel-loader: This configures babel to run with Webpack. **Anything named *-loader at the end is a package to allow it to run with Webpack.**
Babel-preset-*: These are like "plugins" for Babel. You can look at the documentation, but basically `env` is for compiling modern JavaScript (ES8+) and `react` is for React. This helps define what is in the "public" file. (See folder structure for more.)
react & reactDOM: Obviously, these are the packages for React. I'm not sure if there are any others. 
CSS & style-loader: Same as babel-loader, helps CSS & Styling build with Webpack. There's a Sass-loader in npm as well.
webpack & webpack-CLI: Just webpack.
webpack-dev-server: This runs a dev server that checks dependencies, builds React, and hosts it on local host. This is the best dev server to be using for React & Webpack. I don't know how copatible it is with Node & the back-end. It'll update on every save for quick, live editing without having to actually require Webpack to manually "build" your page each time.

These are the bare minimum dependencies for just about any React app. Webpack runs babel and anything else with *-loader at the end to do the work in one line of code rather than running Babel manually each time. `create-react-app` is just this, but don't build it yourself.

In the scripts section, I have `npm build` just as a shorthand for `npm webpack-dev-server` because I always type _web_ server.

Next, an explanation of the `webpack.config.js`: 

I've taken this entirely from the documentation of how to build your `webpack.config.js`. It's built with a JS object syntax rather than a JSON syntax.

I'll talk about this line-by-line:

1) Requiring `path` is a Node.js thing to make sure that the webpack implementation can work on anyone's computer without manually changing the path. This is required.

3) `module.exports` follows the formatting from the documenation. I don't know what it is, I just know it's required.

4) `mode: development` is how I've always kept my apps since I've never actually ...produced them? I don't know the difference between `development` mode and `production` mode, but this bigger project is a prime time to see!

5) `entry` is asking for the relative path into the main file of your code.

6) The `output` object has two parts to it:

a) `path: path.resolve(__dirname, 'public')` is required. It's using the `const path` from above. The only difference is the `public` part. For example, in our case, it'll be `client/public`. This is the folder you want the browser-readable files to be in. 

b) `filename: bundle.js` is the name of the file that you want the main browser-readable file (taken from the `entry` above) to be named. You can now reference this file in your HTML in `script src=`. 

10) `module` is the object where you define the rules for each of your loaders. I'll go over what the possibilites are here with the `babel-loader`. The `css-loader` is much smaller and easier to understand after understanding the `babel-loader`. For each new loader added to the project, we just add another object in the rules array. Order does not matter here, as long as you have the required settings.

12) `test` is asking for a regex code of what to test. I don't really understand regex, this was copied. But in this line, this is saying -- Do this for all .js files.

13: `exclude` is very important since you don't want to actually have it run on every .js file, that might include folders that you don't want to babelify, like `node_modules`. You just use the path thing again here instead of regex.

16) What is the name of the npm module that's relevant here? css-loader, babel-loader, sass-loader? 

17) `Options` is something I've only encountered for Babel. In older tutorials of Babel, it seems everyone recommends having a `.babelrc` file. According to some docs (either Babel's or Webpack's), instead of a whole external file, you can just define them in an object here. This is basically stolen directly from how you would organize your `.babelrc`, so see those docs for more. It's basically just asking how you want Babel to run.

29) There's something on the Webpack docs that asks you for like, a speed & quality setting. This is the one Andrew recommended in the course. There's probably a better one. See the docs.

30) devServer has a few options, but the only one that I found relevant is telling it where the output files to render are. Same as above.

That's about it there.

So, folder structure is now pretty clear:

We have a `public` folder and a `src` folder to start with. We write our code in the `src` folder. Webpack and Babel update the `public` folder for us. Within the `public` folder, it's basically the same organization as any other JavaScript folder. For our project, just to start, I'm going to have a `js` and a `css` folder. 

That's about it. Hopefully that demystified some of Webpack.
