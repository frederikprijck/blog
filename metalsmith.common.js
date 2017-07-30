var metalsmith = require('metalsmith');
var markdown = require('metalsmith-markdown');
var layouts = require('metalsmith-layouts');
var handlebars = require('handlebars');
var collections = require('metalsmith-collections');
var permalinks = require('metalsmith-permalinks');
var sass = require('metalsmith-sass');
var excerpts = require('metalsmith-excerpts');
var assets = require('metalsmith-assets');
const imagemin = require('metalsmith-imagemin');

module.exports = metalsmith(__dirname)
  .metadata({
    site: {
      name: 'Metalsmith Blog',
      description: "A metalsmith driven blog"
    }
  })
  .source('./src')
  .destination('./public')
  .use(collections({
    articles: {
      pattern: 'articles/**/*.md',
      sortBy: 'date',
      reverse: true
    },
  }))
  .use(sass({
    outputDir: 'css/'
  }))
  .use(assets({
    source: './assets', // relative to the working directory 
    destination: './' // relative to the build directory 
  }))
  .use(imagemin({
    optimizationLevel: 3
  }))
  .use(markdown())
  .use(permalinks({
    relative: false,
    pattern: ':title',
  }))
  .use(excerpts())
  .use(layouts({
    engine: 'handlebars',
    directory: './layouts',
    default: 'article.html',
    pattern: ["*/*/*html","*/*html","*html"],
    partials: {
      header: 'partials/header',
      footer: 'partials/footer',
      comments: 'partials/comments',
      articles: 'partials/articles'
    }
  }));