'use client'

import React, { useCallback } from 'react'
import { CategoriesBoxProps } from '../types'
import { useRouter, useSearchParams } from 'next/navigation'
import qs from 'query-string'

const CategoriesBox = ({label, icon:Icon, description, selected}:CategoriesBoxProps) => {
    const router = useRouter()
    const params =useSearchParams()
    const handleClick = useCallback(()=>{
        let currentqurey ={}
        if (params){
            currentqurey=qs.parse(params.toString())
        }
        const updateQuery:any ={
            ...currentqurey,
            category :label
        }
        if (params?.get('category')===label){
            delete  updateQuery.category
        }
        const url = qs.stringifyUrl({
            url :'/',
            query: updateQuery,
        },{skipNull:true})
        router.push(`${url}`)
    },[label, params, router])
  return (
    <div className={`flex flex-col items-center justify-center gap-2 p-3 border-b-2 hover:text-neutral-800 transition cursor-pointer ${selected ? 'border-b-neutral-800 text-neutral-800':'border-transparent text-neutral-500'}`} onClick={handleClick}>
        <Icon size={25}/>
        <div className='font-medium text-sm'>
            {label}
        </div>
    </div>
  )
}

export default CategoriesBox