const bcrypt = require('bcryptjs')

const generatePasswordHash = (pwd) => {
    return bcrypt.hashSync(pwd)
}

const verifyHash = (pwd, hashedPwd) => {
    return bcrypt.compareSync(pwd, hashedPwd)
}

module.exports = {
    generatePasswordHash,
    verifyHash
}