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

  const plus = await betsQuery()
    .where('result', 'Выигрыш')
    .select(knex.raw('(sum(?? * (?? - 1))) as value', ['sum', 'quotient']))
    .first()

  const minus = await betsQuery()
    .where('result', 'Проигрыш')
    .select(knex.raw('sum(??) as value', ['sum']))
    .first()

  const max = await betsQuery()
    .max('quotient as value')
    .first()

  const betsBest = await betsQuery()
    .where('result', 'Выигрыш')
    .select(knex.raw('??, count(??) as ??', ['bet', 'quotient', 'count']))
    .groupBy('bet')
    .orderBy('count', 'desc')

  return {
    bets,
    analytics: {
      profit: plus.value - minus.value,
      maxQuotient: max.value,
      bestBets: betsBest
        .filter(item => item.count === betsBest[0].count)
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
