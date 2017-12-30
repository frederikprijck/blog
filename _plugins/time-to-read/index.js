module.exports = plugin;

const defaultOpts = {
  wordsPerMinute: 180
};

function calculateTime(contents, wordsPerMinute) {
  const words = contents.split(' ').length;
  return Math.floor(words / wordsPerMinute);
}

function plugin(opts) {
  const options = Object.assign({}, defaultOpts, opts);

  return (files, metalsmith, done) => {
    setImmediate(done);
    
    Object.keys(files)
      .filter(key => /(articles\/)(.+)(\.md)/g.test(key))
      .map(key => files[key])
      .forEach(data => {
        const contents = data.contents.toString('utf8');
        const minutes = calculateTime(contents, options.wordsPerMinute);
        const label = minutes > 1 ? 'minutes' : 'minute';

        data.timeToRead = minutes === 0 ? 
            'less than one minute' : 
            minutes + ' ' + label;
      });
  };
}
