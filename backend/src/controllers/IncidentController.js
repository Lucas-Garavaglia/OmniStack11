//Var contendo a conexão com o banco de dados
const connection = require('../database/connection')

//Exportador de módulos
module.exports = {
    /**
     * No cabeçalho da resposta retorna a contagem de itens no banco de dados,
     * no corpo, retorna todos os casos de ongs, páginado.
     * @param {*} request Requisição recebida 
     * @param {*} response  Resposta para a requisição
     *
     */
    async index(request, response){
        const { page = 1, itenspage = 5 } = request.query

        const [count] = await connection('incidents')
        .count()

        const incidents = await connection('incidents')
        .join('ongs', 'ongs.id', '=', 'incidents.ong_id')
        .limit(itenspage)
        .offset((page-1) * itenspage)
        .select([
            'incidents.*',
            'ongs.name',
            'ongs.email',
            'ongs.whatsapp',
            'ongs.city',
            'ongs.uf'
        ])

        response.header('X-Total-Count', count['count(*)'])
        return response.json(incidents)
    },

    /**
     * Responsável pela criação de um novo caso no banco de dados
     * @param {*} request 
     * @param {*} response 
     */
    async create(request, response){
        const { title, description, value} = request.body
        const ong_id = request.headers.authorization

        const [id] = await connection('incidents').insert({
            title,
            description,
            value,
            ong_id,
        })

        return response.json({ id })
    },

    /**
     * Resposável por deletar um caso do banco de dados
     * @param {*} request 
     * @param {*} response 
     */
    async delete(request, response){
        const { id } = request.params
        const ong_id = request.headers.authorization

        const incident = await connection('incidents')
        .where('id', id)
        .select('ong_id')
        .first()
        if(incident.ong_id !== ong_id){
            return response.status(401).json({ erro: 'Operation not permitted.'})
        }
        await connection('incidents').where('id', id).delete()
        return response.status(204).send()
    }
}