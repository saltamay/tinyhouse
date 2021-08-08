import { ObjectId } from 'mongodb';
import { IResolvers } from 'apollo-server-express';
import { Database, Listing } from './../../../lib/types';

export const listingResolvers: IResolvers = {
	Query: {
		listings: async (
			_root: undefined,
			_args: {},
			{ db }: { db: Database }
		): Promise<Listing[]> => {
			return await db.listings.find({}).toArray();
		},
	},
	Mutation: {
		deleteListing: async (
			_root: undefined,
			{ id }: { id: string },
			{ db }: { db: Database }
		): Promise<Listing> => {
			const res = await db.listings.findOneAndDelete({ _id: new ObjectId(id) });
			if (!res.value) throw Error('failed to delete listing');
			return res.value;
		},
	},
	Listing: {
		id: (listing: Listing): string => listing._id.toString(),
	},
};
