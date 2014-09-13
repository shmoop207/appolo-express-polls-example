var loggerModule= require('./logger/logger'),
    mongooseModule= require('./mongoose/mongoose'),
    appolo = require('appolo-express');

appolo.use(loggerModule());
appolo.use(mongooseModule());