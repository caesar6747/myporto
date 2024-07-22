import { z, defineCollection } from 'astro:content';

const portoCollection = defineCollection({
    type: 'data', // Astro v2.5.0 and later
    schema: z.object({
        title: z.string(),
        name: z.string(),
        identity: z.string(),
        portofolio: z.array(z.object({
            project_name: z.string(),
            project_image: z.string(),
            duration: z.string(),
            description: z.string()
        })),
        current_project: z.array(z.object({
            project_name: z.string(),
            project_image: z.string(),
            started_from: z.string(),
            description: z.string()
        }))
    }),
}); 


export const collections = {
  'portofolio': portoCollection,
};