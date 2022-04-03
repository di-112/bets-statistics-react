import {
  action, computed, makeObservable, observable, reaction, runInAction,
} from 'mobx'
import { LEAGUES } from '../enums'
import api from '../api'
import localStorageService from '../localStorage/localStorageService'

class Store {
  activeLeagueId = LEAGUES[0]

  teams = []

  bets = []

  constructor() {
    makeObservable(this, {
      activeLeagueId: observable,
      teams: observable,
      bets: observable,
      addBet: action,
      onSave: action,
      isDisableSaveButton: computed,
    })

    runInAction(async () => {
      const data = await api.getTeamsOfLeague(this.activeLeagueId)
      this.teams = data.map(({ team }) => team)
      this.bets = localStorageService.get()
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
    localStorageService.put(this.bets)
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

  changeBet = (key, field, data) => {
    const bet = this.bets.find(bet => bet.key === key)
    console.log('data: ', data)
    bet[field] = data
  }

  get isDisableSaveButton() {
    return !this.bets.filter(bet => bet.isNew).length
  }
}

export default new Store()
