import axios from 'axios'

class Api {
  API_KEY = 'acec6bb8a2949c8b4d6b774916128133'

  constructor() {
    this.axiosBase = axios.create({
      baseURL: 'https://v3.football.api-sports.io',
      headers: {
        'x-rapidapi-host': 'v3.football.api-sports.io',
        'x-rapidapi-key': this.API_KEY,
      },
    })
  }

  getLeague = (id = 39) => this.axiosBase(`/leagues?id=${id}`).then(res => res.data?.response)

  getTeamsOfLeague = (leagueId = 39) => this.axiosBase(`/teams?league=${leagueId}&season=2021`).then(res => res.data?.response)
}

const api = new Api()

export default api
