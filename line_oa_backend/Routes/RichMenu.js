const express = require('express')
const router = express.Router()
const { 
    getActivityAll, 
    getSumActivityALL,
    getActivityA,
    getSumActivityA,
    getActivityB,
    getSumActivityB,
    getActivityC,
    getSumActivityC,
    getActivityD,
    getSumActivityD,
    getActivityE,
    getSumActivityE,
    getActivityF,
    getSumActivityF
} = require('../Controllers/RichMenu')


router.get('/getActivityAll', getActivityAll)

router.get('/getSumActivityALL', getSumActivityALL)

router.get('/getActivityA', getActivityA)

router.get('/getSumActivityA', getSumActivityA)

router.get('/getActivityB', getActivityB)

router.get('/getSumActivityB', getSumActivityB)

router.get('/getActivityC', getActivityC)

router.get('/getSumActivityC', getSumActivityC)

router.get('/getActivityD', getActivityD)

router.get('/getSumActivityD', getSumActivityD)

router.get('/getActivityE', getActivityE)

router.get('/getSumActivityE', getSumActivityE)

router.get('/getActivityF', getActivityF)

router.get('/getSumActivityF', getSumActivityF)


module.exports = router