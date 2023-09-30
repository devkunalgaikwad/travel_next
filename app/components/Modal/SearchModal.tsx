'use client'

import React, { useCallback, useMemo, useState } from 'react'
import { Calendar, Counter, Heading, Modal } from '..'
import useSearchModal from '@/app/hooks/useSearchModal'
import {useRouter, useSearchParams} from 'next/navigation'
import { Range } from 'react-date-range'
import dynamic from 'next/dynamic'
import CountrySelect, { CountrySelectValue } from './interaction/CountrySelect'
import qs from 'query-string'
import { formatISO } from 'date-fns'


enum STEPS {
    LOCATION=0,
    DATE =1,
    INFO =2,
}

const SearchModal = () => {
    const searchModal = useSearchModal()
    const router = useRouter()
    const params = useSearchParams()
    const [step, setStep] = useState(STEPS.LOCATION)
    const [guestCount, setGuestCount] = useState(1)
    const [roomCount, setRoomCount] = useState(1)
    const [bathRoomCount, setBathRoomCount] = useState(1)
    const [location, setLocation] = useState<CountrySelectValue>()
    const [dateRange, setDateRange] = useState<Range>({
        startDate: new Date(),
        endDate : new Date(),
        key : 'selection',
    })
    const Map = useMemo(()=>dynamic(()=> import('../map/Map'),{
        ssr : false,
    }),[])
    const onBack = useCallback(()=>{
        setStep((value)=>value -1)
    },[])
    const onNext = useCallback(()=>{
        setStep((value)=>value +1)
    },[])
    const onSubmit = useCallback(async()=>{
        if (step !== STEPS.INFO){
            return onNext()
        }
        let currentQurey ={}
        if (params){
            currentQurey = qs.parse(params.toString())
        }
        const updateQuery : any = {
            ...currentQurey,
            location : location?.value,
            guestCount,
            roomCount,
            bathRoomCount
        }
        if (dateRange.startDate){
            updateQuery.startDate = formatISO(dateRange.startDate)
        }
        if (dateRange.endDate){
            updateQuery.endDate = formatISO(dateRange.endDate)
        }
        const url = qs.stringifyUrl({
            url :  '/',
            query : updateQuery
        },{skipNull:true})
        setStep(STEPS.LOCATION)
        searchModal.onClose()
        router.push(url)
    },[step, searchModal, bathRoomCount, roomCount, guestCount, onNext, params,location, dateRange, router])
    const actionLabel = useMemo(()=>{
        if (step === STEPS.INFO){
            return 'Search'
        }
        return ' Next'
    },[step])
    const secondaryLabel = useMemo(()=>{
        if (step === STEPS.LOCATION){
            return undefined
        }
        return 'Back'
    },[step])

    let bodyContent = (
        <div className='flex flex-col gap-4'>
            <Heading title='Where you wanna go ?' subtitle='Find the perfect location'/>
            <CountrySelect value={location} onChange={(value)=>setLocation(value as CountrySelectValue)}/>
            <hr />
            <Map center={location?.latLng}/>
        </div>
    )
    if (step === STEPS.DATE){
        bodyContent =(
            <div className='flex flex-col gap-8'>
                <Heading title='When do you plan to go' subtitle='Looking for booking of the Properties to stay'/>
                <Calendar value={dateRange} onChange={(value)=>setDateRange(value.selection)}/>
            </div>
        )
    }
    if (step === STEPS.INFO){
        bodyContent = (
            <div className='flex flex-col gap-8'>
                <Heading title='More information' subtitle='Get your perfect match'/>
                <Counter title='Guests' subtitle='How many guest are search for.' value={guestCount} onChange={(value)=> setGuestCount(value)}/>
                <Counter title='Rooms' subtitle='How many Rooms you need.' value={roomCount} onChange={(value)=> setRoomCount(value)}/>
                <Counter title='BathRooms' subtitle='How many BathRooms do you need.' value={bathRoomCount} onChange={(value)=> setBathRoomCount(value)}/>
            </div>
        )
    }
  return (
    <Modal isOpen={searchModal.isOpen} body={bodyContent} onClose={searchModal.onClose} onSubmit={onSubmit} title='Filters' actionLabel={actionLabel} secondaryAction={step === STEPS.LOCATION ? undefined : onBack} secondaryLabel={secondaryLabel}/>
  )
}

export default SearchModal