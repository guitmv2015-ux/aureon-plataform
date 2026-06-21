import { redirect } from "next/navigation";
import Link from "next/link";
import { FileText, Image as ImageIcon, Settings2 } from "lucide-react";
import { auth } from "@/lib/auth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const SHORTCUTS = [
  { label: "Páginas institucionais", href: "/admin/collections/pages", icon: FileText },
  { label: "Artigos (Insights)", href: "/admin/collections/posts", icon: FileText },
  { label: "Mídia", href: "/admin/collections/media", icon: ImageIcon },
  { label: "Configurações do site", href: "/admin/globals/site-settings", icon: Settings2 },
];

export default async function ContentPage() {
  const session = await auth();
  if (session?.user.role !== "ADMIN") {
    redirect("/dashboard");
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl text-ivory">Conteúdo institucional</h1>
        <p className="mt-1 text-sm text-slate">
          O conteúdo do site é gerenciado pelo CMS (Payload), em uma área dedicada.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        {SHORTCUTS.map((shortcut) => (
          <Card key={shortcut.href}>
            <CardHeader className="flex flex-row items-center gap-3">
              <shortcut.icon className="h-5 w-5 text-brass" />
              <CardTitle className="text-base">{shortcut.label}</CardTitle>
            </CardHeader>
            <CardContent>
              <Button variant="outline" asChild>
                <Link href={shortcut.href} target="_blank">
                  Abrir no CMS
                </Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
