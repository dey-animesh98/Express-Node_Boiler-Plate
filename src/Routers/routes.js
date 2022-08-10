const express = require('express');
const router = express.Router();

const dummyController = require('../Controllers/dummyController1')
const mid = require('../Middlewares/auth')

router.get('/test', dummyController.dummyApi)


router.all('/*', (req, res) => {
    res.status(404).send({ status: false, message: "URL Not Found" })
})

module.exports = router