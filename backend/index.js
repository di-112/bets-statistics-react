const express = require('express')
const cors = require('cors')

const sqlite3 = require('sqlite3').verbose()

const db = new sqlite3.Database('bets_db.sqlite3')

/* db.serialize(() => {
  db.run('CREATE TABLE BETS (key,date, home,  visit, quotient, bet, sum, result, leagueId, isNew)')
}) */

const addBet = async row => {
  const {
    key, date, home, visit, quotient, bet, sum, result, leagueId, isNew,
  } = row

  db.serialize(async () => {
    const sql = 'INSERT INTO BETS(key,date, home,  visit, quotient, bet, sum, result, leagueId, isNew) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)'
    await db.run(sql, [key, date, JSON.stringify(home), JSON.stringify(visit), quotient, bet, sum, result, leagueId, isNew], error => {
      console.log('error: ', error)
    })
  })
}

const app = express()

app.use(cors())
app.use(express.json())

app.use((error, req, res, next) => {
  res.status(error.status)

  res.json({
    status: error.status,
    message: error.message,
    stack: error.stack,
  })
})

app.listen(5050, () => {
  console.log('Server started (http://localhost:5050/) !')
})

app.get('/', (req, res) => {
  res.send('Hello world...')
})

app.post('/bets', (req, res) => {
  console.log('req: ', req.body)
  if (req.body) {
    req.body.bets.forEach(addBet)
    res.send('success')
    return
  }
  res.send(req.body)
})

app.post('/bets/delete', async (req, res) => {
  await db.serialize(async () => {
    // db.run('DELETE FROM BETS')
    const { keys, leagueId } = req.body
    keys.forEach(key => {
      db.run(`DELETE FROM BETS WHERE key=${key} AND leagueId=${leagueId}`, [], (error, rows) => {})
      /* db.all('SELECT * FROM BETS WHERE leagueId = ?', [leagueId], (error, rows) => {
        if (rows?.length) res.send(rows)
      }) */
    })
  })
  res.send('deleted')
})

app.get('/bets', async (req, res) => {
  await db.serialize(async () => {
    // db.run('DELETE FROM BETS')
    const { leagueId } = req.query
    console.log('leagueId: ', leagueId)
    db.all(`SELECT * FROM BETS WHERE leagueId = ${leagueId}`, [], (error, rows) => {
      console.log('rows: ', rows)
      console.log('error: ', error)
      res.send(rows?.map(bet => ({
        ...bet,
        home: JSON.parse(bet.home),
        visit: JSON.parse(bet.visit),
      })) || [])
    })
    /* db.all('SELECT * FROM BETS WHERE leagueId = ?', [leagueId], (error, rows) => {
      if (rows?.length) res.send(rows)
    }) */
  })
})
