'use client'

import useSearchModal from '@/app/hooks/useSearchModal'
import React, { useMemo } from 'react'
import {BiSearch} from 'react-icons/bi'
import {useSearchParams} from 'next/navigation'
import useCountries from '@/app/hooks/useCountry'
import { differenceInDays } from 'date-fns'

const Search = () => {
    const  searchModal = useSearchModal()
    const params = useSearchParams()
    const {getByValue} = useCountries()
    const loactionValue = params?.get('location')
    const startDate = params?.get('startDate')
    const endDate = params?.get('endDate')
    const guestCount = params?.get('guestCount')
    const locationLabel = useMemo(()=>{
        if (loactionValue){
            return getByValue(loactionValue as string)?.label
        }
        return 'Anywhere'
    },[getByValue, loactionValue])

    const durationLabel = useMemo(()=>{
        if (startDate || endDate) {
            const start = new Date(startDate as string)
            const end = new Date(endDate as string)
            let diff = differenceInDays(end, start)
            if (diff ===0 ){
                diff = 1
            }
            return `${diff} Days`
        }
        return 'Any Week'
    },[startDate, endDate])

    const guestLabel = useMemo(()=>{
        if (guestCount){
            return `${guestCount} Guest`
        }
        return 'Add guest'
    },[guestCount])

  return (
    <div className='border-[1px] w-full md:w-auto rounded-full py-2 hover:shadow-md shadow-sm transition cursor-pointer' onClick={searchModal.onOpen}>
        <div className='flex flex-row items-center justify-between'>
            <div className='text-sm font-semibold px-4'>
                {locationLabel}
            </div>
            <div className='hidden sm:block text-sm font-semibold px-6 border-x-[1px] flex-1 text-center'>
                {durationLabel}
            </div>
            <div className='text-sm pl-6 pr-2 text-gray-600 flex flex-row items-center gap-3'>
                <div className='hidden sm:block'>
                    {guestLabel}
                </div>
                <div className='p-2 bg-rose-500 rounded-full text-white'>
                    <BiSearch size={18}/>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Search