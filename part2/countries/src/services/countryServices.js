import axios from 'axios'
const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api'
const getAll = () => {
    const response = axios.get(`${baseUrl}/all`)
    console.log('response :>> ', response);
    return response.then(response => response.data)
}

export default {
    getAll
}