import CreateForm from '@/components/CreateForm';
import { getAuthSession } from '@/config/auth'
import {  Sparkle } from 'lucide-react';

import { redirect } from 'next/navigation';
import React from 'react'

const page = async () => {

    const session = await getAuthSession();

    if(!session?.user){
        return redirect('/');
    }

  return (
    <div className='flex flex-col gap-4  md:items-center md:justify-center p-4 w-full md:max-w-xl md:mx-auto h-screen'>
      <h1 className='font-bold flex gap-4 items-center justify-center  tracking-tight md:text-3xl self-start text-2xl mt-2  '><Sparkle className='bg-zinc-100 hover:animate-spin px-2 h-8 w-8 rounded-full'/> Create new course</h1>
      <div className='flex gap-2 p-4  border-none bg-secondary rounded-sm'>
          
            <span>Enter the names of the chapter upon which you want to create the course and Ai will generate them for you</span>
      </div>
      <div className='w-full'>
        <CreateForm />
      </div>
    </div>
  )
}

export default page