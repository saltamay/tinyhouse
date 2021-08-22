import { gql, useMutation, useQuery } from '@apollo/client';
import {
	DeleteListingData,
	DeleteListingVariables,
	ListingsData,
} from './types';

const LISTINGS = gql`
	query Listings {
		listings {
			id
			title
			image
			address
			price
			numOfGuests
			numOfBeds
			numOfBaths
			rating
		}
	}
`;

const DELETE_LISTING = gql`
	mutation DeleteListing($id: ID!) {
		deleteListing(id: $id) {
			id
		}
	}
`;

interface Props {
	title: string;
}
export const Listings = ({ title }: Props) => {
	const { data, error, loading, refetch } = useQuery<ListingsData>(LISTINGS);
	const [
		deleteListing,
		{ error: deleteListingError, loading: deleteListingLoading },
	] = useMutation<DeleteListingData, DeleteListingVariables>(DELETE_LISTING);

	const handleDeleteListing = async (id: string) => {
		await deleteListing({ variables: { id } });
		refetch();
	};

	const listings = data ? data.listings : null;

	const listingList = (
		<ul>
			{listings &&
				listings.map((listing) => (
					<li key={listing.id}>
						{listing.title}
						<button onClick={() => handleDeleteListing(listing.id)}>
							Delete
						</button>
					</li>
				))}
		</ul>
	);

	const deleteListingLoadingMessage = deleteListingLoading ? (
		<h4>Deletion in progress...</h4>
	) : null;

	const deleteListingErrorMessage = deleteListingError ? (
		<h4>Uh oh! Something went wrong with deletion :(</h4>
	) : null;

	if (loading) return <h2>Loading...</h2>;

	if (error) return <h2>Uh oh! Something went wrong :(</h2>;

	return (
		<>
			<h2>{title}</h2>
			{listingList}
			{deleteListingLoadingMessage}
			{deleteListingErrorMessage}
		</>
	);
};
