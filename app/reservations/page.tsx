import React from 'react'
import getCurrentUser from '../action/getCurrentUser'
import { EmptyState } from '../components'
import getReservations from '../action/getReservations'
import ReservationsClient from './ReservationsClient'

const page = async() => {
    const currentUser = await getCurrentUser()
    if (!currentUser){
        return (
            <EmptyState title='No reservations ...!' subtitle='Please login or Make a reservations'/>
        )
    }
    const reservations = await getReservations({ authorId: currentUser.id });

    if (reservations.length ===0){
        return(
            <EmptyState title='No reservation fond' subtitle='Its look that there is no reservations'/>
        )
    }
  return (
    <ReservationsClient reservations={reservations} currentUser={currentUser}/>
  )
}

export default page