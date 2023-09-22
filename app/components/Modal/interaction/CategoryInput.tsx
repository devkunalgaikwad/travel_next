'use client'

import React from 'react'
import { CategoryInputProps } from '../../types'

const CategoryInput = ({onClick, selected, label, icon : Icon}:CategoryInputProps) => {
  return (
    <div onClick={()=>onClick(label)} className={`rounded-xl border-2 p-4 flex flex-row items-center text-black gap-3  hover:border-black transition cursor-pointer ${selected ?'border-black text-black':'border-neutral-200 text-neutral-500'}`}>
        <Icon size={30}/>
        <div className='font-semibold'>
            {label}
        </div>
    </div>
  )
}

export default CategoryInput