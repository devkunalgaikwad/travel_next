import React from 'react'
import { FavoritesClientProps } from '../types'
import { Container, Heading, ListingCard } from '../components'

const FavoritesClient = ({currentUser, listings}:FavoritesClientProps) => {
  return (
    <Container>
      <Heading title='Favorites' subtitle='List of places you like.'/>
      <div className='mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8'>
        {listings.map((list)=>(
          <ListingCard currentUser={currentUser} key={list.id} data={list}/>
        ))}
      </div>
    </Container>
  )
}

export default FavoritesClient