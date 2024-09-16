const express = require('express')
const router = express.Router()
const { 
    getTransectionMophAlert, 
    getListHospMophAlert,
    getSumTransections,
    getSumMonthTrans
} = require('../Controllers/Transection_mophalert')


router.get('/getTransectionMophAlert', getTransectionMophAlert)

router.get('/getListHospMophAlert', getListHospMophAlert)

router.get('/getSumTransections', getSumTransections)

router.get('/getSumMonthTrans', getSumMonthTrans)


module.exports = router