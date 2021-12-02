const connection = require('../database/connections');


module.exports = {

    async index (request,response){
        const {page = 1} = request.query;

        const [count] = await connection('reviews').count();

        const reviews = await connection('reviews') 
        .join('users', 'users.id', '=', 'reviews.users_id')
        .limit(5)
        .offset((page - 1)*5)
        .select([
            'reviews.*', 
            'users.name', 
            'email',
        ]);

        response.header('X-TOTAL-COUNT', count['count(*)']);

        return response.json(reviews);        
    },

    async create(request,response){
        const { name,description,rate } = request.body; 
        
        request.headers;
        
        const users_id = request.headers.authorization; 
        const [id] = await connection('reviews').insert(
            {   
                name,
                description,
                rate
            })
            
        return response.json({id});
    },


    async delete(request,response){
        const {id} = request.params;
        const users_id = request.headers.authorization; 

        const reviews = await connection('reviews')
        .where('id',id)
        .select('users_id')
        .first();
         
        if(incidents.ong_id != users_id ){

            return response.status(401).json( {error:'Operation not permitted.'}); 

        }
        
        await connection('reviews').where('id',id).delete();
        return response.status(204).send();
    },
};