'use client'
import { MenuItemProps } from '@/app/components/types'
import React from 'react'

const MenuItem = ({onClick, label}:MenuItemProps) => {
  return (
    <div className='px-4 py-3 hover:bg-neutral-100 transition font-semibold' onClick={onClick} title={label}>
        {label}
    </div>
  )
}

export default MenuItem