'use strict';
/**
 * Module dependencies.
 */
var winston = require('winston');
winston.emitErrs = true;

var logger = new winston.Logger({
    transports: [
         new (winston.transports.File)({
			      name: 'info-file',
            level: 'info',
			      filename:process.env.LOG_DIR+'/all-logs.log',
            handleExceptions: true,
            json: true,
            maxsize: 5242880, //5MB
            maxFiles: 10,
            colorize: false,
			      tailable: true
        }) ,
    		new (winston.transports.File)({
        		name: 'error-file',
        		level: 'error',
        		//filename: '../../../logs/error-logs.log',
        		filename:process.env.LOG_DIR+'/error-logs.log',
        		handleExceptions: true,
        		json: true,
        		maxsize: 5242880, //5MB
        		maxFiles: 10,
        		colorize: false,
        		tailable: true
    		}),
        new winston.transports.Console({
            level: 'debug',
            handleExceptions: true,
            json: false,
            colorize: true
        })
    ],
    exitOnError: false
});

module.exports = logger;
module.exports.stream = {
    write: function(message, encoding){
        logger.info(message);
    }
};
