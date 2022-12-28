const bycrpt = require('bcryptjs')


const generateHash = (pwd) => {
    return bycrpt.hashSync(pwd, 8)
}

const verifyHash = (pwd, hashedPwd) => {
    return bycrpt.compareSync(pwd, hashedPwd)
}

module.exports = {generateHash, verifyHash}