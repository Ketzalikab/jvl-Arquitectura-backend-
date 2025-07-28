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
    singular: 'Proyecto Arquitectura',
    plural: 'Proyectos Arquitectura'
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
        description: 'El slug debe ser igual a la versión en español.',
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
         name: 'tipologia',
  type: 'select',
  // localized: false (o se omite), ¡el valor guardado no cambia!
  label: 'Tipología', // Puedes localizar la etiqueta principal del campo si lo deseas
  options: [
    {
      // El 'label' es ahora un objeto con las traducciones
      label: {
        es: 'Residencial',
        en: 'Residential',
      },
      value: 'residencial', // El valor es el mismo para todos los idiomas
    },
    {
      label: {
        es: 'Desarrollos Residenciales',
        en: 'Residential Developments',
      },
      value: 'desarrollos-residenciales',
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
      value: 'proyectos-especiales', // Es buena práctica usar slugs en los values
    }
  ]
},
         
      
      
        {
          name: 'imagen',
          type: 'upload',
          relationTo: 'media',
          label: 'Imagen',
        },
       
        {
          name: 'GeneralesProyectoArquitectura',
          type: 'richText',
          label: 'Generales proyecto',
          localized: true,
           editor: lexicalEditor({
                  admin: {
                  placeholder: 'texto',
                    }
                   }),
        },
        {
          name: 'imagenCarrusel',
          type: 'array',
          label: 'Imagenes Carrusel',
          fields: [
            {
              name: 'imagen',
              type: 'upload',
              relationTo: 'media',
              label: 'Imagen',
            },
          ],
        },
        {
          name: 'ContenidoProyectoArquitectura',
          type: 'richText',
          label: 'Contenidos de proyecto',
          localized: true,
           editor: lexicalEditor({
                  admin: {
                  placeholder: 'texto',
                    }
                   }),
        },
        {
          name: 'imagenCarruselPlano',
          type: 'array',
          label: 'Imagenes Carrusel Plano',
          fields: [
            {
              name: 'imagen',
              type: 'upload',
              relationTo: 'media',
              label: 'Imagen',
            },
          ],
        },
      ],
    };

 