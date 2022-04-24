import {
  action, computed, makeObservable, observable, reaction, runInAction,
} from 'mobx'
import { LEAGUES, RESULTS } from '../enums'
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
      analytics: computed,
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
    localStorageService.put(this.bets)
  }

  addBet = () => {
    this.bets = [...this.bets, {
      key: this.bets.length,
      date: null,
      home: null,
      visit: null,
      bet: '',
      quotient: null,
      sum: 0,
      result: null,
      isNew: true,
    }]
  }

  changeBet = (key: number, field: string, data: any) : void => {
    this.bets.find(bet => bet.key === key)[field] = data
  }

  deleteBets = (keys: number[]) => {
    this.bets = this.bets.filter(bet => !keys.includes(bet.key))
    localStorageService.put(this.bets)
  }

  get unsavedBets() {
    return this.bets.filter(bet => bet.isNew)
  }

  get analytics() {
    return {
      profit: this.bets
        .filter(bet => !bet.isNew)
        .reduce((acc: number, bet) => {
          if (bet.result === RESULTS.win) {
            return acc + (bet.sum * bet.quotient) - bet.sum
          }
          return acc - bet.sum
        }, 0) || 0,
      bestBet: this.bets
        .filter(bet => bet.result === RESULTS.win)
        .map(bet => bet.bet)
        .reduce((acc, bet) => {
          acc[bet] = (acc[bet] || 0) + 1
          return acc
        }, {}),
    }
  }
}

export default new Store()
