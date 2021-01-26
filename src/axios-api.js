import axios from 'axios'

const getAPI = axios.create({
    baseURL: 'https://covid19.cloudeya.org/',
    timeout: 10000,
    headers: {
        Authorization: 'Bearer ' + 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3RhcGkxIiwiaWF0IjoxNjExNjkzMDI3LCJleHAiOjE2MTE4OTMwMjd9.X9PsOEn0Buk7_deyIzDEPoYzOvYv5W6rlI7FYyEmeRI'
    }
})


export { getAPI }