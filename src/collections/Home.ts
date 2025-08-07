import type { CollectionConfig } from 'payload';

export const Home: CollectionConfig = {
  slug: 'home',
  labels: {
    singular: 'Home',
    plural: 'Home'
  },
  access: {
     read: () => true,
    create: () => true,
    update: () => true,
    delete: () => true,
  },
  
  admin: {
   
  },
  
  fields: [
    {
              name: 'video',
              type: 'text',
            
              label: 'Youtube Video URL',
            }, 
      
   
  ],
};