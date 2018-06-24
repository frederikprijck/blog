module.exports = plugin;

const defaultOpts = {
  placeholder: /<!--[ ]?read-more[ ]?-->/,
  buttonFn: file => `<p class="read-more"><a href="${file.path}" class="a-button a-button--primary" title="read more">read more</a></p>`
}

function plugin(opts) {
  const options = Object.assign({}, defaultOpts, opts);

  return (files, metalsmith, done) => {
    setImmediate(done);
    
    Object.keys(files)
      // todo: why index.html ?
      .filter(key => /index.html/g.test(key))
      .map(key => files[key])
      .forEach(data => {
        const contents = data.contents.toString('utf8');
        const index = contents.search(options.placeholder);
        if (index > -1) {
          data.excerpt = [
            contents.substring(0, index),
            options.buttonFn(data)
          ].join('');
          data.contents = Buffer.from(contents.replace(options.placeholder, ''), 'utf8');
        } else {
          data.excerpt = contents;
        }
      });
  };
}
