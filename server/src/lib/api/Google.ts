import { User } from './../types';
import { google } from 'googleapis';

const oauth2Client = new google.auth.OAuth2(
	process.env.G_CLIENT_ID,
	process.env.G_CLIENT_SECRET,
	`${process.env.PUBLIC_URL}/login`
);

const scopes = [
	'https://www.googleapis.com/auth/userinfo.email',
	'https://www.googleapis.com/auth/userinfo.profile',
];

const url = oauth2Client.generateAuthUrl({
	access_type: 'online',
	scope: scopes,
});

export const Google = {
	authUrl: url,
	logIn: async (code: string) => {
		const { tokens } = await oauth2Client.getToken(code);
		oauth2Client.setCredentials(tokens);
		const { data } = await google
			.people({ version: 'v1', auth: oauth2Client })
			.people.get({
				resourceName: 'people/me',
				personFields: 'emailAddresses,names,photos',
			});

		return { user: data };
	},
};
