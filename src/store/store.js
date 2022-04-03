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

  isUnsaved = false

  constructor() {
    makeObservable(this, {
      activeLeagueId: observable,
      isUnsaved: observable,
      teams: observable,
      bets: observable,
      addBet: action,
      onSave: action,
      setIsUnsaved: action,
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

  setIsUnsaved = bool => {
    this.isUnsaved = bool
  }

  setActiveLeagueId = id => {
    this.activeLeagueId = id
  }

  onSave = () => {
    this.bets = this.bets.map(bet => ({
      ...bet,
      isNew: false,
    }))
    this.isUnsaved = false
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
    this.isUnsaved = true
  }

  changeBet = (key, field, data) => {
    const bet = this.bets.find(bet => bet.key === key)
    bet[field] = data
  }

  deleteBets = keys => {
    this.bets = this.bets.filter(bet => !keys.includes(bet.key))
    this.isUnsaved = true
  }

  /* get isDisableSaveButton() {
    return !this.bets.filter(bet => bet.isNew).length
  } */
}

export default new Store()
