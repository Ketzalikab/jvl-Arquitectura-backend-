import { CollectionConfig } from "payload";
import { lexicalEditor } from '@payloadcms/richtext-lexical';

export const Pages: CollectionConfig = {
  slug: 'pages',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'updatedAt'],
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
      required: true,
      unique: true,
      index: true,
      admin: {
        position: 'sidebar',
      },
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
              type: 'text',
              localized: true,
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
              name: 'letters',
              type: 'array',
              fields: [
                {
                  name: 'letter',
                  type: 'text',
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
              name: 'directorImage',
              type: 'upload',
              relationTo: 'media',
              required: true,
            },
            {
              name: 'director',
              type: 'relationship',
              relationTo: 'team', // Asumiendo que tu colección de equipo se llama 'team'
              hasMany: false,
            },
            {
              name: 'bioText',
              type: 'relationship',
              relationTo: 'textos', // Asumiendo que tu colección de textos se llama 'textos'
              hasMany: false,
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
}
      ]
    }
  ],
};