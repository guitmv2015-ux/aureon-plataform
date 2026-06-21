import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

const f = createUploadthing();

/**
 * File Router do UploadThing — usado pela área do cliente para upload de
 * documentos (contratos, KYC, extratos). Cada upload é vinculado ao usuário
 * autenticado via `onUploadComplete`, e o middleware impede uploads sem sessão.
 */
export const ourFileRouter = {
  clientDocument: f({
    pdf: { maxFileSize: "16MB", maxFileCount: 1 },
    image: { maxFileSize: "8MB", maxFileCount: 1 },
  })
    .middleware(async () => {
      const session = await auth();
      if (!session?.user) throw new UploadThingError("Não autenticado.");
      return { userId: session.user.id };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      await prisma.clientDocument.create({
        data: {
          userId: metadata.userId,
          title: file.name,
          fileUrl: file.url,
          fileKey: file.key,
          fileSize: file.size,
          mimeType: file.type,
          category: "OTHER",
        },
      });
      return { uploadedBy: metadata.userId };
    }),

  avatarImage: f({ image: { maxFileSize: "4MB", maxFileCount: 1 } })
    .middleware(async () => {
      const session = await auth();
      if (!session?.user) throw new UploadThingError("Não autenticado.");
      return { userId: session.user.id };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      await prisma.user.update({
        where: { id: metadata.userId },
        data: { image: file.url },
      });
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
