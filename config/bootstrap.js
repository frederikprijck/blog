const collections = require('./plugins/collections');
const sass = require('./plugins/sass');
const assets = require('./plugins/assets');
const imagemin = require('./plugins/imagemin');
const timeToRead = require('./plugins/timeToRead');
const markdown = require('./plugins/markdown');
const prism = require('./plugins/prism');
const permalinks = require('./plugins/permalinks');
const readMore = require('./plugins/readMore');
const dateFormatter = require('./plugins/dateFormatter');
const discoverPartials = require('./plugins/discoverPartials');
const layouts = require('./plugins/layouts');
const serve = require('./plugins/dev/serve');
const watch = require('./plugins/dev/watch');

const plugins = [
    collections,
    sass,
    assets,
    imagemin,
    timeToRead,
    markdown,
    prism,
    permalinks,
    readMore,
    dateFormatter,
    discoverPartials,
    layouts
];

const devPlugins = [
    serve,
    watch
];

module.exports = (app, isDev) => {
    [
        ...plugins,
        ...(isDev ? devPlugins : [])
    ].forEach(plugin => app.use(plugin));
    return app;
};