/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import React, { useState } from 'react'
import { Button } from '../ui/button'
import { ArrowLeftIcon,      Book,          Flame,      MenuIcon, Plus } from 'lucide-react'


import { DefaultSession } from 'next-auth'

import UserNav from './UserNav'



interface Session extends DefaultSession {
    user : {
        id : string ,
        credits : number,
    } & DefaultSession["user"]
}

const NavbarItemsList = [
    {
        title : "All Courses",
        link : "/",
        icon : Book,
        login : false
    },
    {
        title : "Create Course",
        link : "/",
        icon : Plus,
        login : true
    },
    {
        title : "Trending",
        link : "/",
        icon : Flame ,
        login : true
       },
    

]



const Navbar     = ({ user }: { user: Session | null })  => {

  

    const [isOpen ,setIsOpen] = useState(false);
  return (
    <>
   
    <div className={`fixed top-0 left-0  h-screen w-[75%] flex flex-col gap-4 bg-white shadow-md border-r border-zinc-200 transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } ` }>
        <div className='flex justify-end m-4 p-2  px-4'>
            <Button onClick={()=>setIsOpen(!isOpen)} variant={"outline"} className=''>
            <ArrowLeftIcon />
            </Button>
        </div>
        <div className='flex flex-col gap-3 items-start px-2  '>
        


            {user  ? (NavbarItemsList.map((item , index)=>(

            <div  className='px-4 py-3 bg-zinc-50 w-full cursor-pointer rounded-sm flex items-center justify-start gap-4  ' key={index}>< item.icon className='h-6 w-6'/> {item.title}</div>


            ))): 

            ( NavbarItemsList.filter(item => item.login == false).map((item,index)=>(

                <div  className='px-4 py-3 bg-zinc-50 w-full cursor-pointer rounded-sm flex items-center justify-start gap-4  ' key={index}>< item.icon className='h-6 w-6'/> {item.title}</div>

            )))

            }





        </div>
    </div> 
    <div className='flex items-center justify-between px-10 h-16 w-full shadow-sm'>   
       
            <div className='mr-auto flex gap-2 items-center justify-center'>
                <Button onClick={()=>setIsOpen(true)}  variant={"outline"} size={"icon"} className='md:hidden'>
                    <MenuIcon/>
                </Button>
                <span className='font-semibold'>Cours3X</span>
            </div>
            <div className='hidden md:flex items-center justify-center gap-2'>


                    {user  ? (NavbarItemsList.map((item , index)=>(

                                <button key={index} className='px-3 bg-zinc-50 py-2 cursor-pointer hover:bg-muted rounded-md flex items-center gap-2 hover:outline hover:outline-zinc-300
                                '><item.icon className='h-5 w-5 text-muted-foreground' /> {item.title}</button>


                ))): 

                ( NavbarItemsList.filter(item => item.login == false).map((item,index)=>(

                    <button key={index} className='px-3 bg-zinc-50 py-2 cursor-pointer hover:bg-muted rounded-md flex items-center gap-2 hover:outline hover:outline-zinc-300
                    '><item.icon className='h-5 w-5 text-muted-foreground' /> {item.title}</button>


                     )))
                    
                }




            </div>
            <div className='ml-auto flex gap-2'>

               <UserNav user={user}/>




            </div>
     
    

   
   </div>
   </>
  )
}

export default Navbar