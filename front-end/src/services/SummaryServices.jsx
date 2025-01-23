import axios from 'axios'

export const addUser = async(name) => {
    return axios.post(`${import.meta.env.VITE_BASEURL}/add/summaryuser`, {user: name})
}

export const fetchAllUsers = async() => {
    return axios.get(`${import.meta.env.VITE_BASEURL}/get/alluser`)
}

export const addDetails = async(details) => {
    return axios.post(`${import.meta.env.VITE_BASEURL}/add/details`, details)
}

export const getIndividualDetails = async(id) => {
    return axios.get(`${import.meta.env.VITE_BASEURL}/get/details`,{params: {user_id: id}})
}