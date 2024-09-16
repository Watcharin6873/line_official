const express = require('express')
const router = express.Router()
const {getAllBroadcast, getSumBroadcast} = require('../Controllers/Broadcast')

router.get('/getAllBroadcast', getAllBroadcast)

router.get('/getSumBroadcast', getSumBroadcast)


module.exports = router