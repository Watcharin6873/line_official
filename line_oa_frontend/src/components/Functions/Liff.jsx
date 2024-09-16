import axios from "axios";

export const getSumLiffTotal = async () =>
    await axios.get(import.meta.env.VITE_APP_API + `/getSumLiffTotal`)


export const getAllLiffData = async () =>
    await axios.get(import.meta.env.VITE_APP_API + `/getAllLiffData`)


export const getLiffUsers = async () =>
    await axios.get(import.meta.env.VITE_APP_API + `/getLiffUsers`)


export const getAllLiffUsers = async () =>
    await axios.get(import.meta.env.VITE_APP_API + `/getAllLiffUsers`)