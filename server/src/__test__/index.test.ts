import request from 'supertest';
import { app } from '../index';

describe('GET /listings', () => {
	it('returns array of listings', async () => {
		const res = await request(app)
			.get('/listings')
			.expect('Content-Type', /json/);

		expect(res.statusCode).toEqual(200);
		expect(res.body).toEqual(
			expect.arrayContaining([
				expect.objectContaining({
					id: expect.any(String),
					title: expect.any(String),
					image: expect.any(String),
					address: expect.any(String),
					price: expect.any(Number),
					numOfGuests: expect.any(Number),
					numOfBeds: expect.any(Number),
					numOfBaths: expect.any(Number),
					rating: expect.any(Number),
				}),
			])
		);
	});
});
