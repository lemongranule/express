

const express = require('express');

var router = express.Router();


router.get('/index', function (req, res) {
  res.send(' index')
})



module.exports = router;