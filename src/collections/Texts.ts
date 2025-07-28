import { CollectionConfig } from "payload";
import { lexicalEditor } from '@payloadcms/richtext-lexical';

export const Texts: CollectionConfig = {
  slug: 'textos', // Este es el 'slug' que usas en los campos de relación
  labels: {
    singular: 'Reusable Text',
    plural: 'Reusable Texts',
  },
  admin: {
    useAsTitle: 'internalName', // Usa el nombre interno como título en el panel de admin
    defaultColumns: ['internalName', 'updatedAt'],
    description: 'Fragmentos de texto que se pueden reutilizar en varias páginas.',
  },
  access: {
    read: () => true, // Permite que cualquiera lea estos textos
  },
  fields: [
    {
      name: 'internalName',
      type: 'text',
      label: 'Internal Name',
      required: true,
      admin: {
        description: 'Este nombre es solo para identificar el texto en el panel de administración (ej. "Biografía del Director", "Eslogan de la página de inicio"). No se muestra en la web.',
      },
    },
    {
      name: 'content',
      type: 'richText',
      label: 'Content',
      required: true,
      localized: true, // Permite que el contenido esté en inglés y español
      editor: lexicalEditor({
        admin: {
          placeholder: 'Escribe el contenido aquí...',
        },
      }),
    },
  ],
};
