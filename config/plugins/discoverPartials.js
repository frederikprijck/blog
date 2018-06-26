const discoverPartials = require('metalsmith-discover-partials');

module.exports = discoverPartials({
    directory: './_layouts/partials',
    pattern: /\.hbs/
});