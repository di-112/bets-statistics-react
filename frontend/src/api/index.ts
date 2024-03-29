import { Modal } from 'antd'
import axios, { AxiosInstance } from 'axios'
import { LEAGUES } from '@enums'
import { IUser } from '@types';

const errorHandler = error => {
  Modal.error({
    title: 'Ошибка',
    centered: true,
    content: error.body?.message || error.response?.data?.error || 'Что-то пошло не так',
  })
}

const getRequestHeaders = () => ({
  authorization: JSON.parse(localStorage.getItem('STORE'))?.user.token,
})

class Api {
  API_KEY: string

  BETS_URL: string

  axiosTeams: AxiosInstance

  axiosBets: AxiosInstance

  constructor() {
    this.API_KEY = 'acec6bb8a2949c8b4d6b774916128133'

    this.BETS_URL = 'http://localhost:5050'

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

  createUser = user => this.axiosBets.post<IUser>('/registration', user)
    .then(res => res.data).catch(errorHandler)

  login = user => this.axiosBets.post<IUser>('/login', user)
    .then(res => res.data).catch(errorHandler)

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

  getTeamsOfLeague = (leagueId = LEAGUES[1]) => {
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

  getBets = (leagueId = LEAGUES[1], date) => this.axiosBets.get('/bets', {
    params: {
      leagueId,
      date,
    },
    headers: getRequestHeaders(),
  })
    .then(res => res.data)
    .catch(errorHandler)

  saveBets = bets => this.axiosBets.post('/bets', { bets }, {
    headers: getRequestHeaders(),
  })
    .then(res => res.status).catch(errorHandler)

  deleteBet = (keys, leagueId) => this.axiosBets.delete('/bets', {
    params: {
      leagueId,
      keys: [...new Set(keys)].join('_'),
    },
    headers: getRequestHeaders(),
  })
    .then(res => res.status)
    .catch(errorHandler)
}

const api = new Api()

export default api
