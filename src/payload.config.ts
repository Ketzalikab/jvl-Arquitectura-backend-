// storage-adapter-import-placeholder
import { mongooseAdapter } from '@payloadcms/db-mongodb'

import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Home } from './collections/Home'
import { ProyectosArquitectura } from './collections/ProyectosArquitectura'
import { Team } from './collections/Team'
import { News } from './collections/News'

import { Premios } from './collections/Premios'
import { Publicaciones } from './collections/Publicaciones'


import { Pages } from './collections/Pages'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  serverURL: process.env.PAYLOAD_PUBLIC_SERVER_URL ||  'https://jvlarquitectos.com',
  
  cors:[
    process.env.FRONT_URL || '',
    'http://localhost:3001',
      'http://localhost:3000',
    'https://jvlarquitectos.com'
  ],

  
  graphQL: {
    disable: false,
    disablePlaygroundInProduction: false,
    
    
},
routes: {
    admin: '/admin',
    api: '/api',
    graphQL: '/api/graphql'
  },

  admin: {
    user: 'users',
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },

  localization: {
    locales: [
      {
        label: 'Español',
        code: 'es',
      },
      {
        label: 'English',
        code: 'en',
      }
    ],
    defaultLocale: 'es', // Tu idioma por defecto
    fallback: true, // Si una traducción no existe en 'en', usará la de 'es'
  },
  
  collections: [Users, 
    Media,
    Home,
    ProyectosArquitectura,
    Team,
    News, 

    Premios,
    Publicaciones, 

    Pages
  ],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: mongooseAdapter({
    url: process.env.DATABASE_URI || '',
  }),
  sharp,
  plugins: [
    //payloadCloudPlugin(),
    // storage-adapter-placeholder
  ],
})
