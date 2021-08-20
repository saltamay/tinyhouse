import React, { useState } from 'react';
import { server } from '../../lib/api';
import {
	DeleteListingData,
	DeleteListingVariables,
	Listing,
	ListingsData,
} from './types';

const LISTINGS = `
  query Listings {
    listings {
      id,
      title,
      image,
      address,
      price,
      numOfGuests,
      numOfBeds,
      numOfBaths,
      rating
    }
  }
`;

const DELETE_LISTING = `
  mutation DeleteListing($id: ID!) {
    deleteListing(id: $id) {
      id,
    }
  }
`;

interface Props {
	title: string;
}
export const Listings = ({ title }: Props) => {
	const [listings, setListings] = useState<Listing[] | null>(null);

	const fetchListings = async () => {
		const {
			data: { listings },
		} = await server.fetch<ListingsData>({ query: LISTINGS });
		setListings(listings);
	};

	const deleteListing = async (id: string) => {
		await server.fetch<DeleteListingData, DeleteListingVariables>({
			variables: { id },
			query: DELETE_LISTING,
		});
		fetchListings();
	};

	const listingList = (
		<ul>
			{listings?.map((listing) => (
				<li key={listing.id}>
					{listing.title}
					<button onClick={() => deleteListing(listing.id)}>Delete</button>
				</li>
			))}
		</ul>
	);

	return (
		<>
			<h2>{title}</h2>
			{listingList}
			<button onClick={fetchListings}>Query Listings!</button>
		</>
	);
};
