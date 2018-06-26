const bootstrap = require('./config/bootstrap');
const app = require('./metalsmith.common');

bootstrap(app, true).build((err) => {
    err ? console.log(err) : console.log('Blog built!');
});