import {
    autorun, extendObservable, makeAutoObservable, reaction, runInAction, toJS,
} from 'mobx'
import moment, { Moment } from 'moment';
import api from '@api'
import { DATE_FORMAT, LEAGUES } from '@enums'
import {
    IAnalytics, IBet, IErrorField, ITeam, IUser,
} from '@types'

function autoSave(store) {
    let firstRun = true;
    autorun(() => {
        const json = JSON.stringify(toJS(store));
        if (!firstRun) {
            localStorage.setItem('STORE', json)
        }
        firstRun = false;
    });
}

class Store {
    activeLeagueId: number = LEAGUES[1]

    teams: ITeam[] = []

    bets: IBet[] = []

    isLoading = false

    isOpenMenu = false

    date: Moment = moment()

    analytics: IAnalytics = {
        profit: 0,
        bestBets: [],
        maxQuotient: 1,
    }

    isUnsaved = false

    errorFields: IErrorField[] = []

    user: IUser = null

    constructor() {
        const savedStore = localStorage.getItem('STORE')

        if (savedStore) {
            const jsonSavedStore = JSON.parse(savedStore)

            jsonSavedStore.date = moment()

            extendObservable(this, jsonSavedStore);
        } else {
            makeAutoObservable(this)
        }

        autoSave(this)

        runInAction(async () => {
            this.teams = await api.getTeamsOfLeague(this.activeLeagueId)
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
        this.bets = (bets || [])
        this.analytics = analytics
        this.setIsLoading(false)
    }

    setAnalytics = analytics => {
        this.analytics = analytics
    }

    setIsOpenMenu = bool => {
        this.isOpenMenu = bool
    }

    setIsLoading = bool => {
        this.isLoading = bool
    }

    setDate = date => {
        this.date = date
    }

    setUser = user => {
        this.user = user
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
            key: `${this.bets.length}+${this.activeLeagueId}+${Math.random()}`,
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

    changeBet = <T extends keyof IBet>(key: number | string, field: T, data: IBet[T]): void => {
        this.bets.find(bet => bet.key === key)[field] = data
    }

    deleteBets = async (rows: IBet[]) => {
        const newRowsKey = rows.filter(row => row.isNew).map(({ key }) => key)
        const realRowsKey = rows.filter(row => !row.isNew).map(({ key }) => key)

        if (newRowsKey.length) {
            this.bets = this.bets.filter(({ key }) => !newRowsKey.includes(key))
        }

        if (realRowsKey.length) {
            const res = await api.deleteBet(realRowsKey, this.activeLeagueId)

            if (res) {
                this.bets = this.bets.filter(({ key }) => !realRowsKey.includes(key))
            }
        }
    }

    get unsavedBets() {
        return this.bets.filter(bet => bet.isNew)
    }

    get isAuth() {
        return !!this.user
    }
}

export default new Store()
