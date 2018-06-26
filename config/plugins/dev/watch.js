const watch = require('metalsmith-watch');

module.exports = watch({
    paths: {
        "${source}/**/*": true,
        "layouts/**/*": "**/*",
    }
});