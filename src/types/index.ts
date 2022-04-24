import { RESULTS } from '../enums'

export interface ITeam {
  country: string,
  id: number,
  logo: string,
  name: string
}

export interface IBet {
  key: number,
  date: Date | null,
  home: ITeam | null,
  visit: ITeam | null,
  quotient: number | null,
  bet: string,
  sum: number,
  result: RESULTS,
  isNew?: boolean,
}

export enum TeamStatus {
  visit = 'visit',
  home = 'home',
}
