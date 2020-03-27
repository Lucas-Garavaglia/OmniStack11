const connection = require('../database/connection')
const generateUniqueId = require('../utils/generateUniqueld')

module.exports = {
  /**
  * Retorna todas as ongs cadastradas
  * @param {*} request
  * @param {*} response
  */
  async index(request, response){
    const ongs = await connection('ongs').select('*')

    return response.json(ongs)
  },

  /**
   * Responsável por criar uma nova ONG no banco de dados
   * @param {*} request
   * @param {*} response
   */
  async create(request, response){
    const { name, email, whatsapp, city, uf } = request.body
    console.log(request.body)

    const id = generateUniqueId()

    await connection('ongs').insert({
      id,
      name,
      email,
      whatsapp,
      city,
      uf
    })

    return response.json({ id })
    }
}