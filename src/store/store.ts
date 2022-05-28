import {
  action, computed, makeObservable, observable, reaction, runInAction,
} from 'mobx'
import { LEAGUES, RESULTS } from '../enums'
import api from '../api'
import { IBet, ITeam } from '../types'

class Store {
  activeLeagueId: number = Object.values(LEAGUES)[0]

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
      setBets: action,
      analytics: computed,
    })

    runInAction(async () => {
      this.teams = await api.getTeamsOfLeague(this.activeLeagueId)
      this.bets = await api.getBets(this.activeLeagueId)
    })

    reaction(() => this.activeLeagueId, async () => {
      this.teams = await api.getTeamsOfLeague(this.activeLeagueId)
      const res = await api.getBets(this.activeLeagueId)
      this.bets = res || []
    })
  }

  setIsUnsaved = bool => {
    this.isUnsaved = bool
  }

  setActiveLeagueId = id => {
    this.activeLeagueId = id
  }

  setBets = bets => {
    this.bets = bets
  }

  onSave = async () => {
    await api.saveBets(this.unsavedBets.map(bet => ({ ...bet, isNew: false })))
    this.bets = await api.getBets(this.activeLeagueId)
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
      leagueId: this.activeLeagueId,
      isNew: true,
    }]
  }

  changeBet = (key: number, field: string, data: any) : void => {
    this.bets.find(bet => bet.key === key)[field] = data
  }

  deleteBets = async (keys: number[]) => {
    // this.bets = this.bets.filter(bet => !keys.includes(bet.key))
    // localStorageService.put(this.bets)
    await api.deleteBet(keys, this.activeLeagueId)
    this.bets = await api.getBets(this.activeLeagueId)
  }

  get unsavedBets() {
    return this.bets.filter(bet => bet.isNew)
  }

  get analytics() {
    const winBets = this.bets.filter(bet => bet.result === RESULTS.win && !bet.isNew)

    const betsCounts = winBets
      .map(bet => bet.bet)
      .reduce((acc, bet) => {
        acc[bet] = (acc[bet] || 0) + 1
        return acc
      }, {})

    const maxCount = Math.max(...Object.values(betsCounts) as number [])

    return {
      profit: this.bets
        .filter(bet => !bet.isNew)
        .reduce((acc: number, bet) => {
          if (bet.result === RESULTS.win) {
            return acc + (bet.sum * bet.quotient) - bet.sum
          }
          return acc - bet.sum
        }, 0) || 0,
      bestBet: Object.keys(betsCounts).filter(key => betsCounts[key] === maxCount),
    }
  }
}

export default new Store()
