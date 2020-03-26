//Conexão com o banco de dados
const connection = require('../database/connection')

//Exportador de módulos
module.exports = {
    /**
     * Retorna todos os casos de determinada ong
     * @param {*} request 
     * @param {*} response 
     */
    async index(request, response){
        const ong_id = request.headers.authorization

        const incidents = await connection('incidents')
        .where('ong_id', ong_id)
        .select('*')

        return response.json(incidents)
    }
}