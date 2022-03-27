const localStorageService = {
  put: bets => {
    localStorage.setItem('bets', JSON.stringify(bets))
  },

  get: () => JSON.parse(localStorage.getItem('bets')) || [],
}

export default localStorageService
