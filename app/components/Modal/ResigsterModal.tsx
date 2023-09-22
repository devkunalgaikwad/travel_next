'use client'
import React from 'react'
import axios from 'axios'
import {AiFillGithub} from 'react-icons/ai'
import {FcGoogle} from 'react-icons/fc'
import {useCallback, useState} from 'react'
import {FieldValues, SubmitHandler, useForm} from 'react-hook-form'
import useResgisterModal from '@/app/hooks/useResgisterModal'
import { Button, Heading, Input, Modal } from '..'
import toast from 'react-hot-toast'
import { signIn } from 'next-auth/react'
import useLoginModal from '@/app/hooks/useLoginModal'

const ResigsterModal = () => {
    const registerModal = useResgisterModal()
    const loginModal = useLoginModal()
    const [isLoading, setIsLoading] = useState(false)
    const {register, handleSubmit, formState: {
        errors,
    }} = useForm<FieldValues>({
        defaultValues :{
            name :'',
            email :'',
            password :''
        }
    })
    const onSubmit:SubmitHandler<FieldValues> =(data)=>{
        setIsLoading(false)
        axios.post('/api/register',data).then(()=>{
            registerModal.onClose()
        }).catch(()=>{
            toast.error('Somethings went wrong')
        }).finally(()=>{
            setIsLoading(false)
        })
    }
    const toggle = useCallback(()=>{
        registerModal.onClose()
        loginModal.onOpen()
    },[loginModal, registerModal])
    const bodyContent = (
        <div className='flex flex-col gap-4'>
            <Heading title='Welcome to Travel Nest' subtitle='Create your account' center={true}/>
            <Input register={register} type='email' id={'email'} label='Email' disabled={isLoading} errors={errors} required/>
            <Input register={register} type='name' id={'name'} label='Name' disabled={isLoading} errors={errors} required/>
            <Input register={register} type='password' id={'Password'} label='Password' disabled={isLoading} errors={errors} required/>
        </div>
    )
    const footerContent = (
        <>
            <div className='flex flex-row items-center gap-4 mt-3'>
            <hr />
            <Button outline label='Continue with Google' icon={FcGoogle} onClick={()=>signIn('google')}/>
            <Button outline label='Continue with GitHub' icon={AiFillGithub} onClick={()=>signIn('github')}/>
        </div>
        <div className='text-neutral-500 w-auto text-center mt-4 font-light'>
            <div className='flex justify-center flex-row items-center gap-2'>
                <div>
                    Already have an Account?
                </div>
                <div onClick={toggle} className='text-black font-bold cursor-pointer hover:underline'>
                    Login here!
                </div>
            </div>
        </div>
        </>
    )
  return (
        <Modal disable={isLoading} isOpen={registerModal.isOpen} title='Register' actionLabel='Continue' onClose={registerModal.onClose} onSubmit={handleSubmit(onSubmit)} body={bodyContent} footer={footerContent}/>
    )
}

export default ResigsterModal