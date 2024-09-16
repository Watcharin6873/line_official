const express = require('express')
const router = express.Router()
const {
    getMessageAlldata, 
    getSumMessageData, 
    getGreetingMessage,
    getResultSumGreetingMessage,
    getGreetingImpression,
    getSumGreetingImpression
} = require('../Controllers/Message')

router.get('/getMessageAlldata', getMessageAlldata)

router.get('/getSumMessageData',getSumMessageData)

router.get('/getGreetingMessage',getGreetingMessage)

router.get('/getResultSumGreetingMessage', getResultSumGreetingMessage)

router.get('/getGreetingImpression', getGreetingImpression)

router.get('/getSumGreetingImpression',getSumGreetingImpression)




module.exports = router