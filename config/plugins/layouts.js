const layouts = require('metalsmith-layouts');

module.exports = layouts({
    directory: './_layouts',
    default: 'article.hbs',
    pattern: ["*/*/*html","*/*html","*html"]
});