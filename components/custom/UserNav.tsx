"use client"
/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */


import { DefaultSession } from 'next-auth'
import React from 'react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '../ui/dropdown-menu'
import { DropdownMenuItem } from '@radix-ui/react-dropdown-menu'
import Image from 'next/image'
import { Button } from '../ui/button'
import { signIn, signOut } from 'next-auth/react'
import { Coins, LockKeyholeIcon, LogOut, Settings, SparkleIcon } from 'lucide-react'

interface Session extends DefaultSession {
    user : {
        id : string ,
        credits : number,
    } & DefaultSession["user"]
}

const UserNav = ({ user }: { user: Session | null }) => {
  return (
    <div>
         {user ? 
                    (
                            <div className='bg-muted px-4 py-2 rounded-md flex items-center justify-center gap-2'>
                               
                                <DropdownMenu>
                                    <DropdownMenuTrigger className='rounded-full'>
                                    <div className='h-7 w-7 overflow-hidden rounded-full outline-2 outline-zinc-900'>
                                         <Image  loading='lazy' src={user?.user?.image!} alt='U' height={"100"} width={"100"}/>
                                    </div>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent className='w-40 py-2'>
                                        <DropdownMenuLabel className='px-4 font-semibold'>
                                            <div className='flex flex-col gap-0.5'>
                                                <div>{user?.user.name}</div>
                                                <div className='text-[8px] text-muted-foreground font-light'>{user?.user.email}</div>
                                            </div></DropdownMenuLabel>
                                        <DropdownMenuSeparator/>
                                        <DropdownMenuItem className='outline-none px-4 py-1 cursor-pointer hover:bg-zinc-100 rounded-sm flex items-center gap-2'>
                                            <SparkleIcon className='h-4 w-4'/> Premium
                                        </DropdownMenuItem>
                                        <DropdownMenuItem className='outline-none px-4 py-1 cursor-pointer hover:bg-zinc-100 rounded-sm flex items-center gap-2'>
                                            <Coins className='h-4 w-4'/> Credits
                                        </DropdownMenuItem>
                                        <DropdownMenuItem className='outline-none px-4 py-1 cursor-pointer hover:bg-zinc-100 rounded-sm flex items-center gap-2'>
                                            <Settings className='h-4 w-4'/> Settings
                                        </DropdownMenuItem>

                                        <DropdownMenuSeparator/>
                                        <DropdownMenuItem onClick={()=>signOut()} className='outline-none px-4 py-1 text-red-500 cursor-pointer hover:bg-zinc-100 rounded-sm flex items-center gap-2'>
                                            <LogOut className='h-4 w-4'/> Logout
                                        </DropdownMenuItem>
                                       
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>
                    ) : 
                    (

                        <Button onClick={()=>{
                            signIn("google")
                        }} className='cursor-pointer bg-muted hover:bg-zinc-200' variant={"ghost"}><LockKeyholeIcon/> Login</Button>
                    
                    )
                }

       
    </div>
  )
}

export default UserNav