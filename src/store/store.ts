import { makeAutoObservable, reaction, runInAction } from 'mobx'
import moment, { Moment } from 'moment';
import api from '@api'
import { DATE_FORMAT, LEAGUES } from '@enums'
import { IAnalytics, IBet, ITeam } from '@types'

class Store {
  activeLeagueId: number = LEAGUES[1]

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
    makeAutoObservable(this)

    runInAction(async () => {
      this.teams = await api.getTeamsOfLeague(this.activeLeagueId)
      this.refreshBets()
    })

    reaction(() => this.activeLeagueId, async () => {
      this.date = moment()
      this.teams = await api.getTeamsOfLeague(this.activeLeagueId)
      this.refreshBets()
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
    this.refreshBets()
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
    this.refreshBets()
  }

  get unsavedBets() {
    return this.bets.filter(bet => bet.isNew)
  }
}

export default new Store()
