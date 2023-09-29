'use client'

import React from 'react'
import { ListingReservationProps } from '../types'
import { Button, Calendar } from '..'

const ListingReservation = ({price, dateRange, totalPrice, onChangeDate, onSubmit,disabled, disabledDates}:ListingReservationProps) => {
  return (
    <div className='bg-white rounded-xl border-[1px] border-neutral-200 overflow-hidden'>
      <div className='flex flex-row items-center gap-1 p-4'>
        <div className='text-2xl font-semibold'>
          Rs. {price}
        </div>
        <div className='font-light text-neutral-600'>
          night
        </div> 
      </div>
      <hr />
      <div className='z-10'>
        <Calendar value={dateRange} disableDates={disabledDates} onChange={(value)=> onChangeDate(value.selection)}/>
      </div>
      <div className='p-4'>
        <Button disabled={disabled} label='Reserve' onClick={onSubmit}/>
      </div>
      <hr />
      <div className='p-4 flex flex-row items-center justify-between font-semibold text-lg'>
        <div>
          Total Price
        </div>
        <div>
          Rs {totalPrice}
        </div>
      </div>
    </div>
  )
}

export default ListingReservation