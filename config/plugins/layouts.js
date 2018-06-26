const layouts = require('metalsmith-layouts');

module.exports = layouts({
    directory: './layouts',
    default: 'article.hbs',
    pattern: ["*/*/*html","*/*html","*html"]
});