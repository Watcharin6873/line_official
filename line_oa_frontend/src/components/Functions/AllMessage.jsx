import axios from "axios";

export const getMessageAlldata = async () =>
    await axios.get(import.meta.env.VITE_APP_API + `/getMessageAlldata`)


export const getSumMessageData = async () =>
    await axios.get(import.meta.env.VITE_APP_API + `/getSumMessageData`)


export const getGreetingMessage = async () =>
    await axios.get(import.meta.env.VITE_APP_API + `/getGreetingMessage`)


export const getResultSumGreetingMessage = async () =>
    await axios.get(import.meta.env.VITE_APP_API + `/getResultSumGreetingMessage`)


export const getGreetingImpression = async () =>
    await axios.get(import.meta.env.VITE_APP_API + `/getGreetingImpression`)


export const getSumGreetingImpression = async () =>
    await axios.get(import.meta.env.VITE_APP_API + `/getSumGreetingImpression`)