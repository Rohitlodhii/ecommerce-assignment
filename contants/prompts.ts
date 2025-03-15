


export const ChapterPrompt = {
    system_prompt : "You are an AI capable of curating course content , coming up with relavant chapter title and finding relavant youtube videos",
    
}

export const UserPrompt = (title : string , units : string[]) => {
    return `Its your job to create a course about ${title} , the user have requested to chapters for each units ${units.join(" , ")} , for each unit you have to prepare multiple chapters , for each chapter you have to come up with a chapter title and find a relavant youtube video for that chapter
    Keep this things in mind :
    -Return the Output in the json format in array of objects
    -You should not return anything else than json 
    -Dont include any precceding or trailing spaces or newlines
    -there can be multiple chapters in one unit 
    -try to wrap the unit in less than 5 chapters
    -dont use double quotes in the generated text , only use double qoutes for the json ,not use anythign else

    -While giving the title names , dont use double quotes , only give title in plain text 

    -please please dont return title like
      "chapter_title": "Factoring "Polynomials": Techniques and Applications" ,,

    -the double quotes in the title will break the json format , so please avoid using double quotes in the title

    -The returned object should be of following format :
    for example user sended two units

    [
        {
            "title" : " sometitle ",
            "chapters" : [
                {
                    "youtube_search_query" : "Some query",
                    "chapter_title" : " some title "
                },
                {
                    "youtube_search_query" : "Some query",
                    "chapter_title" : "some title "
                }
            ]
        },
        {
            "title" : " sometitle ",
             "chapters" : [
                {
                    "youtube_search_query" : "Some query",
                    "chapter_title" : " sometitle "
                }
            ]
        }
    ]
    
    `   
}



export const NewUserPrompt = (title : string , units : string[]) => {
    return `Its your job to create a course about ${title} , the user have requested to chapters for each units ${units.join(" , ")} , for each unit you have to prepare multiple chapters , for each chapter you have to come up with a chapter title and find a relavant youtube video for that chapter
    `   
}


export const NewCoursePromptFormatInstructions = `
    Respond with a valid JSON object , Should be array of object with two field 'title' and 'chapters' , title is a string , and chapter is a array of object containing two file fields 'youtube_search_query' and 'chapter_title' , both are string

    Example : 
    [
        {
            "title" : "Some title",
            "chapters" : [
                {
                    "youtube_search_query" : "Some query",
                    "chapter_title" : "Some title"
                }
            ]
        }
    ]

`


export const ImageSearchTerms = (title : string) => {
    return  {
        base_prompt : `You are an Ai capable of finding the most relavant image for a course , Please provide a good image search term for the title of a course about ${title}. This search term will be fed into the unsplash API, so make sure it is a good search term that will return good results ` ,

        format_instructions : `Respond with the valid JSON object , It should be a object with the field image_search_term 
        Should be in format : 
        {
            image_search_term : "A good search term for course",
        }
        
        `

    } 
}   