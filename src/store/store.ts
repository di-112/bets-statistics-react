import {
  action, makeObservable, observable, reaction, runInAction,
} from 'mobx'
import moment, { Moment } from 'moment';
import { DATE_FORMAT, LEAGUES } from '../enums'
import api from '../api'
import { IAnalytics, IBet, ITeam } from '../types'

class Store {
  activeLeagueId: number = LEAGUES[0]

  teams : ITeam[] = []

  bets: IBet[] = []

  isLoading = false

  date: Moment = moment()

  analytics: IAnalytics = {
    profit: 0,
    bestBets: [],
    maxQuotient: 1,
  }

  isUnsaved = false

  errorFields = []

  constructor() {
    makeObservable(this, {
      activeLeagueId: observable,
      isLoading: observable,
      date: observable,
      errorFields: observable,
      isUnsaved: observable,
      teams: observable,
      bets: observable,
      analytics: observable,
      addBet: action,
      setAnalytics: action,
      setDate: action,
      onSave: action,
      setIsLoading: action,
      setIsUnsaved: action,
      setErrorField: action,
      setBets: action,
    })

    runInAction(async () => {
      this.teams = await api.getTeamsOfLeague(this.activeLeagueId)
      await this.refreshBets()
    })

    reaction(() => this.activeLeagueId, async () => {
      this.date = moment()
      this.teams = await api.getTeamsOfLeague(this.activeLeagueId)
      await this.refreshBets()
    })
  }

  refreshBets = async () => {
    this.setIsLoading(true)
    const { bets, analytics } = await api.getBets(this.activeLeagueId, this.date?.format(DATE_FORMAT))
    this.bets = bets || []
    this.analytics = analytics
    this.setIsLoading(false)
  }

  setAnalytics = analytics => {
    this.analytics = analytics
  }

  setIsLoading = bool => {
    this.isLoading = bool
  }

  setDate = date => {
    this.date = date
  }

  setIsUnsaved = bool => {
    this.isUnsaved = bool
  }

  setErrorField = fields => {
    this.errorFields = fields
  }

  setActiveLeagueId = id => {
    this.activeLeagueId = id
  }

  setBets = bets => {
    this.bets = bets
  }

  onSave = async () => {
    await api.saveBets(this.unsavedBets.map(bet => {
      const { key, isNew, ...rest } = bet
      return rest
    }))
    await this.refreshBets()
  }

  addBet = () => {
    this.bets = [...this.bets, {
      key: `${this.bets.length}+${this.activeLeagueId}`,
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

  changeBet = (key: number | string, field: string, data: any) : void => {
    this.bets.find(bet => bet.key === key)[field] = data
  }

  deleteBets = async (keys: number[]) => {
    await api.deleteBet(keys, this.activeLeagueId)
    await this.refreshBets()
  }

  get unsavedBets() {
    return this.bets.filter(bet => bet.isNew)
  }
/*
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
  } */
}

export default new Store()
