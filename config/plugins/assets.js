const assets = require('metalsmith-assets');

module.exports = assets({
    source: './assets',
    destination: './' 
});