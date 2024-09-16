const express = require('express')
const router = express.Router()
const {
    getSumLiffTotal,
    getAllLiffData,
    getLiffUsers,getAllLiffUsers
} = require('../Controllers/Liff')

router.get('/getSumLiffTotal', getSumLiffTotal)

router.get('/getAllLiffData', getAllLiffData)

router.get('/getLiffUsers', getLiffUsers)

router.get('/getAllLiffUsers', getAllLiffUsers)



module.exports = router