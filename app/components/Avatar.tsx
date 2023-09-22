import React from 'react'
import Image from 'next/image'
import { AvatarProps } from './types'

const Avatar = ({src}:AvatarProps) => {
  return (
    <Image src={src||'/images/placeholder.jpg'} alt='Avatar' height={30} width={30} className='rounded-full'/>
    )
}

export default Avatar