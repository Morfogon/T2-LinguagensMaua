const connection = require('../database/connections');

module.exports = {
    async create(request,response){
        const { name,email} = request.body;
        
        return response.json({ name,email});
    }
};