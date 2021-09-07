import crypto from 'crypto';
import { LogInArgs } from './types';
import { Google } from './../../../lib/api';
import { Viewer, Database, User } from './../../../lib/types';
import { IResolvers } from 'apollo-server-express';

const logInViaGoogle = async (
	code: string,
	token: string,
	db: Database
): Promise<User | undefined> => {
	const { user } = await Google.logIn(code);

	if (!user) {
		throw new Error('Google login error');
	}

	const userNamesList = user.names && user.names.length ? user.names : null;
	const userPhotosList = user.photos && user.photos.length ? user.photos : null;
	const userEmailsList =
		user.emailAddresses && user.emailAddresses.length
			? user.emailAddresses
			: null;

	const userName = (userNamesList && userNamesList[0]?.displayName) ?? null;
	const userId =
		(userNamesList && userNamesList[0]?.metadata?.source?.id) ?? null;
	const userAvatar = (userPhotosList && userPhotosList[0]?.url) ?? null;
	const userEmail = (userEmailsList && userEmailsList[0]?.value) ?? null;

	if (!userName || !userId || !userAvatar || !userEmail) {
		throw new Error('Google log in error.');
	}

	const updateRes = await db.users.findOneAndUpdate(
		{ _id: userId },
		{
			$set: {
				name: userName,
				avatar: userAvatar,
				contact: userEmail,
				token,
			},
		},
		{ returnDocument: 'after' }
	);

	let viewer = updateRes.value;

	if (!viewer) {
		const insertRes = await db.users.insertOne({
			_id: userId,
			name: userName,
			avatar: userAvatar,
			email: userEmail,
			token,
			income: 0,
			bookings: [],
			listings: [],
		});

		viewer = await db.users.findOne({ _id: insertRes.insertedId });
	}

	return viewer;
};

export const viewerResolvers: IResolvers = {
	Query: {
		authUrl: (): string => {
			try {
				return Google.authUrl;
			} catch (error) {
				throw new Error(`Failed to query Google Auth Url: ${error}`);
			}
		},
	},
	Mutation: {
		logIn: async (
			_root: undefined,
			{ input }: LogInArgs,
			{ db }: { db: Database }
		): Promise<Viewer> => {
			try {
				const code = input ? input.code : null;
				const token = crypto.randomBytes(16).toString('hex');
				const viewer = code ? await logInViaGoogle(code, token, db) : undefined;

				if (!viewer) {
					return { didRequest: true };
				}

				return {
					_id: viewer._id,
					token: viewer.token,
					avatar: viewer.avatar,
					walletId: viewer.walletId,
					didRequest: true,
				};
			} catch (error) {
				throw new Error(`Failed to log in: ${error}`);
			}
		},
		logOut: (): Viewer => {
			try {
				return { didRequest: true };
			} catch (error) {
				throw new Error(`Failed to log out: ${error}`);
			}
		},
	},
	Viewer: {
		id: (viewer: Viewer) => viewer._id,
		hasWallet: (viewer: Viewer) => (viewer.walletId ? true : undefined),
	},
};
