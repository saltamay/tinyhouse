// eslint-disable-next-line @typescript-eslint/no-var-requires
// require('dotenv').config();
import { MongoClient } from 'mongodb';

const user = process.env.DB_USER;
const userPassword = process.env.DB_USER_PASSWORD;
const cluster = process.env.DB_CLUSTER;

const uri = `mongodb+srv://${user}:${userPassword}@${cluster}.mongodb.net/main?retryWrites=true&w=majority`;

export const connectDatabase = async () => {
	const client = await MongoClient.connect(uri);

	const db = client.db('main');

	return {
		listings: db.collection('test_listings'),
	};
};
