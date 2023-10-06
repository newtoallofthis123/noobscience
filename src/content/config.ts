import { z, defineCollection } from 'astro:content';

// So I know I have a option problem.
// But I have no idea how this grew so much.
// Now I am too scared to remove any of these.
// Is this how you feel when you have a lot of options?
// I guess I will never know.
const blogContent = defineCollection({
    type: 'content',
    schema: ({image}) => z.object({
        title: z.string(),
        author: z.string().default('Ishan Joshi'),
        date: z.date(),
        emoji: z.string(),
        series: z.string().optional(),
        description: z.string(),
        tags: z.array(z.string()),
        color: z.string().optional(),
        bg: z.string().optional(),
        selection_color: z.string().optional(),
        selection_bg: z.string().optional(),
        selection_only: z.boolean().optional().default(true),
        category: z.string().optional(),
        audio: z.string().optional(),
        minutesRead: z.string().optional(),
        font: z.string().optional().default('serif'),
        img: image().refine((img) => img).optional(),
        full_img: z.boolean().optional().default(false),
        draft: z.boolean().optional().default(false),
        medium: z.string().optional(),
        substack: z.string().optional(),
        devto: z.string().optional(),
        hashnode: z.string().optional(),
    }),
});

export const collections = {
    blog: blogContent,
};