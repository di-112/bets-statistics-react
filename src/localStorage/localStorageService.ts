import { IBet } from '../types'

const localStorageService = {
  put: (bets: IBet[]) => {
    localStorage.setItem('bets', JSON.stringify(bets))
  },

  get: () => JSON.parse(localStorage.getItem('bets')) || [],
}

export default localStorageService
