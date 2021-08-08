require('dotenv').config();
import { connectDatabase } from './../src/database';
import { listings } from './listings';
import { Listing } from '../src/lib/types';

const seed = async (listings: Listing[]) => {
	try {
		console.log('[seed] : running...');
		const db = await connectDatabase();
		await db.listings.deleteMany({});
		await db.listings.insertMany(listings);
		console.log('[seed] : success');
		process.exit();
	} catch (error) {
		throw new Error('failed to seed database');
	}
};

seed(listings);
