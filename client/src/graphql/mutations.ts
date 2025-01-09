import { Graffle } from 'graffle'

const graffle = Graffle.create().transport({
  url: 'http://localhost:8080/query'
})

export const loginQuery = graffle.gql(`
  mutation Login($username: String!, $password: String!) {
    login(input: {
      username: $username,
      password: $password
    }) {
      username
      token
    }
  }`
)
