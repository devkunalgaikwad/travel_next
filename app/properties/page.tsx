import React from 'react'
import getCurrentUser from '../action/getCurrentUser'
import { EmptyState } from '../components'
import getReservations from '../action/getReservations'
import getListing from '../action/getListing'
import PropertiesClient from './PropertiesClient'

const PropertiesPage = async() => {
    const currentUser = await getCurrentUser()

    if (!currentUser){
        return(
            <EmptyState title='Unauthorized' subtitle='Please Login'/>
        )
    }
    const listing = await getListing({ userId: currentUser.id });
    if (listing?.length ===0){
        return(
            <EmptyState title='No Properties found' subtitle='Look you have not any properties'/>
        )
    }

  return (
    <PropertiesClient listing={listing} currentUser={currentUser} />
  )
}

export default PropertiesPage