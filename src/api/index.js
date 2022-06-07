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

  getLeagues = () => {
    const savesLeagues = sessionStorage.getItem('leagues')

    if (savesLeagues) {
      return Promise.resolve(JSON.parse(savesLeagues))
    }

    return this.axiosTeams
      .get('/leagues')
      .then(res => {
        const leagues = res.data.response
          .filter(item => LEAGUES.includes(item.league?.id))
          .map(({ league }) => league)

        sessionStorage.setItem('leagues', JSON.stringify(leagues))

        return leagues
      })
      .catch(errorHandler)
  }

  getTeamsOfLeague = (leagueId = 39) => {
    const savesTeams = sessionStorage.getItem(`league_${leagueId}_teams`)

    if (savesTeams) {
      return Promise.resolve(JSON.parse(savesTeams))
    }

    return this.axiosTeams
      .get(`/teams?league=${leagueId}&season=2021`)
      .then(res => {
        const teams = res.data.response.map(({ team }) => team)

        sessionStorage.setItem(`league_${leagueId}_teams`, JSON.stringify(teams))

        return teams
      })
      .catch(errorHandler)
  }

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
