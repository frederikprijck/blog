const markdown = require('metalsmith-markdown');

module.exports = markdown({
    langPrefix: 'language-',
    gfm: true,
    smartypants: true
});