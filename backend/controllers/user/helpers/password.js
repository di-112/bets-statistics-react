const bcrypt = require("bcrypt");

const getHashedPassword = async (password) => {
    const salt = await bcrypt.genSalt(10)

    return bcrypt.hash(password, salt)
}

const comparePassword = (password, hashedPassword) => bcrypt.compare(password, hashedPassword)

module.exports = {
    comparePassword,
    getHashedPassword
}
