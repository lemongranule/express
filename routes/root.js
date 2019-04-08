const express = require('express');

const config = require('../config');


var router = express.Router();


router.get('/', async function(req, res, next) {

	res.send({ version: config.version});


})



module.exports = router;
