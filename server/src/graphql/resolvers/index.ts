import merge from 'lodash.merge';
import { listingResolvers } from './Listing';
import { viewerResolvers } from './Viewer';

export const resolvers = merge(listingResolvers, viewerResolvers);
