import { Graffle } from 'graffle'

const graffle = Graffle
  .create({ output: { envelope: { errors: { execution: true } } } })
  .transport({ url: 'http://localhost:8080/query' })

export const loginQuery = graffle.gql(`
  mutation Login($username: String!, $password: String!, $totp: String) {
    login(input: {
      username: $username,
      password: $password,
      totp: $totp 
    }) {
      username
      token
    }
  }`
)
