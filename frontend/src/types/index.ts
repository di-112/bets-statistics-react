import { Moment } from 'moment'
import { RESULTS } from '@enums'

export interface ITeam {
    country: string,
    id: number,
    logo: string,
    name: string
}

export interface ILeague {
    id: number,
    logo: string,
    name: string,
    type: string
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
    bestBets: string[]
}

export enum TeamStatus {
    visit = 'visit',
    home = 'home',
}

export interface IErrorField {
    errors: (keyof IBet)[],
    success: boolean,
    key: string
}

export interface IUser {
    login: string,
    email: string,
    token: string
}

export type TypeChangeBet = <T extends keyof IBet>(key: number | string, field: T, data: IBet[T]) => void

export interface IBetsSlice {
    activeLeagueId: number,
    teams: ITeam[],
    bets: IBet[],
    isLoading: boolean,
    isOpenMenu: boolean,
    date: Moment,
    analytics: IAnalytics,
    isUnsaved: boolean,
    errorFields: IErrorField[],
    user: null
}
