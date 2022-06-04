const express = require('express')
const cors = require('cors')
const db = require('./db')
const {
  transformBetsFromDb,
  transformBetsToDb,
} = require('./helpers/transformBet')
const { transformDateToDb } = require('./helpers/transformDate')

const PORT = 5050

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

app.listen(PORT, () => {
  console.log(`Server started on ${PORT} port`)
})

app.get('/', (req, res) => {
  res.send('Hello world...')
})

app.post('/bets', async (req, res) => {
  try {
    await db.addBets(transformBetsToDb(req.body.bets))
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
    await db.deleteBet(keys.split('_'), leagueId)
    res.send({
      success: true,
    })
  } catch (error) {
    res.status(400).send({
      error: error.message,
    })
  }
})

app.get('/bets', async (req, res) => {
  const { leagueId, date } = req.query

  try {
    const { bets, analytics } = await db.getBets(leagueId, date ? transformDateToDb(date) : null)
    res.send({
      bets: transformBetsFromDb(bets),
      analytics: {
        profit: analytics.profit || 0,
        maxQuotient: analytics.maxQuotient,
        bestBet: [],
      },
    })
  } catch (error) {
    res.status(400).send({
      error: error.message,
    })
  }
})
