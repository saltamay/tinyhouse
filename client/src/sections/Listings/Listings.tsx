import { gql, useMutation, useQuery } from '@apollo/client';
import { Alert, Avatar, Button, List, Spin } from 'antd';
import {
	DeleteListingData,
	DeleteListingVariables,
	ListingsData,
} from './types';
import { ListingsSkeleton } from './components';
import './styles/Listings.css';

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

	const listingList = listings ? (
		<List
			itemLayout='horizontal'
			loading={loading}
			dataSource={listings}
			renderItem={(item) => (
				<List.Item
					key={item.id}
					actions={[
						<Button type='primary' onClick={() => handleDeleteListing(item.id)}>
							Delete
						</Button>,
					]}
				>
					<List.Item.Meta
						avatar={<Avatar src={item.image} shape='square' size={48} />}
						title={item.title}
						description={item.address}
					/>
				</List.Item>
			)}
		/>
	) : null;

	if (loading) {
		return (
			<div className='listings'>
				<ListingsSkeleton title={title} />
			</div>
		);
	}

	if (error) {
		return (
			<div className='listings'>
				{error && (
					<Alert
						className='listings__alert'
						type='error'
						message='Uh oh! Something went wrong :('
					/>
				)}
				<ListingsSkeleton title={title} />
			</div>
		);
	}

	return (
		<div className='listings'>
			<Spin spinning={deleteListingLoading} size='large'>
				{deleteListingError && (
					<Alert
						className='listings__alert'
						type='error'
						message='Uh oh! Something went wrong :('
					/>
				)}
				<h2>{title}</h2>
				{listingList}
			</Spin>
		</div>
	);
};
