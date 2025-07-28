import type { CollectionConfig } from 'payload';

export const Home: CollectionConfig = {
  slug: 'home',
  labels: {
    singular: 'Home',
    plural: 'Home'
  },
  access: {
     read: () => true,
    create: () => true,
    update: () => true,
    delete: () => true,
  },
  
  admin: {
    useAsTitle: 'titulo',
    // Cambiar el formato de los parámetros
    preview: (doc) => {
      // Si doc es un objeto con una propiedad doc, usamos esa (para versiones más nuevas)
      const document = doc.doc || doc;
      
      // Siempre redirigir a la raíz para la colección Home
      return `${process.env.FRONT_URL}/`;
    },
  },
  
  fields: [
    {
      name: 'titulo',
      type: 'text',
      label: "Titulo",
      localized: true,
    },
    {
      name: 'slug',
      type: 'text',
      label: 'Slug',
    
      admin: {
        readOnly: true,
      },
      access: {
        read: () => true,
        update: () => false,
      },
      hooks: {
        beforeChange: [
          ({ data }) => {
            if (data?.titulo) {
              return data.titulo
                .toLowerCase()
                .replace(/\s+/g, '-')
                .replace(/[^\w-]+/g, '')
                .replace(/--+/g, '-')
                
            }
            return '';
          },
        ],
      },
    },
    {
      name: 'sections',
      type: 'array',
      admin: {
        description: 'Agrega 5 secciones con título e imagen',
      },
      fields: [
        {
          name: 'sectionTitle',
          type: 'text',
          required: true,
          localized: true,
          admin: {
            description: 'Título de la sección',
          }
        },
         {
        name: 'sectionSlug',
        type: 'text',
        required: true,
        label: 'Slug de la Sección (ej. arquitectura)',
        admin: {
          description: 'Esta parte de la URL no cambia entre idiomas.',
        }
      }, 
        {
          name: 'publico',
          type: 'checkbox',
          label: 'Público' 
        },
        {
          name: 'sectionImage',
          type: 'upload',
          relationTo: 'media',
          required: true,
          admin: {
            description: 'Imagen para esta sección',
          },
        },
      ],
    },
  ],
};