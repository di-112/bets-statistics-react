import {
  action, computed, makeObservable, observable, reaction, runInAction,
} from 'mobx'
import { LEAGUES } from '../enums'
import api from '../api'

class Store {
  activeLeagueId = LEAGUES[0]

  teams = []

  bets = []

  constructor() {
    makeObservable(this, {
      activeLeagueId: observable,
      teams: observable,
      bets: observable,
      setActiveLeagueId: action,
      addBet: action,
      onSave: action,
      isDisableSaveButton: computed,
    })

    runInAction(async () => {
      const data = await api.getTeamsOfLeague(this.activeLeagueId)
      this.teams = data.map(({ team }) => team)
    })

    reaction(() => this.activeLeagueId, async () => {
      const data = await api.getTeamsOfLeague(this.activeLeagueId)
      this.teams = data.map(({ team }) => team)
    })
  }

  setActiveLeagueId = id => {
    this.activeLeagueId = id
  }

  onSave = () => {
    this.bets = this.bets.map(bet => ({
      ...bet,
      isNew: false,
    }))
  }

  addBet = () => {
    this.bets = [...this.bets, {
      key: this.bets.length,
      date: '',
      home: '',
      visit: '',
      bet: '',
      sum: 0,
      result: '',
      isNew: true,
    }]
  }

  get isDisableSaveButton() {
    return !this.bets.filter(bet => bet.isNew).length
  }
}

const store = new Store()

export default store
