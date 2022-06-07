module.exports = require('knex')({
  client: 'sqlite3',
  connection: {
    filename: 'bets_db.sqlite3',
  },
})
