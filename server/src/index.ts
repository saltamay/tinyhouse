import express from 'express';
import { listings } from './listings';

export const app = express();
const port = 3000;

app.use(express.json());

app.get('/', (_req, res) => {
	res.send('Hello World!');
});

app.get('/listings', (_req, res) => {
	res.send(listings);
});

if (process.env.NODE_ENV !== 'test') {
	app.listen(port, () => {
		console.log(`[tinyhouse]: http://localhost:${port}`);
	});
}
