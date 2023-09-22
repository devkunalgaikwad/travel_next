'use client'

import React from 'react'
import {AiFillGithub} from 'react-icons/ai'
import {FcGoogle} from 'react-icons/fc'
import {useCallback, useState} from 'react'
import {signIn} from 'next-auth/react'
import {FieldValues, SubmitHandler, useForm} from 'react-hook-form'
import useResgisterModal from '@/app/hooks/useResgisterModal'
import { Button, Heading, Input, Modal } from '..'
import toast from 'react-hot-toast'
import useLoginModal from '@/app/hooks/useLoginModal'
import {useRouter} from 'next/navigation'

const LoginModal = () => {
    const registerModal = useResgisterModal()
    const loginModal = useLoginModal()
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)
    const {register, handleSubmit, formState: {
        errors,
    }} = useForm<FieldValues>({
        defaultValues :{
            email :'',
            password :''
        }
    })
    const onSubmit:SubmitHandler<FieldValues> =(data)=>{
        setIsLoading(false)
        signIn('credentials',{
            ...data,
            redirect : false,
        }).then((callback)=>{
            setIsLoading(false)
            if (callback?.ok){
                toast.success('You have log in Successfully')
                router.refresh()
            }
            if (callback?.error){
                toast.error('Something went wrong')
                console.log(callback.error)
            }
        })
    }
    const toggle = useCallback(()=>{
        loginModal.onClose()
        registerModal.onOpen()
    },[loginModal, registerModal])
    const bodyContent = (
        <div className='flex flex-col gap-4'>
            <Heading title='Welcome Back ...!' subtitle='Log in up your account' center={true}/>
            <Input register={register} type='email' id={'email'} label='Email' disabled={isLoading} errors={errors} required/>
            <Input register={register} type='password' id={'password'} label='Password' disabled={isLoading} errors={errors} required/>
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
                    Are you new user...?
                </div>
                <div onClick={toggle} className='text-black font-bold cursor-pointer hover:underline'>
                    Create an account
                </div>
            </div>
        </div>
        </>
    )
  return (
        <Modal disable={isLoading} isOpen={loginModal.isOpen} title='Login' actionLabel='Continue' onClose={loginModal.onClose} onSubmit={handleSubmit(onSubmit)} body={bodyContent} footer={footerContent}/>
    )
}

export default LoginModal