const moment = require('moment')
const knex = require('./knex')

const TABLE = 'BETS'

const getBets = async (leagueId, date) => {
  const betsQuery = () => {
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

  const bets = await betsQuery()

  const winBets = bets.filter(bet => bet.result === 'Выигрыш')

  const profit = winBets.reduce((acc, bet) => acc + (bet.sum * (bet.quotient - 1)), 0)

  const maxQuotient = Math.max(...bets.map(bet => bet.quotient))

  const maxCountWins = Math.max(...winBets.reduce((acc, { bet }) => ({
    ...acc,
    [bet]: (acc[bet] || 0) + 1,
  }), {}))

  return {
    bets,
    analytics: {
      profit,
      maxQuotient,
      bestBets: winBets
        .filter(item => item.count === maxCountWins)
        .map(item => item.bet),
    },
  }
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
