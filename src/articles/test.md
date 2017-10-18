---
title: "Avoid global NPM packages"
date: 2017-08-14
blurb: This is a test blog post
author: Frederik Prijck
tags:
  - test
---

Despite the fact you're a frontend or backend developer, when working with JavaScript you're most likely making use of `npm`. If you have no idea what `npm` is, ensure to read (this article)[https://docs.npmjs.com/getting-started/what-is-npm].

A common approach these days is using npm modules such as `webpack`, `gulp`, `grunt`, `typescript`, `tslint`, `babel`, ...

When using these tools, you may have found yourself in a situation where you're running `npm install -g webpack` (or any other npm module). If you did, this article is definatly a must read for you.

Installing any `npm` module globally makes it available as a cli command and allows you to use the same version of that package for all of your projects. Sounds cool, doesn't it ? Well, it isn't cool at all. 
Even tho I know alot of development teams who enforce a uniform dependency version among all projects this way, this is utterly incorrect and may (and probably will) result in odd behavior.

Imagine you're working on multiple (opensource) projects, where project A makes use of `webpack 2.0.0` and project B uses `webpack 3.0.0`, which is incompatible with `2.0.0`. When you have no control over both dependencies, how would you handle situations like this when all you have is a single, globally installed version of `webpack` but you want to work on both projects simultaniously?

Well, you can't.

### The solution

As the title of this post mentions, the solution to the above problem is to avoid globally installed NPM packages (which are part of your project) at all cost.

#### What do I mean with: which are part of your project ?
Some npm packages are perfectly fine to have installed globally, examples are tools such as`yeoman` which are not part of your project dependencies.

Instead of installing `webpack` using `npm install -g webpack`, you run `npm install webpack --save-dev`. Running this command will add `webpack` to ur node_modules folder and make the CLI available from `node_modules/.bin` folder. Opening a CLi in the root of your project should allow you to run `node_modules/.bin/webpack` the same way you'd be running `webpack` from the CLI.

#### Adding local dependencies to `npm scripts`

Ofcourse it's no fun to constantly type `node_modules/.bin/webpack` instead of `webpack`. Npm scripts allow you to create aliases to npm commands, giving preference to local dependencies over global dependencies.

```
"scripts": {
  "webpack": "webpack"
}
```

Using the above configuration, we can run `npm run webpack`. Npm will first see if there's a locally installed `webpack` version inside `node_modules/.bin`. If there is, it's going to execute that one, if not it's going to look for a globally installed version.

The cool stuff is, using npm scripts we can hide the actual build tools for the rest of our team by using general commands such as `build`, `start`, `test`.

```
"scripts": {
  "build": "webpack",
  "start": "webpack-dev-server",
  "test": "karma start"
}
```

<code class="language-css">p { color: red }</code>

<pre>
  <code class="language-javascript">
  const someFunction = () => {
    console.log('ok');
  };
  </code>
</pre>
