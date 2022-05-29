const { transformDateToDb, transformDateFromDb } = require('./transformDate')

const transformBetsToDb = bets => bets.map(bet => ({
  ...bet,
  date: transformDateToDb(bet.date),
  home: JSON.stringify(bet.home),
  visit: JSON.stringify(bet.visit),
}))

const transformBetsFromDb = bets => bets.map(bet => ({
  ...bet,
  date: transformDateFromDb(bet.date),
  home: JSON.parse(bet.home),
  visit: JSON.parse(bet.visit),
}))

module.exports = {
  transformBetsToDb,
  transformBetsFromDb,
}
