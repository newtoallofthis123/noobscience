import { z, defineCollection } from 'astro:content';

const blogContent = defineCollection({
    type: 'content',
    schema: ({image}) => z.object({
        title: z.string(),
        author: z.string().default('Ishan Joshi'),
        date: z.date(),
        emoji: z.string().emoji(),
        type: z.string(),
        description: z.string(),
        tags: z.array(z.string()),
        color: z.string().optional(),
        bg: z.string().optional(),
        selection_color: z.string().optional(),
        selection_bg: z.string().optional(),
        selection_only: z.boolean().optional().default(true),
        category: z.string().optional(),
        minutesRead: z.string().optional(),
        img: image().refine((img)=>img).optional(),
        draft: z.boolean().optional().default(false),
    }),
});

export const collections = {
    blog: blogContent,
};