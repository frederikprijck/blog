const tags = require('metalsmith-tags');

module.exports = tags({
    handle: 'tags',
    path: 'tags/:tag/index.html',
    layout: 'tags.hbs',
    sortBy: 'date',
    reverse: true,
    slug: {mode: 'rfc3986'}
});