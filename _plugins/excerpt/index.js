module.exports = plugin;

function plugin() {
  return (files, metalsmith, done) => {
    setImmediate(done);
    
    Object.keys(files)
        // todo: why index.html ?
        .filter(key => /index.html/g.test(key))
        .map(key => files[key])
        .forEach(data => {
            const contents = data.contents.toString('utf8');
            const index = contents.search(/<!--[ ]?read-more[ ]?-->/);
            if (index > -1) {
              data.excerpt = [
                contents.substring(0, index),
                `<p class="read-more"><a href="${data.path}" class="more-link" title="read more">read more</a></p>`
              ].join('');
              data.contents = Buffer.from(contents.replace(/<!--[ ]?read-more[ ]?-->/, ''), 'utf8');
            } else {
              data.excerpt = contents;
            }
        });
  };
}
