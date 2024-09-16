const express = require('express')
const router = express.Router()
const {
    getAllLineVoom,
    getMonthLineVoom,
    getTotalLineVoom
} = require('../Controllers/LineVoom')


router.get('/getAllLineVoom', getAllLineVoom)

router.get('/getMonthLineVoom', getMonthLineVoom)

router.get('/getTotalLineVoom', getTotalLineVoom)



module.exports = router