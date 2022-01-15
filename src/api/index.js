import axios from 'axios'

const baseUrl = process.env.REACT_APP_API_URL
const token = localStorage.getItem('token')
const getToken = () => {
  return token ?? localStorage.getItem('token')
}

export const getTeams = () => {
  return axios.get(`${baseUrl}/teams`)
}

export const getUser = () => {
  return axios.get(
    `${baseUrl}/current_user`,
    { headers: { 'Authorization': getToken() } }
  )
}

export const createHolding = ({ quantity, teamId }) => {
  return axios.post(
    `${baseUrl}/holdings`,
    { quantity, team_id: teamId },
    { headers: { 'Authorization': getToken() } }
  )
}

export const deleteHolding = ({ quantity, holdingId }) => {
  return axios.delete(
    `${baseUrl}/holdings/${holdingId}?quantity=${quantity}`,
    { headers: { 'Authorization': getToken() } }
  )
}

export const createUser = ({ email, password, name }) => {
  return axios.post(
    'http://localhost:3000/signup',
    JSON.stringify({ user: { email, password, name } }),
    {
      headers: {
        'Content-Type': 'application/json'
      }
    },
  )
}
