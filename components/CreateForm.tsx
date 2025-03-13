"use client"
import {z} from 'zod';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { createSchema } from '@/config/validators/course';
import {zodResolver} from '@hookform/resolvers/zod'
import { Form, FormControl,  FormField, FormItem, FormLabel, FormMessage } from './ui/form';
import { Input } from './ui/input';
import { Button } from './ui/button';
import {Loader, Plus, Trash, X } from 'lucide-react';

import {motion , AnimatePresence} from 'framer-motion'

const CreateForm = () => {

    const [isLoading , setIsLoading] = useState(false);
    
    const form = useForm<z.infer<typeof createSchema>>({
        resolver : zodResolver(createSchema),
        defaultValues : {
            title : "" ,
            units : ["" ]
        }
    })

    function onSubmit(values : z.infer<typeof createSchema>){
        setIsLoading(true);
        console.log(values);
        setIsLoading(false);
    }


  return (
    <Form {...form}>
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
      <FormField
        control={form.control}
        name="title"
        render={({ field }) => (
          <FormItem>
            <FormLabel className='font-semibold'>😁 Course Title</FormLabel>
            <FormControl>
              <Input className='w-full' placeholder="e.g computer network.." {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
        <div className='flex flex-col gap-4'>
            <AnimatePresence>
      {form.watch('units').map((_ , index) => {
        return (
             <motion.div key={index} 
                initial = {{opacity : 0 , height : 0}}
                animate = {{opacity : 1 , height : "auto"}}
                exit = {{opacity : 0 , height : 0}}
                transition={{
                    opacity : {duration : 0.2},
                    height : {duration : 0.2}
                }}
             >
                <FormField  control={form.control} name={`units.${index}`}

                    render={({field}) => {
                        return (
                            <FormItem className='relative'>
                            <FormLabel className='font-semibold'>📑 Unit {index+1}</FormLabel>
                            <FormControl >
                            <Input className='w-full' placeholder="enter subtopic" {...field} />
                            </FormControl>
                            <span
                                    className={`absolute cursor-pointer hover:outline-2 hover:outline-zinc-100 rounded-full top-0 right-0 translate-y-8 -translate-x-6 ${
                                        form.watch("units").length === 1 ? "opacity-0 " : ""
                                    }`}
                                    onClick={() => {
                                        if (form.watch("units").length > 1) {
                                        const updatedUnits = form.watch("units").filter((_, i) => i !== index);
                                        form.setValue("units", updatedUnits);
                                        }
                                    }}
                                    >
                                <X className='text-muted-foreground h-6 w-6 p-1'/>
                            </span>
                            <FormMessage />
                        </FormItem>
                                )
                    }}
                />
            </motion.div>
            )
        })}
        </AnimatePresence>
       <div className='grid grid-cols-3 gap-2'>
            <Button onClick={()=>{
                form.setValue('units' , [...form.watch("units") , ''] )
            }} type="button" variant={"outline"} className='col-span-2'><Plus/> Add Unit</Button>
            <Button   onClick={() => {
             form.reset({ title: "", units: [""] });
            }} type="button" variant={"secondary"} className='text-destructive'> <Trash className=''/> Clear</Button>
       </div>
        </div>  

            {isLoading ? (
                    <Button type='submit' disabled className='w-40'><Loader className='animate-spin'/></Button>
            ) : (
                <Button className='w-40' type="submit">Create Course</Button>

            )}
            
    </form>
  </Form>
  )
}

export default CreateForm