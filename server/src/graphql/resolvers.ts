import { IResolvers } from 'apollo-server-express';
import { listings } from '../listings';

export const resolvers: IResolvers = {
	Query: {
		listings: () => {
			return listings;
		},
	},
	Mutation: {
		deleteListing: (_root: undefined, { id }: { id: string }) => {
			for (let i = 0; i < listings.length; i++) {
				const element = listings[i];
				if (element.id === id) {
					listings.splice(i, 1);
					return element;
				}
			}
			return new Error('failed to delete listing');
		},
	},
};
