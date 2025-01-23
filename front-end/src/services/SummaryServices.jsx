import axios from 'axios'
const baseUrl =  'https://expense-tracker-three-wheat.vercel.app'

export const addUser = async(name) => {
    return axios.post(`${baseUrl}/add/summaryuser`, {user: name})
}

export const fetchAllUsers = async() => {
    return axios.get(`${baseUrl}/get/alluser`)
}

export const addDetails = async(details) => {
    return axios.post(`${baseUrl}/add/details`, details)
}

export const getIndividualDetails = async(id) => {
    return axios.get(`${baseUrl}/get/details`,{params: {user_id: id}})
}