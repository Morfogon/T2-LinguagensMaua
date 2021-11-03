const connection = require('../database/connections');

module.exports = {
    async index (request,response){
        const {id} = request.body; 
        const users = await connection('users')
        .where('id',id)
        .select('name')
        .first();

        if(!users){
            response.status(400).json({ erro: ' No ONG found with this ID.'})
        }
        return response.json(users);
    },
};