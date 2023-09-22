'use client'

import React from 'react'
import Select from 'react-select'
import { CountrySelectProps } from '../../types'
import useCountries from '@/app/hooks/useCountry'

export type CountrySelectValue ={
    flag : string,
    label : string,
    latLng : number[],
    region : string,
    value : string,
}

const CountrySelect = ({value,onChange}:CountrySelectProps) => {
    const {getAll} = useCountries()
  return (
    <div>
        <Select placeholder={'Anywhere'} isClearable options={getAll()} formatOptionLabel={(option :any)=>(
            <div className='flex flex-row items-center gap-3'>
                <div>{option.flag}</div>
                <div>
                    {option.label},
                    <span className='text-neutral-500 ml-1'>
                        {option.region}
                    </span>
                </div>
            </div>
        )} value={value}  onChange={(value)=>onChange(value as CountrySelectValue)} classNames={{
            control:()=>'p-3 border-2',
            input :()=> 'text-lg',
            option : ()=>'text-lg',
        }} theme={(theme)=>({
            ...theme,
            borderRadius :6,
            colors :{
                ...theme.colors,
                primary :'black',
                primary25 :'#ffe4e6'
            }
        })}/>
    </div>
  )
}

export default CountrySelect