const { gamesInserMany, getAllgames } = require('../controller/game')
const gamesRouter = require('express').Router()

gamesRouter.post('/Collect_games', gamesInserMany)
gamesRouter.get('/', getAllgames)

module.exports = gamesRouter
