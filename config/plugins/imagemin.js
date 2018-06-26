const imagemin = require('metalsmith-imagemin');

module.exports = imagemin({
    optimizationLevel: 7
});