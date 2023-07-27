const { comparePassword, getHashedPassword } = require("./helpers/password");
const { createToken } = require("./helpers/token");
const { prismaClient } = require("../../prisma");

const login = async (req, res) => {
    try {
        const { email, password } = req.body

        if (!email || !password) {
            return res.status(400).json({
                error: 'Заполните обязательные поля'
            })
        }

        const registeredUser = await prismaClient.user.findFirst({
            where: {
                email
            }
        })

        if (!registeredUser || !comparePassword(password, registeredUser.password)) {
            return res.status(400).json({
                error: 'Неверный логин или пароль'
            })
        }

        res.status(200).json({
            token: createToken(registeredUser.id),
            email,
            login: registeredUser.login
        })
    } catch (error) {
        res.status(400).send({
            error: error.message,
        })
    }
}

const register = async (req, res) => {
    try {
        const {
            login,
            password,
            email
        } = req.body

        if (!login || !password || !email) {
            return res.status(400).json({
                error: 'Заполните обязательные поля'
            })
        }

        const registeredUser = await prismaClient.user.findFirst({
            where: {
                email
            }
        })

        if (registeredUser) {
            return res.status(400).json({
                error: 'Пользователь с таким email уже существует'
            })
        }


        const user = await prismaClient.user.create({
            data: {
                login,
                email,
                password: await getHashedPassword(password)
            }
        })

        res.status(201).json({
            login,
            email,
            token: createToken(user.id)
        })
    } catch (error) {
        res.status(400).send({
            error: error.message,
        })
    }
}

module.exports = {
    register,
    login
}
