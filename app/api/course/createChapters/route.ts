/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextResponse } from "next/server";
import { createSchema } from "@/config/validators/course";
import { ZodError } from "zod";

import { ChapterPrompt, ImageSearchTerms, NewCoursePromptFormatInstructions, NewUserPrompt, UserPrompt } from "@/contants/prompts";


import { gemini_json } from "@/lib/jsonparser";
import { getUnsplashImage } from "@/lib/unsplash";
import { prisma } from "@/config/db";

export async function POST(req : Request , res : Response){
        try {
            const body =await req.json();
            const {title , units} =createSchema.parse(body);
            
            
            const output_units = await gemini_json( 
                NewUserPrompt(title , units),
                NewCoursePromptFormatInstructions,
             ) ;

            if (!Array.isArray(output_units)) {
                throw new Error("Invalid response from gemini_json: expected an array");
            }

             const imagePrompts = ImageSearchTerms(title);
             const imageSearchTerm = await gemini_json(
                imagePrompts.base_prompt ,
                imagePrompts.format_instructions
             );

             const course_image = await getUnsplashImage(imageSearchTerm?.image_search_term)
            
            //create the course to the database

            const course = await prisma.course.create({
                data : {
                    name : title,
                    image : course_image
                }
            });

            for(const unit of output_units) {
                const title = unit.title;
                const prismaUnit = await prisma.unit.create({
                    data : {
                        name : title ,
                        courseId : course.id 
                    }
                })

                await prisma.chapter.createMany({
                    data : unit.chapters.map((chapter : any)=> {
                        return{
                            name : chapter.chapter_title,
                            youtubeSearchQuery : chapter.youtube_search_query, 
                            unitId : prismaUnit.id
                        }
                    })
                })

            }
            

            return NextResponse.json({course_id : course.id} );

        } catch (error) {
            if(error instanceof ZodError){
                return new NextResponse("Invalid Body" , { status : 400});
            }
            console.log(error);
        }
}

