const { SUCCESS, INTERNAL_SERVER_ERROR } = require('../../constants/constant')
const client = require('../../db_connection/mongo_connection');
const Response = require('../../config/response_message');
const logger = require('../../logger/logger')

const db = client.db('questions');
const question = db.collection('questions');
/**
 * function to get questions list
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */
const getHome = async (req, res, next) => {
    try {
    return res.status(SUCCESS).send({'message': 'get home working fine'})
    } catch(err) {
        return res.status(INTERNAL_SERVER_ERROR).send({error: err?.message ? err.message: err});
    }
}
/**
 * function to add questions
 * @param {*} req 
 * @param {*} res 
 */
const addQuestion = async (req, res) => {

    try {
        const { questions } = JSON.parse(JSON.stringify(req.body));
        client.connect();
        const result = await question.insertMany(questions, { ordered: true })

        if (result?.insertedIds) {
            new Response(res).SUCCESS_RESPONSE({ "message": "Questions has been added successfully." });
        } else {
            new Response(res).BAD_REQUEST_RESPONSE({ "message": "Questions has not been added." });
        }
    } catch (err) {
        logger.errorLoggging(err);
        new Response(res).INTERNAL_ERROR_RESPONSE(err);
    } finally {
        client.close();
    }
}


module.exports = {
getHome,
addQuestion
}