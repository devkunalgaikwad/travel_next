'use client'

import React, { useCallback, useState } from 'react'
import { PropertiesClientProps } from '../types'
import { Container, Heading, ListingCard } from '../components'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import toast from 'react-hot-toast'

const PropertiesClient = ({currentUser, listing}:PropertiesClientProps) => {
    const router = useRouter()
    const [deletingId, setDeletingId] = useState('')
    const onCancel = useCallback((id:string)=>{
        setDeletingId(id)
        axios.delete(`/api/listings/${id}`).then(()=>{
            toast.success('Listing is deleted')
            router.refresh()
        }).catch(()=>{
            toast.error('Something went wrong...!')
        }).finally(()=>setDeletingId(''))
    },[router])
  return (
    <Container>
        <Heading title='Properties' subtitle="list of your properties"/>
        <div className='mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8'>
            {listing.map((list)=>(
                <ListingCard key={list.id} data={list} actionId={list.id} onAction={onCancel} disabled={deletingId === list.id} actionLabel='Delete Property' currentUser={currentUser}/>
            ))}
        </div>
    </Container>
  )
}

export default PropertiesClient