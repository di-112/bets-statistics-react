import {
  action, makeObservable, observable, reaction, runInAction,
} from 'mobx'
import { LEAGUES } from '../enums'
import api from '../api'

class Store {
  activeLeagueId = LEAGUES[0]

  teams = []

  constructor() {
    makeObservable(this, {
      activeLeagueId: observable,
      teams: observable,
      setActiveLeagueId: action,
    })

    runInAction(async () => {
      const teams = await api.getTeamsOfLeague(this.activeLeagueId)
      this.teams = teams
      console.log('teams: ', teams)
    })

    reaction(() => this.activeLeagueId, async () => {
      const teams = await api.getTeamsOfLeague(this.activeLeagueId)
      this.teams = teams
      console.log('teams: ', teams)
    })
  }

  setActiveLeagueId = id => {
    this.activeLeagueId = id
  }
}

const store = new Store()

export default store
