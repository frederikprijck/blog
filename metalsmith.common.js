const metalsmith = require('metalsmith');
const markdown = require('metalsmith-markdown');
const layouts = require('metalsmith-layouts');
const handlebars = require('handlebars');
const collections = require('metalsmith-collections');
const permalinks = require('metalsmith-permalinks');
const sass = require('metalsmith-sass');
const excerpts = require('metalsmith-excerpts');
const assets = require('metalsmith-assets');
const imagemin = require('metalsmith-imagemin');

module.exports = metalsmith(__dirname)
  .metadata({
    site: {
      name: 'Frederik Prijck - Everything JavaScript',
      description: "The personal blog of Frederik, a Belgian based JavaScript developer."
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
    optimizationLevel: 7
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
      articles: 'partials/articles',
      splash: 'partials/splash'
    }
  }));