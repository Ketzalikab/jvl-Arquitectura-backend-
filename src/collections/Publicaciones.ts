import type { CollectionConfig } from 'payload';
import { lexicalEditor } from '@payloadcms/richtext-lexical';



export const Publicaciones: CollectionConfig = {
  slug: 'publicaciones',
  labels: {
    singular: 'Publication',
    plural: 'Publications'
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
              name: 'publicationText',
             type: 'richText',

              localized: true,
              label:'Publication text',
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
                label: 'Publications Image',
              },
           
            {
                name: 'month',
                type: 'text',
                label: 'Month',
                localized: true,
        
              },

                {
                name: 'year',
                type: 'text',
                label: 'Year',
        
              },
             
              
          ],
        }
   