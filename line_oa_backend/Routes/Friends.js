const express = require('express')
const router = express.Router()
const {
    getAllLineFriends,
    getLastFriends,
    getMonthLineFriends
} = require('../Controllers/Friends')


router.get('/getAllLineFriends', getAllLineFriends)

router.get('/getLastFriends', getLastFriends)

router.get('/getMonthLineFriends', getMonthLineFriends)



module.exports = router