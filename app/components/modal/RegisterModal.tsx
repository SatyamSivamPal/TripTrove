'use client'
import axios from 'axios';

import { FcGoogle } from 'react-icons/fc';
import {AiOutlineGithub} from 'react-icons/ai';

import { useCallback, useState } from 'react';
import {
    FieldValues,
    SubmitHandler,
    useForm
} from "react-hook-form";

import useRegisterModal from '@/app/Hooks/useRegisterModal';
import useLoginModal from '@/app/Hooks/useLoginModal';


import Modal from './Modal';
import Heading from '../Heading';
import Input from '../inputs/Input';
import {toast} from 'react-hot-toast'
import Button from '../Button';
import {signIn} from "next-auth/react"


const RegisterModal = () => {
    const registerModal = useRegisterModal();
    const loginModal = useLoginModal();
    const [isLoading, setIsLoading] = useState(false);

    const {
        register,
        handleSubmit,
        formState: {
            errors,
        }
    } = useForm<FieldValues>({
        defaultValues: {
            name: '',
            email: '',
            password: '',
        }
    })

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true);

        axios.post('/api/register', data)
            .then(() => {
                registerModal.onClose();
                loginModal.onOpen();
                toast.success('Register Successfully')
            })
            .catch((error) => {
                toast.error('Something went wrong')
            })
            .finally(() => {
                setIsLoading(false);
                
            })
    }

    const toogle = useCallback (() => {
        loginModal.onOpen();
        registerModal.onClose();
    },[registerModal,loginModal])

    const bodyContent = (
        <div className="flex flex-col gap-4">
            <Heading
                title='Welcome to Trip Trove'
                subTitle='Create an account'
            />
            <Input
                id='email'
                label='Email'
                disabled={isLoading}
                register={register}
                errors={errors}
                required
            />

            <Input
                id='name'
                label='Name'
                disabled={isLoading}
                register={register}
                errors={errors}
                required
            />

            <Input
                id='password'
                label='Password'
                disabled={isLoading}
                register={register}
                errors={errors}
                required
            />
        </div>
    )

    const footerContent = (
        <div className='flex flex-col gap-4 mt-3 '>
            
            <hr />
            <p className='item-center flex flex-row justify-center'>Or</p>
            <Button
            outline
            label="Continue with Google"
            icon={FcGoogle}
            onClick={() => signIn('google')}
            />

            <Button
            outline
            label="Continue with Github"
            icon={AiOutlineGithub}
            onClick={() => signIn('github') }
            />

        <div className='text-neutral-500 text-center mt-4 font-light'>
            <div className='flex flex-row items-center justify-center gap-2'>
                <div>
                    Already have an account?
                </div>
                <div 
                onClick={toogle}
                className='text-neutral-800
                 cursor-pointer hover:underline'>
                    Log in
                </div>
            </div>

        </div>
        </div>
    )


    return (
        <Modal
            disabled={isLoading}
            isOpen={registerModal.isOpen}
            title='Register'
            actionLabel='Continue'
            onClose={registerModal.onClose}
            onSubmit={handleSubmit(onSubmit)}
            body={bodyContent}
            footer={footerContent}
        />
    )
}

export default RegisterModal