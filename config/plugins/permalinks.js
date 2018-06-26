const permalinks = require('metalsmith-permalinks');

module.exports = permalinks({
    relative: false,
    pattern: ':title',
});