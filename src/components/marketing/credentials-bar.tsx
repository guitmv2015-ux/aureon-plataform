const CREDENTIALS = [
  "Conformidade CVM",
  "Custódia Segregada",
  "Signatário PRI",
  "Auditoria Independente",
  "Compliance ISO 27001",
];

/**
 * Barra de credenciais institucionais — preferida a logos de "clientes",
 * que implicariam parcerias/empresas reais sem comprovação. Comunica
 * confiabilidade através de atributos de governança, não de associação.
 */
export function CredentialsBar() {
  return (
    <div className="border-y border-line bg-panel py-6">
      <div className="container flex flex-wrap items-center justify-center gap-x-12 gap-y-3">
        {CREDENTIALS.map((item) => (
          <span key={item} className="text-xs font-medium uppercase tracking-[0.18em] text-slate-dim">
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
