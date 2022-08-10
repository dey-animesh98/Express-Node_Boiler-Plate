const jwt = require("jsonwebtoken");


const authorization = async function (req, res, next) {
    try {
        let token = req.headers.authorization
        if (!token) return res.status(401).send({ status: false, msg: "JWT Token must be present" });

        let splitedtoken = token.split(' ')
        // decoding token  
        jwt.verify(splitedtoken[1], "mySecretKey", (err, decode) => {
            if (err) return res.status(401).send({ status: false, message: err.message })
            else req.decodeToken = decode
        })
        next()
    }
    catch (err) {
        return res.status(500).send({ msg: "Error", error: err.message })
    }
}

module.exports.authorization = authorization

