'use client'

import React from 'react'
import { ListingInfoProps } from '../types'
import useCountries from '@/app/hooks/useCountry'
import { Avatar, ListingCategory } from '..'
import dynamic from 'next/dynamic'

const Map = dynamic(()=> import('../map/Map'),{
    ssr : false
})

const ListingInfo = ({user, category, description, roomCount, guestCount, bathroomCount, locationValue}:ListingInfoProps) => {
    const {getByValue} = useCountries()
    const coordinates = getByValue(locationValue)?.latLng
  return (
    <div className='col-span-4 flex flex-col gap-4'>
        <div className='flex flex-col gap-2'>
            <div className='text-xl font-semibold flex flex-row items-center gap-2'>
                <div>Hosted by {user?.name}</div>
                <Avatar src={user?.image}/>
            </div>
            <div className='flex flex-row items-center gap-4 font-light text-neutral-500'>
                <div>
                    {guestCount} Guests
                </div>
                <div>
                    {roomCount} Rooms
                </div>
                <div>
                    {bathroomCount} Bathrooms
                </div>
            </div>
        </div>
        <hr/>
        {category && (
            <ListingCategory description={category.description} label={category.label} icon={category.icon}/>
        )}
        <hr />
        <div className='text-lg font-light text-neutral-500'>
            {description}
        </div>
        <hr />
        <Map center={coordinates}/>
    </div>
  )
}

export default ListingInfo