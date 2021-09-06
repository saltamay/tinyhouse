import { gql } from 'apollo-server-core';

export const typeDefs = gql`
	type Listing {
		id: ID!
		title: String!
		image: String!
		address: String!
		price: Int!
		numOfGuests: Int
		numOfBeds: Int
		numOfBaths: Int
		rating: Int
	}

  type Viewer {
    id: ID,
    token: String
    avatar: String
    hasWallet: Boolean
    didRequest: Boolean!
  }

	type Query {
    authUrl: String!
		listings: [Listing!]!
	}

  input LogInInput {
    code: String!
  }

	type Mutation {
    logIn(input: LogInInput): Viewer!
    logOut: Viewer!
		deleteListing(id: ID!): Listing!
	}
`;
