// eslint-disable-next-line @typescript-eslint/no-var-requires
// require('dotenv').config();
import { MongoClient } from 'mongodb';
import { Booking, Database, Listing, User } from '../lib/types';

const user = process.env.DB_USER;
const userPassword = process.env.DB_USER_PASSWORD;
const cluster = process.env.DB_CLUSTER;

const uri = `mongodb+srv://${user}:${userPassword}@${cluster}.mongodb.net/main?retryWrites=true&w=majority`;

export const connectDatabase = async (): Promise<Database> => {
	const client = await MongoClient.connect(uri);

	const db = client.db('main');

	return {
    bookings: db.collection<Booking>('bookings'),
		listings: db.collection<Listing>('listings'),
		users: db.collection<User>('users'),
	};
};
