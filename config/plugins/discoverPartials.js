const discoverPartials = require('metalsmith-discover-partials');

module.exports = discoverPartials({
    directory: './layouts/partials',
    pattern: /\.hbs/
});