const games = require('../../../products.json')
const Game = require('../models/game')

const gamesInserMany = async (req, res, next) => {
  try {
    await Game.deleteMany({})
    await Game.insertMany(games)
    return res
      .status(201)
      .json('✅ Todos los juegos han sido actualizados en la BBDD')
  } catch (error) {
    return res.status(400).json(error)
  }
}

const getAllgames = async (req, res, next) => {
  try {
    const allGames = await Game.find()
    return res.status(200).json(allGames)
  } catch (error) {
    return res.status(400).json({ error: error.message })
  }
}

module.exports = {
  gamesInserMany,
  getAllgames
}
