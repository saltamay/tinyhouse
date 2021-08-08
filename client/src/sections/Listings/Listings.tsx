import { server } from '../../lib/api';
import {
	ListingsData,
	DeleteListingData,
	DeleteListingVariables,
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
	const fetchListings = async () => {
		const {
			data: { listings },
		} = await server.fetch<ListingsData>({ query: LISTINGS });
		console.log(listings);
	};

	const deleteListing = async (id: string) => {
		const {
			data: { deleteListing },
		} = await server.fetch<DeleteListingData, DeleteListingVariables>({
			variables: { id },
			query: DELETE_LISTING,
		});
		console.log(deleteListing);
	};

	return (
		<>
			<h2>{title}</h2>
			<button onClick={fetchListings}>Query Listings!</button>
			<button onClick={() => deleteListing('611060396f555ccc78b470ed')}>
				Delete Listing!
			</button>
		</>
	);
};
