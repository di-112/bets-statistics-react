import axios from 'axios'

class Api {
  constructor() {
    this.API_KEY = 'acec6bb8a2949c8b4d6b774916128133'

    this.BETS_URL = 'http://localhost:5050/bets/'

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

  getLeague = (id = 39) => this.axiosTeams.get(`/leagues?id=${id}`).then(res => res.data.response)

  getTeamsOfLeague = (leagueId = 39) => this.axiosTeams.get(`/teams?league=${leagueId}&season=2021`)
    .then(res => res.data.response.map(({ team }) => team))

  getBets = (leagueId = 39) => this.axiosBets.get(`/?leagueId=${leagueId}`)
    .then(res => {
      console.log('data: ', res.data)
      return res.data
    })

  saveBets = bets => this.axiosBets.post('', { bets })
    .then(res => res.status)

  deleteBet = (keys, leagueId) => this.axiosBets.delete(`/?leagueId=${leagueId}&keys=${keys.join('_')}`)
    .then(res => res.status)
}

const api = new Api()

export default api
