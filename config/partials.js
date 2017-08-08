const partial = (name) => {
  return `partials/${name}`
};

module.exports =  {
  header: partial('header'),
  footer: partial('footer'),
  comments: partial('comments'),
  articles: partial('articles'),
  splash: partial('splash')
};
