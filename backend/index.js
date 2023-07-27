const express = require('express')
const cors = require('cors')
const userController = require('./controllers/user')
const betsController = require('./controllers/bets')

const PORT = 5050

const app = express()

app.use(cors())
app.use(express.json())

app.listen(PORT, () => {
    console.log(`Server started on ${PORT} port`)
})

app.get('/', (req, res) => {
    res.send('Hello world...')
})

app.post('/bets', betsController.addBets)
app.get('/bets', betsController.getBets)
app.delete('/bets', betsController.deleteBets)

app.post('/registration', userController.register)
app.post('/login', userController.login)
