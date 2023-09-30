'use client'

import React, {useMemo, useState} from 'react'
import { CategoryInput, Counter, CountrySelect, Heading, ImageUpload, Input, Modal } from '..'
import useRentModal from '@/app/hooks/useRentModal'
import { categories } from '@/app/constant'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import dynamic from 'next/dynamic'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'

enum STEPS {
  CATEGORY = 0,
  LOCATION =1,
  INFO = 2,
  IMAGES =3,
  DESCRIPTION = 4,
  PRICE = 5,
}

const RentModal = () => {
    const router = useRouter()
    const rentModal = useRentModal()
    const [isLoading, setIsLoading] = useState(false)
    const [step, setStep] = useState(STEPS.CATEGORY)

    const {register, handleSubmit, setValue, watch, formState :{
      errors,
    },reset} = useForm<FieldValues>({
      defaultValues:{
        category :'',
        location:'',
        guestCount :1,
        roomCount :1,
        bathroomCount :1,
        imageSrc:'',
        price :1,
        title :'',
        description :'',
      }
    })

    const category = watch('category')
    const location = watch('location')
    const guestCount =watch('guestCount')
    const roomCount =watch('roomCount')
    const bathroomCount =watch('bathroomCount')
    const imageSrc = watch('imageSrc')

    const Map =useMemo(()=>dynamic(()=> import('../map/Map'),{
      ssr : false
    }),[])

    const setCustomValue = (id:string,value:any) =>{
      setValue(id, value,{
        shouldValidate : true,
        shouldDirty : true,
        shouldTouch : true
      });
    }
    const onBack = ()=>{
      setStep((value)=>value -1)
    }
    const onNext = ()=>{
      setStep((value)=>value+1)
    }
    const onSubmit:SubmitHandler<FieldValues> =(data)=>{
      if (step !== STEPS.PRICE){
        return onNext()
      }
      setIsLoading(true)
      axios.post('/api/listings',data).then(()=>{
        toast.success('Listing is Created ..!')
        router.refresh()
        reset()
        setStep(STEPS.CATEGORY)
        rentModal.onClose()
      }).catch(()=>{
        toast.error('Something went wrong')
      }).finally(()=>{
        setIsLoading(false);
      })
    }
    const actionLabel = useMemo(()=>{
      if (step === STEPS.PRICE){
        return 'Create'
      }
      return 'Next'
    },[step])
    const secondaryActionLabel = useMemo(()=>{
      if (step === STEPS.CATEGORY){
        return undefined
      }
      return 'Back'
    },[step])
    let bodyContent = (
      <div className='flex flex-col gap-4'>
        <Heading title='Which is correct for you' subtitle='Pick a vategory'/>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[50vh] overflow-y-auto'>
          {
            categories.map((item)=>(
              <div key={item.label}>
                  <CategoryInput onClick={(category:any)=>setCustomValue('category',category)} selected={category ===item.label} label={item.label} icon={item.icon}/>
              </div>
            ))
          }
        </div>
      </div>
    )
    if (step===STEPS.LOCATION ){
      bodyContent=  (
        <div className='flex flex-col gap-4'>
          <Heading title='Where is the Location?' subtitle='Help to find you...!'/>
          <CountrySelect value={location} onChange={(value)=>setCustomValue('location',value)}/>
          <Map center={location?.latLng}/>
        </div>
      )
    }
    if (step ===STEPS.INFO){
      bodyContent =(
        <div className='flex flex-col gap-4'>
          <Heading title='Add More details' subtitle='What amenities do you have'/>
          <Counter title='Guests' subtitle='How many Guest' value={guestCount} onChange={(value)=>setCustomValue('guestCount',value)}/>
          <Counter title='Rooms' subtitle='How many Rooms' value={roomCount} onChange={(value)=>setCustomValue('roomCount',value)}/>
          <Counter title='BathRooms' subtitle='How many Bathrooms' value={bathroomCount} onChange={(value)=>setCustomValue('bathroomCount',value)}/>
        </div>
      )
    }
    if (step === STEPS.IMAGES){
      bodyContent =(
        <div className='flex flex-col gap-8'>
          <Heading title='Add relevent images.' subtitle='Show guests what your place looks like...!'/>
          <ImageUpload value={imageSrc} onChange={(value)=>setCustomValue('imageSrc',value)}/>
        </div>
      )
    }

    if (step === STEPS.DESCRIPTION){
      bodyContent =(
        <div className='flex flex-col gap-4'>
          <Heading title='Add Description' subtitle='Give more detail for better attention of guests.'/>
          <Input id='title' label='Title' disabled={isLoading} register={register} errors={errors} required/>
          <hr />
          <Input id='description' label='Description' disabled={isLoading} register={register} errors={errors} required/>
        </div>
      )
    }
    if (step ===STEPS.PRICE){
      bodyContent = (
        <div className='flex flex-col gap-8'>
          <Heading title='Set your Price for your place' subtitle='How much price for one night'/>
          <Input id='price' label='Price' formatPrice type='number' disabled={isLoading} register={register} errors={errors} required/>
        </div>
      )
    }
  return (
    <Modal disable={isLoading} title='Travel Next your home' isOpen={rentModal.isOpen} onClose={rentModal.onClose} onSubmit={handleSubmit(onSubmit)} actionLabel={actionLabel} secondaryLabel={secondaryActionLabel} secondaryAction={step ===STEPS.CATEGORY ? undefined:onBack} body={bodyContent}/>
  )
}

export default RentModal