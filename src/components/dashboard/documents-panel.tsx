"use client";

import { FileText } from "lucide-react";
import { toast } from "sonner";
import { UploadButton } from "@/lib/uploadthing";
import { formatDate } from "@/lib/utils";

interface DocumentItem {
  id: string;
  title: string;
  category: string;
  createdAt: Date | string;
  fileUrl: string;
}

export function DocumentsPanel({ documents }: { documents: DocumentItem[] }) {
  return (
    <div className="space-y-5">
      <UploadButton
        endpoint="clientDocument"
        onClientUploadComplete={() => {
          toast.success("Documento enviado com sucesso.");
          window.location.reload();
        }}
        onUploadError={(error: Error) => {
          toast.error(`Falha no upload: ${error.message}`);
        }}
        appearance={{
          button:
            "bg-brass text-ink text-sm font-medium px-5 h-11 rounded-sm hover:bg-brass-light transition-colors",
          allowedContent: "text-xs text-slate-dim mt-2",
        }}
      />

      {documents.length === 0 ? (
        <p className="text-sm text-slate">Nenhum documento enviado ainda.</p>
      ) : (
        <ul className="space-y-3">
          {documents.map((doc) => (
            <li key={doc.id} className="flex items-center justify-between border-b border-line pb-3">
              <a
                href={doc.fileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-sm text-ivory hover:text-brass"
              >
                <FileText className="h-4 w-4 text-brass" />
                {doc.title}
              </a>
              <span className="text-xs text-slate-dim">{formatDate(doc.createdAt)}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
