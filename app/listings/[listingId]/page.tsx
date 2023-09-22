import getCurrentUser from '@/app/action/getCurrentUser';
import getListingById from '@/app/action/getListingById'
import { EmptyState } from '@/app/components';
import React from 'react'
import ListingClient from '../ListingClient';

interface IParams{
  listingId ?: string;
}

const page = async({params}:{params : IParams}) => {
  const listing = await getListingById(params)
  const currentUser = await getCurrentUser()
  if (!listing){
    return (
      <EmptyState/>
    )
  }
  return (
    <div>
      <ListingClient listing={listing} currentUser={currentUser}/>
    </div>
  )
}

export default page