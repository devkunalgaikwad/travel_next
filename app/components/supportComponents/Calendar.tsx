'use client'

import React from 'react'
import { CalendarProps } from '../types'
import { DateRange } from 'react-date-range'
import 'react-date-range/dist/styles.css'
import 'react-date-range/dist/theme/default.css'

const Calendar = ({value, onChange, disableDates}:CalendarProps) => {
  return (
    <DateRange rangeColors={['#242424']} ranges={[value]} date={new Date()} onChange={onChange} direction='vertical' showDateDisplay={false} minDate={new Date()} disabledDates={disableDates}/>
  )
}

export default Calendar