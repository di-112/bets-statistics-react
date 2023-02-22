module.exports = require('knex')({
  client: 'sqlite3',
  connection: {
    filename: require('path').resolve(__dirname, 'bets_db.sqlite3'),
  },
})
