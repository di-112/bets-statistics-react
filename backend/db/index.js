const moment = require('moment')
const knex = require('./knex')

const TABLE = 'BETS'

const getBets = (leagueId, date) => {
  if (leagueId && date) {
    return knex(TABLE)

      .where('leagueId', +leagueId)
      .whereBetween('date', [
        moment(date).startOf('month').format('YYYY-MM-DD'),
        moment(date).endOf('month').format('YYYY-MM-DD'),
      ])
  }

  if (leagueId) {
    return knex(TABLE).where('leagueId', +leagueId)
  }

  return knex(TABLE).select('*')
}

const addBets = bets => knex(TABLE).insert(bets)

const deleteBet = (keys, leagueId) => knex(TABLE)
  .whereIn('key', keys.map(key => +key))
  .where('leagueId', +leagueId)
  .del()

module.exports = {
  getBets,
  addBets,
  deleteBet,
}
