import getCurrentUser from '@/app/action/getCurrentUser';
import getListingById from '@/app/action/getListingById'
import { EmptyState, ClientOnly } from '@/app/components';
import React from 'react'
import getReservations from '@/app/action/getReservations';
import ListingClient from '../ListingClient';

interface IParams{
  listingId ?: string;
}

const page = async({params}:{params : IParams}) => {
  const listing = await getListingById(params)
  const reservation = await getReservations(params)
  const currentUser = await getCurrentUser()
  if (!listing){
    return (
      <ClientOnly>
        <EmptyState/>
      </ClientOnly>
    )
  }
  return (
    <ClientOnly>
      <ListingClient listing={listing} reservation={reservation} currentUser={currentUser}/>
    </ClientOnly>
  )
}

export default page