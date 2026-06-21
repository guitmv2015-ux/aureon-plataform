import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Iniciando seed do banco de dados...");

  const adminEmail = "admin@aureonpartners.pro";
  const adminPasswordHash = await bcrypt.hash("MudeEstaSenha123!", 12);

  const admin = await prisma.user.upsert({
    where: { email: adminEmail },
    update: {},
    create: {
      name: "Administrador Aureon",
      email: adminEmail,
      passwordHash: adminPasswordHash,
      role: "ADMIN",
    },
  });
  console.log(`✔ Usuário admin criado/atualizado: ${admin.email}`);

  const advisorEmail = "consultor@aureonpartners.pro";
  const advisor = await prisma.user.upsert({
    where: { email: advisorEmail },
    update: {},
    create: {
      name: "Consultora Aureon",
      email: advisorEmail,
      passwordHash: await bcrypt.hash("MudeEstaSenha123!", 12),
      role: "ADVISOR",
    },
  });
  console.log(`✔ Usuário consultor criado/atualizado: ${advisor.email}`);

  const sampleLeads = [
    {
      name: "Marina Costa",
      email: "marina.costa@example.com",
      company: "Costa Empreendimentos",
      message: "Interessada em estruturação sucessória para holding familiar.",
      status: "QUALIFIED" as const,
    },
    {
      name: "Ricardo Almeida",
      email: "ricardo.almeida@example.com",
      message: "Busca segunda opinião sobre carteira atual de renda fixa.",
      status: "NEW" as const,
    },
    {
      name: "Fernanda Lima",
      email: "fernanda.lima@example.com",
      company: "Lima Family Office",
      message: "Avaliação de oportunidades em private equity.",
      status: "PROPOSAL" as const,
    },
  ];

  for (const lead of sampleLeads) {
    const existing = await prisma.lead.findFirst({ where: { email: lead.email } });
    if (!existing) {
      await prisma.lead.create({ data: lead });
    }
  }
  console.log(`✔ ${sampleLeads.length} leads de exemplo criados.`);

  console.log("✅ Seed concluído com sucesso.");
  console.log("\nCredenciais de acesso (ALTERE IMEDIATAMENTE em produção):");
  console.log(`  Admin:     ${adminEmail} / MudeEstaSenha123!`);
  console.log(`  Consultor: ${advisorEmail} / MudeEstaSenha123!`);
}

main()
  .catch((error) => {
    console.error("❌ Erro ao executar o seed:", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
