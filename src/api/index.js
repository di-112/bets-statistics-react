import axios from 'axios'
import { Modal } from 'antd'
import { LEAGUES } from '../enums'

const errorHandler = error => {
  Modal.error({
    title: 'Ошибка',
    content: error.body.message || 'Что-то пошло не так',
  })
}

class Api {
  constructor() {
    this.API_KEY = 'acec6bb8a2949c8b4d6b774916128133'

    this.BETS_URL = 'http://localhost:5050/bets'

    this.axiosTeams = axios.create({
      baseURL: 'https://v3.football.api-sports.io',
      headers: {
        'x-rapidapi-host': 'v3.football.api-sports.io',
        'x-rapidapi-key': this.API_KEY,
      },
    })

    this.axiosBets = axios.create({
      baseURL: this.BETS_URL,
    })
  }

  getLeagues = () => this.axiosTeams
    .get('/leagues')
    .then(res => res.data.response
      .filter(item => LEAGUES.includes(item.league?.id))
      .map(({ league }) => league))
    .catch(errorHandler)

  getTeamsOfLeague = (leagueId = 39) => this.axiosTeams
    .get(`/teams?league=${leagueId}&season=2021`)
    .then(res => res.data.response.map(({ team }) => team))
    .catch(errorHandler)

  getBets = (leagueId = 39, date) => this.axiosBets.get('', {
    params: {
      leagueId,
      date,
    },
  })
    .then(res => res.data)
    .catch(errorHandler)

  saveBets = bets => this.axiosBets.post('', { bets })
    .then(res => res.status).catch(errorHandler)

  deleteBet = (keys, leagueId) => this.axiosBets.delete('', {
    params: {
      leagueId,
      keys: [...new Set(keys)].join('_'),
    },
  })
    .then(res => res.status)
    .catch(errorHandler)
}

const api = new Api()

export default api
