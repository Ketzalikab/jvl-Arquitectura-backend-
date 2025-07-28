import type { CollectionBeforeChangeHook, CollectionConfig } from 'payload'
import { v4 as uuidv4 } from 'uuid'
import fs from 'fs'
import path from 'path';


const cleanFilename = (filename: string, titulo?: string): string => {
  const ext = path.extname(filename).toLowerCase();
  
 
    const cleanTitle = (titulo ?? '')
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^\w\-]/g, '-')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-+/, '')
      .replace(/-+$/, '')
      .substring(0, 100);
    
    return `${cleanTitle || uuidv4()}${ext}`;
  }
  
 // --- EL HOOK DEFINITIVO CON LAS PROPIEDADES CORRECTAS ---
const saveAndRenameFile: CollectionBeforeChangeHook = ({ req, data }) => {
  // Solo actuamos si hay un archivo y un título
  if (req.file && data.titulo) {
    // 1. Obtenemos los datos de las propiedades que descubrimos
    const originalFilename = req.file.name; // <-- La propiedad correcta es .name
    const fileBuffer = req.file.data;     // <-- La propiedad correcta es .data

    // 2. Generamos el nuevo nombre del archivo
    const newFilename = cleanFilename(originalFilename, data.titulo);
    
    // 3. Construimos la ruta de destino final
    const staticDir = path.resolve(process.cwd(), 'media');
    const newPath = path.join(staticDir, newFilename);

    try {
      // 4. Escribimos el buffer (req.file.data) en el disco en su ruta final
      fs.writeFileSync(newPath, fileBuffer);
    } catch (e) {
      console.error('Error al escribir el archivo:', e);
      return data; // En caso de error, devolvemos data sin modificar
    }
    
    // 5. Devolvemos los datos actualizados para que se guarden en la base de datos
    return {
      ...data,
      filename: newFilename,
    };
  }

  return data;
}


// --- TU COLECCIÓN ADAPTADA ---
export const Media: CollectionConfig = {
  slug: 'media',
  access: {
    read: () => true,
    create: () => true,
    update: () => true,
    delete: () => true,
  },
  
 hooks: {
    beforeChange: [saveAndRenameFile],
  },

  upload: {
    staticDir: 'media',
 
    // (Opcional pero recomendado) Evita que Payload guarde el archivo con su nombre temporal original
   
  },
  
  fields: [
    {
      name: 'titulo',
      type: 'text',
      required: true,
      admin: {
        description: 'El nombre del archivo se generará a partir de este título.',
      }
    },
  
  ],
    
  }
