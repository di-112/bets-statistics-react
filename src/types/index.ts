import { Moment } from 'moment'
import { RESULTS } from '../enums'

export interface ITeam {
  country: string,
  id: number,
  logo: string,
  name: string
}

export interface IBet {
  key: number | string,
  leagueId: number,
  date: Moment | null,
  home: ITeam | null,
  visit: ITeam | null,
  quotient: number | null,
  bet: string,
  sum: number,
  result: RESULTS,
  isNew?: boolean,
}

export interface IAnalytics {
  profit: number,
  maxQuotient: number,
  bestBet: string[]
}

export enum TeamStatus {
  visit = 'visit',
  home = 'home',
}
