export const schema = gql`
  type Query {
    testQuery: String @skipAuth
  }
`
