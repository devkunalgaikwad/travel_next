import React from 'react'
import getFavoriteListing from '../action/getFavoriteListing'
import getCurrentUser from '../action/getCurrentUser'
import { EmptyState } from '../components'
import FavoritesClient from './FavoritesClient'

const page = async() => {
  const listings = await getFavoriteListing()
  const currentUser = await getCurrentUser()
  if (listings.length === 0){
    return (
      <EmptyState title='No favorite found ..!' subtitle='Looks like you have no favorite listings.'/>
    )
  }
  return (
    <FavoritesClient listings={listings} currentUser ={currentUser}/>
  )
}

export default page