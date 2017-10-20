module.exports = plugin;

var WORDS_PER_MINUTE = 180;

function calculateTime(contents, wordsPerMinute) {
    var numberOfWords = contents.split(' ').length;
    var numberOfWordsPerMinute = wordsPerMinute || WORDS_PER_MINUTE;
    return Math.floor(numberOfWords / numberOfWordsPerMinute);
}

function plugin(options) {
    return function(files, metalsmith, done) {
        setImmediate(done);
        
        Object.keys(files)
            .filter(key => /(articles\/)(.+)(\.md)/g.test(key))
            .forEach(function(file) {
                var data = files[file];
                var contents = data.contents.toString('utf8');
                var minutes = calculateTime(contents, options.wordsPerMinute);
                var label = minutes > 1 ? 'minutes' : 'minute';

                data.timeToRead = minutes === 0 ? 
                    'less than one minute' : 
                    minutes + ' ' + label;
            });
    };
}
