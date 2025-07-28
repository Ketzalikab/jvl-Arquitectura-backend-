// storage-adapter-import-placeholder
import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { payloadCloudPlugin } from '@payloadcms/payload-cloud'
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
import { Contact } from './collections/Contact'
import { Premios } from './collections/Premios'
import { Publicaciones } from './collections/Publicaciones'

import { Texts } from './collections/Texts'
import { Pages } from './collections/Pages'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  serverURL: process.env.SERVER_URL,  
  cors:[
    process.env.FRONT_URL || '',
    'http://localhost:3001',
    'http://104.248.8.26'
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
 

  graphQL: {
    disable: false,
    disablePlaygroundInProduction: false,
     onError: (error) => {
      console.error('GraphQL Error:', error);
    }
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
    Contact,
    Premios,
    Publicaciones, 
    Texts, 
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
