import axios from "axios";


//All LineFriends Data
export const getAllLineFriends = async () =>
    await axios.get(import.meta.env.VITE_APP_API + `/getAllLineFriends`)


//Get Last Values 
export const getLastFriends = async () =>
    await axios.get(import.meta.env.VITE_APP_API + `/getLastFriends`)



//Get Sum Broadcast 
export const getSumBroadcast = async () =>
    await axios.get(import.meta.env.VITE_APP_API + `/getSumBroadcast`)


//Get Month Line Friends
export const getMonthLineFriends = async () =>
    await axios.get(import.meta.env.VITE_APP_API + `/getMonthLineFriends`)