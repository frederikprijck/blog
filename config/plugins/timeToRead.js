const timeToRead = require('./../../_plugins/time-to-read');

module.exports = timeToRead({
    wordsPerMinute: 180,
    files: [
        'articles/*.md'
    ]
});