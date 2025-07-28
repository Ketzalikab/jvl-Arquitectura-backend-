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
    // La preview ahora usará el slug del documento, que se genera en el hook
    preview: (doc) => `${process.env.FRONT_URL}/arquitectura/proyectos/${doc.slug}`,
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
      required: true, // Es buena práctica que el título sea requerido si el slug depende de él
      localized: true,
    },
    {
      name: 'slug',
      type: 'text',
      label: 'Slug',
      localized: true,
      admin: {
        
        position: 'sidebar', // Queda mejor en la barra lateral
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
          name: 'imagen-portada',
          type: 'upload',
          relationTo: 'media',
          label: 'cover-Image',
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
          editor: lexicalEditor({
                  admin: {
                  placeholder: 'text',
                    }
                   }),
          
        },


          {
         name: 'category',
  type: 'select',

  label: 'Category', 
  options: [
    {
      // El 'label' es ahora un objeto con las traducciones
      label: {
        es: 'Residencial',
        en: 'Residential',
      },
      value: 'residencial',
    },
    {
      label: {
        es: 'Multi-familiar',
        en: 'Multi-familiar',
      },
      value: 'multi-familiar',
    },
    {
      label: {
        es: 'Corporativo',
        en: 'Corporate',
      },
      value: 'corporativo',
    },

    {
      label: {
        es: 'Resort',
        en: 'Resort',
      },
      value: 'resort',
    },
    
    {
      label: {
        es: 'Proyectos Especiales',
        en: 'Special Projects',
      },
      value: 'proyectos-especiales', 
    }
  ]
},
     {
              name: 'video',
              type: 'upload',
              relationTo: 'media',
              label: 'video',
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
      ]
    }