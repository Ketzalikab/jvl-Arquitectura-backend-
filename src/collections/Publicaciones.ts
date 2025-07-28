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
    useAsTitle: 'titulo',
    preview: ({ slug }) => `${process.env.FRONT_URL}/noticias?seccion=${slug}`,
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
        readOnly: true,
        position: 'sidebar', // Queda mejor en la barra lateral
        description: 'Generado automáticamente a partir del título.',
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
          name: 'premio',
          label: 'Premios',
          type: 'array',
          labels: {
            singular: 'Premio',
            plural: 'Premios',
          },
          fields: [
            {
                name: 'imagenLogo',
                type: 'upload',
                relationTo: 'media',
                label: 'Logo Premio',
              },

            {
                name: 'imagen',
                type: 'upload',
                relationTo: 'media',
                label: 'Imagen',
              },
            {
                name: 'proyecto',
                type: 'richText',
                label: 'Proyecto',
                localized: true,
                 editor: lexicalEditor({
                 admin: {
                  placeholder: 'texto',
                    }
                 }),
              },
            {
          name: 'premioRelacionado',
          label: 'Premio Relacionado',
          type: 'array',
          labels: {
            singular: 'Premio Relacionado',
            plural: 'Premios Relacionados',
          },
          fields: [
            
            {
                name: 'imagen',
                type: 'upload',
                relationTo: 'media',
                label: 'Imagen',
              },
            {
                name: 'premioRelacionadoContenido',
                type: 'richText',
                label: 'Premio Relacionado Contenido',
                localized: true,
                 editor: lexicalEditor({
                  admin: {
                  placeholder: 'texto',
                    }
                   }),
              },
           
          ],
        },
      ]
    }
]
};

