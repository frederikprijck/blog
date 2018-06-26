const serve = require('metalsmith-serve');

module.exports = serve({
    port: 8081,
    verbose: true
});