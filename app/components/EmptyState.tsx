'use client'

import React from 'react'
import { EmptyStateProps } from './types'
import { useRouter } from 'next/navigation'
import { Button, Heading } from '.'

const EmptyState = ({title, subtitle, showReset}:EmptyStateProps) => {
    const router= useRouter()

  return (
    <div className='h-[60vh] flex-col flex gap-2 justify-center items-center'>
        <Heading title={title || 'Something went wrong'} subtitle={subtitle} center/>
        <div className='w-40 mt-4'>
            {showReset &&(
                <Button outline label='Remove all filters' onClick={()=> router.push('/')}/>
            )}
        </div>
    </div>
  )
}

export default EmptyState