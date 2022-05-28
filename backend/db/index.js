const knex = require('./knex')

const TABLE = 'BETS'

const getBets = leagueId => {
  if (leagueId) {
    return knex(TABLE).where('leagueId', +leagueId)
  }

  return knex(TABLE).select('*')
}

const addBets = bets => knex(TABLE).insert(bets)

const deleteBet = (key, leagueId) => knex(TABLE)
  .where('key', +key)
  .where('leagueId: ', +leagueId)
  .del()

module.exports = {
  getBets,
  addBets,
  deleteBet,
}
