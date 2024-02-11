import axios from "axios"
const instance = axios.create({
    baseURL: 'http://localhost:8000/api/v1',
    headers: {
        'Access-Control-Allow-Origin': 'application/json',
    },
})

export default instance