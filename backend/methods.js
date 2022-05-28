const sqlite3 = require('sqlite3').verbose()

const db = new sqlite3.Database('bets_db.sqlite3')

const getBets = (req, res) => {
  const { leagueId } = req.query

  const sql = `SELECT * FROM BETS WHERE leagueId = ${leagueId}`

  db.all(sql, [], (error, rows) => {
    if (error) {
      res.status(400).send({ error: error.message })
      return
    }
    res.send(rows?.map(bet => ({
      ...bet,
      home: JSON.parse(bet.home),
      visit: JSON.parse(bet.visit),
    })) || [])
  })
}

const addBets = (req, res) => {
  const { bets } = req.body

  if (bets) {
    const sql = `INSERT INTO BETS(${Object.keys(bets[0]).join(',')}) 
        VALUES ${bets.map(row => ({
    ...row,
    visit: JSON.stringify(row.visit),
    home: JSON.stringify(row.home),
  })).map(bet => `(${Object.values(bet).map(() => '?').join(',')})`).join(',')}`

    const VALUES = bets
      .map(row => ({
        ...row,
        visit: JSON.stringify(row.visit),
        home: JSON.stringify(row.home),
      }))
      .map(Object.values)
      .reduce((acc, row) => [...acc, ...row], [])

    db.run(sql, VALUES, error => {
      if (error) {
        res.status(400).send({ error: error.message })
        return
      }
      res.status(200).send({})
    })
  }
}

const deleteBet = async (req, res) => {
  const { keys, leagueId } = req.query
  await Promise.all(keys.split('_').map(key => new Promise(resolve => {
    db.run(`DELETE FROM BETS WHERE key=${key} AND leagueId=${leagueId}`, [], resolve)
  })))
  res.send('deleted')
}

module.exports = {
  getBets,
  addBets,
  deleteBet,
}
