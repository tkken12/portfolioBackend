const winston =  { createLogger, format, transports } = require("winston")
const winstonDaily = require("winston-daily-rotate-file")
const { combine, timestamp, printf } = format 

const customFormat = printf(info => {
    return `${info.timestamp} ${info.level}: ${info.message}`;
})

const logger = winston.createLogger({ 
    format: combine(
        timestamp( { 
            format: "YYYY-MM-DD HH:mm:ss",
        }),
        customFormat,
    ),

    transports: [
        new winston.transports.Console(),

        new winstonDaily({
            level: 'info',
            datePattern: 'YYYYMMDD',
            dirname: './Log',
            filename: `pfBackend_%DATE%.log`,
            maxSize: null,
            maxFiles: 14,
            colorize: true
        }),
    ],
})

const stream = {
    write: message => {
      logger.info(message)
    }
}

module.exports = { 
    logger,
    stream
}