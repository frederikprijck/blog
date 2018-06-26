const assets = require('metalsmith-assets');

module.exports = assets({
    source: './_assets',
    destination: './' 
});