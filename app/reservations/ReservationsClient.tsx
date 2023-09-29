'use client'

import React, { useCallback, useState } from 'react'
import { Container, Heading, ListingCard } from '../components'
import { ReservationsClientProps } from '../types'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import toast from 'react-hot-toast'

const ReservationsClient = ({currentUser, reservations}:ReservationsClientProps) => {
    const router = useRouter()
    const [deletingId, setDeletingId] = useState('')
    const onCancel = useCallback((id : string)=>{
        setDeletingId(id)
        axios.delete(`/api/reservations/${id}`).then(()=>{
            toast.success('Reservation canceled')
            router.refresh()
        }).catch(()=>{
            toast.error('Something went wrong')
        }).finally(()=>{
            setDeletingId('')
        })
    },[router])
  return (
    <Container>
        <Heading subtitle='Reservations on your properties' title='Reservations'/>
        <div className='grid mt-10 sm:grid-cols-2 grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8 '>
            {reservations.map((item)=>(
                <ListingCard key={item.id} data={item.listing} reservation={item} actionId={item.id} onAction={onCancel} disabled={deletingId===item.id} actionLabel='Cancel guest Reservation' currentUser={currentUser}/>
            ))}
        </div>
    </Container>
  )
}

export default ReservationsClient