"use client"

import React from 'react'
import { ListingHeadProps } from '../types'
import useCountries from '@/app/hooks/useCountry'
import { Heading, HeartButton } from '..'
import Image from 'next/image'

const ListingHead = ({title, locationValue,imageSrc, id, currentUser}:ListingHeadProps) => {
    const {getByValue} = useCountries()
    const location = getByValue(locationValue)

  return (
    <div>
        <div className='capitalize'>
            <Heading title={title} subtitle={`${location?.region} , ${location?.label}`}/>
        </div>
        <div className='w-full h-[60vh] overflow-hidden rounded-xl relative'>
            <Image alt='Image' src={imageSrc} fill className='object-cover w-full'/>
            <div className='absolute top-5 right-5'>
                <HeartButton listingId={id} currentUser={currentUser}/>
            </div>
        </div>
    </div>
  )
}

export default ListingHead