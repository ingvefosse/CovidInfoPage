import axios from 'axios'

const getAPI = axios.create({
    baseURL: 'https://covid19.cloudeya.org/',
    timeout: 10000,
    headers: {
        Authorization: 'Bearer ' + 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3RhcGkxIiwiaWF0IjoxNjExNDk5MjQyLCJleHAiOjE2MTE2OTkyNDJ9.Q7byqQJwWwYZDuFQvwMdivM09X1TmJum-Tu1matmkqk'
    }
})


export { getAPI }