import type { CollectionConfig } from 'payload';
import { lexicalEditor } from '@payloadcms/richtext-lexical';


export const News: CollectionConfig = {
  slug: 'news',
  labels: {
    singular: 'news',
    plural: 'news'
  },
  access: {
       read: () => true,
    create: () => true,
    update: () => true,
    delete: () => true,
  },
  
 admin: {
    useAsTitle: 'title',
 
  },
  fields: [
     {
          name: 'publico',
          type: 'checkbox',
          label: 'Público',
        },
    {
      name: 'title',
      type: 'text',
      label: 'Title',
      required: true, // Es buena práctica que el título sea requerido si el slug depende de él
      localized: true,
    },
       {
              name: 'newsText',
             type: 'richText',

              localized: true,
              label:'News text',
           editor: lexicalEditor({
        admin: {
          placeholder: 'Text...',
        },
           }),
          },
    

      {
      name: 'source',
      type: 'text',
      label: 'Source',
      required: true, // Es buena práctica que el título sea requerido si el slug depende de él
      localized: true,
    },
   
      
            {
                name: 'imageLogo',
                type: 'upload',
                relationTo: 'media',
                label: 'News Image',
              },
           
            {
                name: 'month',
                type: 'text',
                label: 'Month',
        
              },

                {
                name: 'year',
                type: 'text',
                label: 'Year',
        
              },
             
              
          ],
        }
   