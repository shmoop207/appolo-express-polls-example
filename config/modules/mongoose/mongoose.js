var mongoose = require('mongoose'),
appolo = require('appolo-express');

module.exports = function(options){
    return function(env,inject,logger,next){
        mongoose.connect(appolo.environment.mongoUrl);

        mongoose.connection.on('error', function (e) {
            logger.error('connection error',{error:e});
        });
        mongoose.connection.once('open', function () {
            logger.info('mongodb connection open');
            next();
        });

        inject.addObject('mongoose', mongoose);
    }
}