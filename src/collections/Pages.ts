import { CollectionConfig } from "payload";
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


export const Pages: CollectionConfig = {
  slug: 'pages',
   admin: {
    useAsTitle: 'title',
    // La preview ahora usará el slug del documento, que se genera en el hook
    preview: (doc, { locale}) => {
       const currentLocale = locale || 'es';
    
    // El slug ya debería ser el correcto para el idioma que estás editando.
    const slug = doc.slug;

    return `${process.env.FRONT_URL}/${currentLocale}/${slug}`;
  },
},
access: {
    read: () => true,
},

    
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
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
            if (data && (operation === 'create' || data.title !== originalDoc?.title)) {
              if (data?.title) {
                return formatSlug(data.title);
              }
            }
            // Si no, no hagas nada y conserva el slug existente
            return data?.slug;
          },
        ],
      }
    },

    {
      name: 'layout',
      type: 'blocks',
      required: true,
      blocks: [
        {
          slug: 'heroBlock',
          labels: { singular: 'Hero', plural: 'Heros' },
          fields: [
            {
              name: 'headerText',
              type: 'richText',
              localized: true,
           editor: lexicalEditor({
        admin: {
          placeholder: 'Text...',
        },
      }),
    },

            {
              name: 'backgroundImage',
              type: 'upload',
              relationTo: 'media',
              required: true,
            },
          ],
        },
        {
          slug: 'smartAcronym',
          labels: {
            singular: 'SMART Acronym',
            plural: 'SMART Acronyms',
          },
          fields: [
            {
              name: 'acronymText',
              type: 'richText',
              localized: true,
           editor: lexicalEditor({
        admin: {
          placeholder: 'Text...',
        },
      }),
    },
            {
              name: 'letters',
              type: 'array',
              fields: [
                {
                  name: 'letter',
                  type: 'text',
                  localized: true,
                  maxLength: 1,
                  required: true,
                },
                {
                  name: 'hoverWord',
                  type: 'text',
                  localized: true,
                  required: true,
                },
              ],
            },
          ],
        },
        {
          slug: 'directorBio',
          labels: {
            singular: 'Director Bio',
            plural: 'Director Bios',
          },
          fields: [
            {
              name: 'directorName',
              type: 'richText',
              localized: true,
           editor: lexicalEditor({
        admin: {
          placeholder: 'Text...',
        },
      }),
    },
            {
              name: 'directorImage',
              type: 'upload',
              relationTo: 'media',
              required: true,
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
        },

         {
          slug: 'teamGrid',
          labels: {
            singular: 'Team Grid',
            plural: 'Team Grids',
          },
          fields: [
            {
              name: 'title',
              type: 'text',
              localized: true,
              defaultValue: 'Our Team',
            },
            {
              name: 'teamMembers',
              type: 'relationship',
              relationTo: 'team',
              hasMany: true, // Te permite seleccionar qué miembros mostrar
            },
          ],
        },

        // Bloque para la lista de proyectos
         {
          slug: 'projectList',
          labels: {
            singular: 'Project List',
            plural: 'Project Lists',
          },
          fields: [
            {
              name: 'title',
              type: 'text',
              localized: true,
              defaultValue: 'Projects',
            },
            {
              name: 'projects',
              type: 'relationship',
              relationTo: 'proyectosArquitectura', // Relación a tu colección de proyectos
              hasMany: true, // Te permite seleccionar qué proyectos mostrar
            },
          ],
        },
    

        // Bloque para noticias y publicaciones
        {
        
  slug: 'newsAndPublications',
  labels: {
    singular: 'News & Publications',
    plural: 'News & Publications',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      localized: true,
      defaultValue: 'News & Publications',
    },
    {
      name: 'featuredAwards',
      type: 'relationship',
      relationTo: 'premios', // Asumiendo que tu colección de premios se llama 'awards'
      hasMany: true,
      label: 'Featured Awards',
    },
    {
      name: 'featuredNews',
      type: 'relationship',
      relationTo: 'news', // Asumiendo que tu colección de noticias se llama 'news'
      hasMany: true,
      label: 'Featured News',
    },
    {
      name: 'featuredPublications',
      type: 'relationship',
      relationTo: 'publicaciones', // Asumiendo que tu colección de publicaciones se llama 'publications'
      hasMany: true,
      label: 'Featured Publications',
    },
  ],
},
    {
  slug: 'contactInfoBlock',
  labels: {
    singular: 'Contact Information',
    plural: 'Contact Information Blocks',
  },
  fields: [
    {
      name: 'email',
      type: 'email',
      label: 'Email Address',
    },
    {
      name: 'instagram',
      type: 'richText', // Usamos richText para que puedas añadir un enlace
      label: 'Instagram',
      editor: lexicalEditor({}),
    },
    {
      name: 'youTube',
      type: 'richText', // Lo mismo para YouTube
      label: 'YouTube',
      editor: lexicalEditor({}),
    },
    {
      name: 'cabo',
      type: 'richText', // richText para la dirección, permite saltos de línea y formato
      label: 'Cabo San Lucas Address',
      editor: lexicalEditor({}),
    },
  ],
}

      ]
    }
  ],
};