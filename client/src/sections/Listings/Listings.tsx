import { server } from '../../lib/api';
import { useQuery } from '../../lib/api/useQuery';
import {
	DeleteListingData,
	DeleteListingVariables,
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
	const { data, error, loading, refetch } = useQuery<ListingsData>(LISTINGS);

	const deleteListing = async (id: string) => {
		await server.fetch<DeleteListingData, DeleteListingVariables>({
			variables: { id },
			query: DELETE_LISTING,
		});
		refetch();
	};

	const listings = data ? data.listings : null;

	const listingList = (
		<ul>
			{listings &&
				listings.map((listing) => (
					<li key={listing.id}>
						{listing.title}
						<button onClick={() => deleteListing(listing.id)}>Delete</button>
					</li>
				))}
		</ul>
	);

	if (loading) return <h2>Loading...</h2>;

	if (error) return <h2>Uh oh! Something went wrong :(</h2>;

	return (
		<>
			<h2>{title}</h2>
			{listingList}
		</>
	);
};
