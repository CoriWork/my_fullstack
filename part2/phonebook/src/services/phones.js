import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
    const response = axios.get(baseUrl)
    console.log('getAll response :>> ', response);
    return response.then(response => response.data)
}

const create = (newObject) => {
    const response = axios.post(baseUrl, newObject)
    console.log('create response :>> ', response);
    return response.then(response => response.data)
}

const update = (id, newObject) => {
    const response = axios.put(`${baseUrl}/${id}`, newObject)
    return response.then(response => response.data)
}

const remove = (id) => {
    console.log('id :>> ', id);
    const response = axios.delete(`${baseUrl}/${id}`)
    console.log('remove response :>> ', response);
    return response.then(response => response.data)
}

export default {
    getAll,
    create,
    update,
    remove
}