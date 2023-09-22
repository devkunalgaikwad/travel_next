'use client'
import { ButtonProps } from '@/app/components/types'
import React from 'react'

const Button = ({label, onClick, disabled, outline, small, icon: Icon}:ButtonProps) => {
  return (
    <button title={label} onClick={onClick} disabled={disabled} className={`relative disabled:opacity-70 disabled:cursor-not-allowed rounded-lg hover:opacity-60 transition w-full ${outline ?'bg-white border-black text-black':'bg-rose-500 border-rose-500 text-white'} ${small ? 'py-1 text-sm font-light border-[1px]':'py-3 text-lg font-semibold border-2'}`} >
        {Icon && (
            <Icon size={24} className='absolute left-4 items-center'/>
        )} 
        {label}
    </button>
  )
}

export default Button