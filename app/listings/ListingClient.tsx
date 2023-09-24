'use client'

import React, { useCallback, useEffect, useMemo , useState} from 'react'
import { ListenClientProps } from '../types'
import { categories } from '../constant'
import { Container, ListingHead, ListingInfo, ListingReservation } from '../components'
import useLoginModal from '../hooks/useLoginModal'
import {useRouter} from 'next/navigation'
import {differenceInCalendarDays, eachDayOfInterval} from 'date-fns'
import axios from 'axios'
import toast from 'react-hot-toast'

const initialDateRange ={
  startDate : new Date(),
  endDate : new Date(),
  key : 'selection'
}

const ListingClient = ({currentUser, listing, reservation = []}:ListenClientProps) => {
  const category = useMemo(()=>{
    return categories.find((item)=>item.label === listing.category)
  },[listing.category])
  const loginModal = useLoginModal()
  const router = useRouter()
  const disabledDates = useMemo(()=>{
    let dates : Date[]=[]
    reservation.forEach((reservation)=>{
      const range = eachDayOfInterval({
        start :new Date(reservation.startDate),
        end : new Date(reservation.endDate)
      })
      dates = [...dates, ...range]
    })
    return dates
  },[reservation])
  const [isLoading, setIsLoading] = useState(false)
  const [totalPrice, setTotalPrice] = useState(listing.price)
  const [dateRange, setDateRange] = useState(initialDateRange)
  const onCreateReservation = useCallback(()=>{
    if (!currentUser){
      return loginModal.onOpen()
    }
    setIsLoading(true)
    axios.post('/api/reservations',{totalPrice,startDate : dateRange.startDate, endDate : dateRange.endDate, listingId: listing?.id}).then(()=>{
      toast.success('Listing is reserved!')
      setDateRange(initialDateRange)
      router.refresh()
    }).catch(()=>{
      toast.error('Something went wrong')
    }).finally(()=>{
      setIsLoading(false)
    })
  },[totalPrice,dateRange, listing?.id, router, currentUser,loginModal])
  useEffect(()=>{
    if(dateRange.startDate && dateRange.endDate){
      const dayCount = differenceInCalendarDays(dateRange.endDate,dateRange.startDate)
      if (dayCount && listing.price) {
        setTotalPrice(dayCount*listing.price)
      } else {
        setTotalPrice(listing.price)
      }
    }
  },[dateRange, listing.price])

  return (
    <Container>
      <div className='max-w-screen-lg mx-auto'>
        <div className='flex flex-col gap-6'>
        <ListingHead title={listing.title} locationValue={listing.locationValue} imageSrc={listing.imageSrc} id={listing.id} currentUser={currentUser}/>
        <div className='grid grid-cols-1 md:grid-cols-7 md:gap-10 mt-6'>
          <ListingInfo user={listing.user} category={category} description={listing.description} roomCount={listing.roomCount} guestCount={listing.guestCount} bathroomCount={listing.bathroomCount} locationValue={listing.locationValue}/>
          <div className='order-first md:z-10 md:order-last md:col-span-3'>
            <ListingReservation/>
          </div>
        </div>
        </div>
      </div>
    </Container>
  )
}

export default ListingClient