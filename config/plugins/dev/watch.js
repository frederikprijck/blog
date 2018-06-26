const watch = require('metalsmith-watch');

module.exports = watch({
    paths: {
        "src/**/*": "**/*",
        "layouts/**/*": "**/*",
    }
});