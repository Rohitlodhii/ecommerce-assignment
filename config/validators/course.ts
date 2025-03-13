
import {z} from 'zod'


export const createSchema = z.object({
    title: z.string().min(3 , "Title must be at least 3 characters").max(100),
    units : z.array(z.string().min(1,'Add a subtopic')).min(1),

});