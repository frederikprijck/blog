const bootstrap = require('./config/bootstrap');
const app = require('./metalsmith.common');

bootstrap(app, false).build((err) => {
    if (err) console.log(err);
});