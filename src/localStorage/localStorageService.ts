import moment, { Moment } from 'moment'
import { IBet } from '../types'
import { LEAGUES } from '../enums'

const localStorageService = {
  put: (bets: IBet[], league: number = LEAGUES[0]) => {
    localStorage.setItem(`bets_league_${league}`, JSON.stringify(bets))
  },

  get: (league: number = LEAGUES[0], month : Moment = moment()) => {
    const bets = JSON.parse(localStorage.getItem(`bets_league_${league}`)) || []

    return bets.filter(bet => moment(bet.date)
      .isBetween(month.startOf('month').format(), month.endOf('month').format()))
  },
}

export default localStorageService
