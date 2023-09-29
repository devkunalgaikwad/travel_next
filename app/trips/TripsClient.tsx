'use client'

import React, { useCallback, useState } from 'react'
import { TripsClientProps } from '../types'
import { Container, Heading, ListingCard } from '../components'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import toast from 'react-hot-toast'

const TripsClient = ({currentUser, reservations}:TripsClientProps) => {
    const router = useRouter()
    const [deletingId, setDeletingId] = useState('')
    const onCancel = useCallback((id:string)=>{
        setDeletingId(id)
        axios.delete(`/api/reservations/${id}`).then(()=>{
            toast.success('Trips is canceled')
            router.refresh()
        }).catch(()=>{
            toast.error('Something went wrong...!')
        }).finally(()=>setDeletingId(''))
    },[router])
  return (
    <Container>
        <Heading title='Trips' subtitle="Where you've been and where you're going"/>
        <div className='mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8'>
            {reservations.map((reserve)=>(
                <ListingCard key={reserve.id} data={reserve.listing} reservation={reserve} actionId={reserve.id} onAction={onCancel} disabled={deletingId === reserve.id} actionLabel='Cancel reservation' currentUser={currentUser}/>
            ))}
        </div>
    </Container>
  )
}

export default TripsClient