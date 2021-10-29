const connection = require('../database/connections');


module.exports = {

    async index (request,response){
        const users_id = request.headers.authorization; 
        const reviews = await connection('reviews').select('*');
        return response.json(reviews);
    },

};