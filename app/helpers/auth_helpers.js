const bcrypt = require("bcrypt");

const verifyPassword = (password, hash) => {
    return bcrypt.compare(password, hash);
};

const hashPassword = (user) => {
    if (!user.password) return Promise.reject("No password to hash");

    // `password` will always be hashed before being saved.

    return bcrypt
        .hash(user.password, 10)
        .then((hash) => {
            delete user.password;
            return { ...user, encrypted_password: hash };
        })
        .catch((err) => `Error hashing password: ${err}`);
};

module.exports = {
    verifyPassword,
    hashPassword,
};
