const fs = require('fs-extra');
const pino = require("pino");
const path = require("path");


const filePath = path.join(__dirname, '../error_logs/'); // Register the upload path
const fileName =  `logger_${new Date().getDate()}_${new Date().getMonth()+1}_${new Date().getFullYear()}.log`;
const logger = pino({
  timestamp: () => `",timestamp":"${new Date(Date.now()).toISOString()}"`,
}, pino.destination(path.join(filePath, fileName)));
fs.ensureDir(filePath); // Make sure that he upload path exits
const stream = fs.createWriteStream(path.join(filePath, fileName));
/**
 * funcion for error logging
 * @param {*} error 
 */
const errorLoggging = (error) => {
    logger.error(error);
    process.exit(1);
};
/**
 * function to success logging
 * @param {*} message 
 */
const successLogging = (message) => {
    logger.info(message);
    process.exit(1);
}
module.exports = {
    errorLoggging,
    successLogging
}
