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


export const ProyectosArquitectura: CollectionConfig = {
  slug: 'proyectosArquitectura',
  labels: {
    singular: 'Architecture Project',
    plural: 'Architecture Projects'
  },
  access: {
    read: () => true,
    create: () => true,
    update: () => true,
    delete: () => true,
  },
  admin: {
    useAsTitle: 'titulo',

    preview: (doc, { locale}) => {
       const currentLocale = locale || 'es';
    
    
    const slug = doc.slug;

    return `${process.env.FRONT_URL}/${currentLocale}/projects/${slug}`;
  },
},
  fields: [
     {
          name: 'publico',
          type: 'checkbox',
          label: 'Público',
        },
    {
      name: 'titulo',
      type: 'text',
      label: 'Título',
      required: true, 
      
    },
    {
      name: 'slug',
      type: 'text',
      label: 'Slug',
      localized: false,
      admin: {
        
        position: 'sidebar', 
        description: 'El slug debe ser igual a la versión en ingles.',
      },
      hooks: {
        // 2. Usamos la nueva función dentro del hook
        beforeValidate: [ // Usamos beforeValidate para que el slug se genere antes de cualquier validación
          ({ data, originalDoc, operation }) => {
            // Genera el slug solo si el título ha cambiado o si es un documento nuevo
            if (data && (operation === 'create' || data.titulo !== originalDoc?.titulo)) {
              if (data?.titulo) {
                return formatSlug(data.titulo);
              }
            }
            // Si no, no hagas nada y conserva el slug existente
            return data?.slug;
          },
        ],
      }
    },

       
        {
          name: 'sketch_front',
          type: 'upload',
          relationTo: 'media',
          label: 'Sketch front ',
        },
         {
          name: 'sketch_back',
          type: 'upload',
          relationTo: 'media',
          label: 'Image back sketch section',
        },
        
        {
          name: 'cover_image_front',
          type: 'upload',
          relationTo: 'media',
          label:'Cover Image Front'
        },
         {
          name: 'cover_image_back',
          type: 'upload',
          relationTo: 'media',
          label:'Cover Image Back'
        },

        {
          name: 'location',
          type: 'richText',
           label: 'Location',
          localized: true,
           editor: lexicalEditor({
                  admin: {
                  placeholder: 'text',
                    }
                   }),
        },

        {
          name: 'year',
          type: 'number',
          label: 'Year',
        },

        {
          name: 'area',
          type: 'richText',
          label: 'Area',
          localized: true,
          editor: lexicalEditor({
                  admin: {
                  placeholder: 'text',
                    }
                   }),
          
        },


          {
         name: 'category',
  type: 'text',
  label: 'Category',
  localized: true,
          },

     {
              name: 'video',
              type: 'text',
            
              label: 'Youtube Video URL',
            }, 
      
       
        {
          name: 'GeneralesProyectoArquitectura',
          type: 'richText',
          label: 'Text about project',
          localized: true,
           editor: lexicalEditor({
                  admin: {
                  placeholder: 'text',
                    }
                   }),
        },
         {
          name: 'creditos',
          type: 'richText',
          label: 'Credits',
          required: false,
          localized: true,
          editor: lexicalEditor({
                  admin: {
                  placeholder: 'text',
                    }
                   }),
          
        },
        {
          name: 'imagenes',
          type: 'array',
          label: 'Images',
         
          fields: [
            {
              name: 'imagen',
              type: 'upload',
              relationTo: 'media',
              label: 'Image',
            },
          ],
        },
        {
          name: 'imagenesPlanos',
          type: 'array',
          label: 'Planos-Imagen',
         
          fields: [
            {
              name: 'imagenPlano',
              type: 'upload',
              relationTo: 'media',
              label: 'Image',
              localized: true,
            },
          ],
        },
      ]
    }