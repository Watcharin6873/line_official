import axios from "axios";

export const getAllBroadcast = async () =>
    await axios.get(import.meta.env.VITE_APP_API + `/getAllBroadcast`)


export const getSumBroadcast = async () =>
    await axios.get(import.meta.env.VITE_APP_API + `/getSumBroadcast`)