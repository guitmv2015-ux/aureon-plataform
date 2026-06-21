import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
}

/**
 * Cabeçalho de seção padronizado: eyebrow com o "ledger tick" (elemento de
 * assinatura visual) + título em display serif + descrição opcional.
 * Reaproveitado em toda página institucional para consistência tipográfica.
 */
export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className,
}: SectionHeadingProps) {
  return (
    <div className={cn("max-w-2xl", align === "center" && "mx-auto text-center", className)}>
      <span className="ledger-tick">{eyebrow}</span>
      <h2 className="mt-5 font-display text-display-md text-ivory md:text-display-lg">{title}</h2>
      {description ? <p className="mt-5 text-base leading-relaxed text-slate md:text-lg">{description}</p> : null}
    </div>
  );
}
