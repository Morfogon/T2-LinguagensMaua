const connection = require('../database/connections');


module.exports = {

    async index (request,response){
        const {page = 1} = request.query;

        const [count] = await connection('reviews').count(); // contar qtos registros tem na tabela

        const reviews = await connection('reviews') // trazer os dados dos incidents e a qual onge pertence
        .join('users', 'users.id', '=', 'reviews.users_id')
        .limit(5)
        .offset((page - 1)*5)
        .select([
            'reviews.*', 
            'users.name', 
            'email',
        ]);

        response.header('X-TOTAL-COUNT', count['count(*)']); // devolver ao header q quantidade

        return response.json(reviews);        
    },

    async create(request,response){
        const { name,description,rate} = request.body; //criar incidente com base na ong
        
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
        .where('id',id) // buscar com base no id
        .select('users_id')// trazer o id da ong que criou o incident
        .first(); // primeira  ocorrencia
         
        if(incidents.ong_id != users_id ){

            return response.status(401).json( {error:'Operation  not permitted.'}); 
            // verificar se o ai que esta cadastrado no banco é o mesmo (logado) que esta querendo apagar
        }
        
        await connection('reviews').where('id',id).delete(); // apagar do banco de dados
        return response.status(204).send(); // retornar 204 sucesso sem corpo
    },
};