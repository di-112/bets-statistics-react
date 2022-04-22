import {
  action, makeObservable, observable, reaction, runInAction,
} from 'mobx'
import { LEAGUES } from '../enums'
import api from '../api'
import localStorageService from '../localStorage/localStorageService'
import { IBet, ITeam } from '../types'

class Store {
  activeLeagueId: number = LEAGUES[0]

  teams : ITeam[] = []

  bets: IBet[] = []

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
      this.teams = await api.getTeamsOfLeague(this.activeLeagueId)
      this.bets = localStorageService.get()
    })

    reaction(() => this.activeLeagueId, async () => {
      this.teams = await api.getTeamsOfLeague(this.activeLeagueId)
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
      date: null,
      home: null,
      visit: null,
      bet: '',
      sum: 0,
      result: '',
      isNew: true,
    }]
    this.isUnsaved = true
  }

  changeBet = (key: number, field: string, data: any) : void => {
    this.bets.find(bet => bet.key === key)[field] = data
  }

  deleteBets = (keys: number[]) => {
    this.bets = this.bets.filter(bet => !keys.includes(bet.key))
    this.isUnsaved = true
  }

  /* get isDisableSaveButton() {
    return !this.bets.filter(bet => bet.isNew).length
  } */
}

export default new Store()
