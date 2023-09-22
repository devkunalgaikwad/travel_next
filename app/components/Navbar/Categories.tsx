'use client'

import React from 'react'
import { Container, CategoriesBox } from '..'
import { categories } from '@/app/constant'
import { usePathname, useSearchParams } from 'next/navigation'

const Categories = () => {
  const params = useSearchParams()
  const category = params?.get('category')
  const pathname = usePathname()
  const isMainPage = pathname === '/'
  if (!isMainPage){
    return null
  }
  return (
    <Container>
        <div className='pt-4 flex flex-row items-center justify-between overflow-x-auto'>
            {categories.map((item)=>(
                <CategoriesBox key={item.label} label={item.label} description={item.description} icon={item.icon} selected={category ===item.label}/>
            ))}
        </div>
    </Container>
  )
}

export default Categories