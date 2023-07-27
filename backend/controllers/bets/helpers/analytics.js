const findBestBet = bets => {
    const winBets = bets.filter(bet => bet.result === 'Выигрыш')

    const betCountWins = winBets.reduce((acc, { bet }) => ({
        ...acc,
        [bet]: (acc[bet] ?? 0) + 1,
    }), {})

    const maxCountWins = Math.max(...Object.values(betCountWins))

    return Object.keys(betCountWins).filter(key => betCountWins[key] === maxCountWins)

}

const calculateProfit = bets => bets.reduce((acc, bet) => {

    if (bet.result === 'Выигрыш') {
        return acc + (bet.sum * (bet.quotient - 1))
    }

    return acc - bet.sum
}, 0)


const findMaxQuotient = bets => Math.max(...bets.map(bet => bet.quotient))

module.exports = {
    findBestBet,
    findMaxQuotient,
    calculateProfit
}
