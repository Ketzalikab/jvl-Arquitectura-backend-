 
 import type { CollectionConfig } from 'payload';
 import { lexicalEditor } from '@payloadcms/richtext-lexical';
 
 const formatSlug = (val: string): string => {
   return val
     .toLowerCase()
     .normalize('NFD') // Separa los caracteres de sus acentos (ej. 'á' -> 'a' + '´')
     .replace(/[\u0300-\u036f]/g, '') // Elimina los acentos diacríticos
     .replace(/[^\w\-]+/g, '-') // Reemplaza caracteres no alfanuméricos (excepto guiones) con un guion
     .replace(/\s+/g, '-') // Reemplaza espacios con guiones
     .replace(/-+/g, '-') // Reemplaza múltiples guiones por uno solo
     .replace(/^-+/, '') // Elimina guiones del principio
     .replace(/-+$/, ''); // Elimina guiones del final
 }
 
 
 export const Team: CollectionConfig = {
   slug: 'team',
   labels: {
     singular: 'team',
     plural: 'team'
   },
   access: {
     read: () => true,
     create: () => true,
     update: () => true,
     delete: () => true,
   },

   
   admin: {
     useAsTitle: 'titulo',
     // La preview ahora usará el slug del documento, que se genera en el hook
     preview: (doc) => `${process.env.FRONT_URL}/arquitectura/proyectos/${doc.slug}`,
   },
   fields: [
 
    {
          name: 'titulo',
          type: 'text',
          label: 'Título',
           localized: true,
        },
 
             
            {
              name: 'imagen',
              type: 'upload',
              relationTo: 'media',
              label: 'Imagen',
            },
            {
              name: 'nombre',
              type: 'text',
              label: 'Nombre',
               localized: true,
            },
            {
              name: 'puesto',
              type: 'text',
              label: 'Puesto',
               localized: true,
            },
             
             {
              name: 'bioText',
             type: 'richText',

              localized: true,
              label:'Bio text',
           editor: lexicalEditor({
        admin: {
          placeholder: 'Text...',
        },
      }),
             },

          ],
        }