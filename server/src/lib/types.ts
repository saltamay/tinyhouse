import { Collection, ObjectId } from 'mongodb';

export enum ListingType {
  Apartment = 'APARTMENT',
  House = 'HOUSE',
  Condominium = 'CONDOMINIUM'
}

export interface Address {
  street: string;
  suburb: string;
  government_area?: string;
  market?: string;
  city?: string;
  admin?: string;
  country: string;
  country_code: string;
}

export interface Image {
  thumbnail_url?: string;
  medium_url?: string;
  picture_url?: string;
  xl_picture_url?: string;
}

export interface BookingIndexMonth {
  [key: string]: boolean
}

export interface BookingIndexYear {
  [key: string]: BookingIndexMonth
}

export interface BookingsIndex {
  [key: string]: BookingIndexYear
}

export interface Booking {
  _id: ObjectId;
  listing: ObjectId;
  tenant: User;
  checkIn: string;
  checkOut: string;
}

export interface Listing {
	_id: ObjectId;
  listingUrl?: string;
	name: string;
  summary?: string;
  space?: string;
  description: string;
  neighborhoodOverview?: string;
  notes?: string;
  transit?: string;
  access?: string;
  interaction?: string;
  houseRules?: string;
  propertyType: ListingType;
  roomType?: string;
  bedType?: string;
  minimumNights?: string;
  maximumNights?: string;
  cancellationPolicy?: string;
  lastScraped?: Date;
  calendarLastScraped?: Date;
  firstReview?: Date;
  lastReview?: Date;
  accommodates?: number; // numOfGuests
  bedrooms: number;
  beds: number; // numOfBeds
  bathrooms: number;
  numberOfReviews?: number;
	images: Image;
  host: User;
	address: Address;
	rating: number;
  bookings: Booking[];
  bookingsIndex: BookingsIndex;
  price: number;
}

export interface User  {
  _id: string;
  token: string;
  name: string;
  avatar: string;
  email: string;
  walletId?: string;
  income: number;
  bookings: ObjectId[];
  listings: ObjectId[];
}

export interface Database {
  bookings: Collection<Booking>;
	listings: Collection<Listing>;
  users: Collection<User>;
}

export interface Viewer {
  _id?: string;
  token?: string;
  avatar?: string;
  walletId?: string;
  didRequest: boolean;
}
