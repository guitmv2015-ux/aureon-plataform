import path from "path";
import { fileURLToPath } from "url";
import { buildConfig } from "payload";
import { postgresAdapter } from "@payloadcms/db-postgres";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { seoPlugin } from "@payloadcms/plugin-seo";
import { uploadthingStorage } from "@payloadcms/storage-uploadthing";

import { Users } from "./collections/Users";
import { Media } from "./collections/Media";
import { Pages } from "./collections/Pages";
import { Posts } from "./collections/Posts";
import { SiteSettings } from "./globals/SiteSettings";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
  serverURL: process.env.NEXT_PUBLIC_APP_URL,
  secret: process.env.PAYLOAD_SECRET as string,

  admin: {
    user: Users.slug,
    meta: {
      titleSuffix: "— Aureon CMS",
    },
  },

  editor: lexicalEditor({}),

  collections: [Users, Media, Pages, Posts],
  globals: [SiteSettings],

  // Schema Postgres dedicado ao Payload — convive no mesmo banco do Prisma
  // ("public"), mas em namespace próprio, evitando colisão de tabelas entre
  // as duas ORMs (decisão documentada no README do projeto).
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL,
    },
    schemaName: "payload",
  }),

  // Upload de mídia do CMS via UploadThing (mesma stack do upload de
  // documentos do dashboard, reaproveitando a mesma conta/infra).
  plugins: [
    uploadthingStorage({
      collections: { media: true },
      options: {
        token: process.env.UPLOADTHING_TOKEN,
        acl: "public-read",
      },
    }),
    seoPlugin({
      collections: ["pages", "posts"],
      uploadsCollection: "media",
      generateTitle: ({ doc }) => `${doc?.title ?? "Aureon Partners"} | Aureon Partners`,
      generateDescription: ({ doc }) => doc?.excerpt ?? "",
    }),
  ],

  typescript: {
    outputFile: path.resolve(dirname, "../../payload.types.ts"),
  },

  graphQL: {
    disable: process.env.NODE_ENV === "production",
  },

  cors: [process.env.NEXT_PUBLIC_APP_URL as string].filter(Boolean),
  csrf: [process.env.NEXT_PUBLIC_APP_URL as string].filter(Boolean),
});
