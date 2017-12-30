const serve = require('metalsmith-serve');
const watch = require('metalsmith-watch');

require('./metalsmith.common')
    .use(serve({
        port: 8081,
        verbose: true
    }))
    .use(watch({
        paths: {
            "${source}/**/*": true,
            "layouts/**/*": "**/*",
        }
    })).build(function (err) {
        if (err) {
            console.log(err);
        }
        else {
            console.log('Blog built!');
        }
    });