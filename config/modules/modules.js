var loggerModule= require('./logger/logger'),
    mongooseModule= require('./mongoose/mongoose'),
    appolo = require('appolo-express');

appolo.module.register(loggerModule());
appolo.module.register(mongooseModule());