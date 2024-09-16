import axios from "axios";


//All Data MOPH Alerting
export const getSumTransections = async () =>
    await axios.get(import.meta.env.VITE_APP_API + `/getSumTransections`)



//Transection_Moph_alert
export const getTransectionMophAlert = async ({hospital_code, startDate, endDate}) =>
    await axios.get(import.meta.env.VITE_APP_API + `/getTransectionMophAlert?hospital_code=${hospital_code}&startDate=${startDate}&endDate=${endDate}`)


//List Hospital on moph-alerting
export const getListHospMophAlert = async () =>
    await axios.get(import.meta.env.VITE_APP_API + `/getListHospMophAlert`)


//Sum Month moph-alerting
export const getSumMonthTrans = async () =>
    await axios.get(import.meta.env.VITE_APP_API + `/getSumMonthTrans`)