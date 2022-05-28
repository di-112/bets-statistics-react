const express = require('express')
const cors = require('cors')
const db = require('./db')

const { getBets, addBets, deleteBet } = require('./methods')

/* db.serialize(() => {
  db.run('CREATE TABLE BETS (key,date, home,  visit, quotient, bet, sum, result, leagueId, isNew)')
}) */

const app = express()

app.use(cors())
app.use(express.json())

app.use((error, req, res, next) => {
  res.status(error.status)

  res.send({
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

app.post('/bets', async (req, res) => {
  try {
    const bets = await db.addBets(req.body.bets)
    console.log('bets: ', bets)
    res.status(200).send({
      success: true,
    })
  } catch (error) {
    res.status(400).send({
      error: error.message,
    })
  }
})

app.delete('/bets', async (req, res) => {
  try {
    const { keys, leagueId } = req.query
    await db.deleteBet(keys, leagueId)
    res.send({
      success: true,
    })
  } catch (error) {
    res.status(400).send({
      error: error.message,
    })
  }
})

/* app.get('/bets', async (req, res) => {
  const { leagueId } = req.query

  try {
    const bets = await db.getBets(leagueId)
    res.send(bets)
  } catch (error) {
    res.status(400).send({
      error: error.message,
    })
  }
}) */

app.get('/bets', async (req, res) => {
  const { leagueId } = req.query

  try {
    const bets = await db.getBets(leagueId)
    res.send(bets)
  } catch (error) {
    res.status(400).send({
      error: error.message,
    })
  }
})
