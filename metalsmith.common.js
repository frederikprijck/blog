const metalsmith = require('metalsmith');

let app = metalsmith(__dirname)
  .metadata({
    site: {
      name: 'Frederik Prijck - Everything JavaScript',
      description: "The personal blog of Frederik, a Belgian based full-stack developer."
    }
  })
  .source('./src')
  .destination('./public');

module.exports = app;