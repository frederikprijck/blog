const collections = require('metalsmith-collections');

module.exports = collections({
    articles: {
        pattern: 'articles/**/*.md',
        sortBy: 'date',
        reverse: true
    },
});