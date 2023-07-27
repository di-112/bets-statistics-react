const jwt = require("jsonwebtoken");
const { transformBetsToDb, transformBetsFromDb } = require("../../helpers/transformBet");
const moment = require("moment/moment");
const { findBestBet, calculateProfit, findMaxQuotient } = require("./helpers/analytics");
const { prismaClient } = require("../../prisma");

const getBets = async (req, res) => {

    try {
        const { leagueId, date } = req.query

        const decoded = jwt.verify(req.headers.authorization, process.env.JWT_SECRET)

        const bets = await prismaClient.bets.findMany({
            where: {
                userId: decoded.Id,
                ...(leagueId && { leagueId }),
                ...(date && {
                    date: {
                        gte: moment(date, 'DD.MM.YYYY').startOf('month').format('YYYY-MM-DD'),
                        lte: moment(date, 'DD.MM.YYYY').endOf('month').format('YYYY-MM-DD'),
                    }
                })
            }
        })

        res.send({
            bets: transformBetsFromDb(bets),
            analytics: {
                profit: calculateProfit(bets),
                maxQuotient: findMaxQuotient(bets),
                bestBets: findBestBet(bets),
            },
        })
    } catch (error) {
        res.status(400).send({
            error: error.message,
        })
    }
}


const addBets = async (req, res) => {
    try {
        const decoded = jwt.verify(req.headers.authorization, process.env.JWT_SECRET)

        const bets = transformBetsToDb(req.body.bets || [])

        console.log({ bets })

        await Promise.all(bets.map(bet => prismaClient.bets.create({
            data: {
                ...bet,
                userId: decoded.Id
            }
        })))

        res.status(201).send({
            success: true,
        })
    } catch (error) {
        res.status(400).send({
            error: error.message,
        })
    }
}

const deleteBets = async (req, res) => {
    try {
        const decoded = jwt.verify(req.headers.authorization, process.env.JWT_SECRET)

        const { keys, leagueId } = req.query

        await prismaClient.bets.deleteMany({
            where: {
                leagueId,
                OR: keys.split('_').map((key) => ({ key: +key }))
            }
        })

        res.status(201).send({
            success: true,
        })
    } catch (error) {
        res.status(400).send({
            error: error.message,
        })
    }
}

module.exports = {
    addBets,
    deleteBets,
    getBets
}
