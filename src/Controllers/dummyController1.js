const dummyModel = require('../Models/dummyModel1')
const validator = require('../Utils/validation')
const jwt = require('jsonwebtoken')

const dummyApi = async function (req, res) {
    //Write your logic here
    res.send({ message: "API IS WORKING" })
}


const loginUser = async function (req, res) {
    try {
        let data = JSON.parse(JSON.stringify(req.body));
        let { email, password } = data;
        if (isValidRequestBody(data))
            return res.status(400).send({ status: false, message: "No input by user" });
        if (isEmpty(email))
            return res.status(400).send({ status: false, msg: "email is required." });
        if (isEmpty(password))
            return res.status(400).send({ status: false, msg: "Password is required." });

        let getUser = await userModel.findOne({ email });
        if (!getUser) return res.status(404).send({ status: false, msg: "User not found or Email Id is invalid" });

        if (password != getUser.password) return res.status(401).send({ status: false, msg: "Password is incorrect." });

        //To create token
        let token = jwt.sign(
            {
                userId: getUser._id,
                exp: Math.floor(Date.now() / 1000) + 24 * 60 * 60,
            }, "mySecretKey")

        return res.status(200).send({ status: true, message: "Success", data: { userId: getUser._id, token: token }, });

    } catch (err) {
        return res.status(500).send({ status: false, message: "Error", error: err.message });
    }
};

module.exports = { dummyApi }