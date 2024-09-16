import axios from "axios";

export const getAllLineVoom = async () =>
    await axios.get(import.meta.env.VITE_APP_API + `/getAllLineVoom`)


export const getMonthLineVoom = async () =>
    await axios.get(import.meta.env.VITE_APP_API + `/getMonthLineVoom`)


export const getTotalLineVoom = async () =>
    await axios.get(import.meta.env.VITE_APP_API + `/getTotalLineVoom`)