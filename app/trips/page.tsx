import React from 'react'
import getCurrentUser from '../action/getCurrentUser'
import { EmptyState } from '../components'
import getReservation from '../action/getReservations'
import TripsClient from './TripsClient'

const TripsPage = async() => {
    const currentUser = await getCurrentUser()

    if (!currentUser){
        return(
            <EmptyState title='Unauthorized' subtitle='Please Login'/>
        )
    }
    const reservations = await getReservation({userId : currentUser.id})
    if (reservations?.length ===0){
        return(
            <EmptyState title='No trips found' subtitle='Look you have not any reservation'/>
        )
    }

  return (
    <TripsClient reservations={reservations} currentUser={currentUser} />
  )
}

export default TripsPage