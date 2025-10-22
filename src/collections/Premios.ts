import type { CollectionConfig } from 'payload';
import { lexicalEditor } from '@payloadcms/richtext-lexical';



export const Premios: CollectionConfig = {
  slug: 'premios',
  labels: {
    singular: 'Award',
    plural: 'Awards'
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
      required: true, 
      localized: false,
    },

     {
              name: 'awardsText',
             type: 'richText',

              localized: true,
              label:'Awards text',
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
      required: true, 
      localized: true,
    },
   
      
            {
                name: 'imageLogo',
                type: 'upload',
                relationTo: 'media',
                label: 'Awards Image',
              },
           
            {
                name: 'month',
                type: 'text',
                label: 'Month',
                localized: true
        
              },

                {
                name: 'year',
                type: 'text',
                label: 'Year',
        
              },
             
              
          ],
        }
   