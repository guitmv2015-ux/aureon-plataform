import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Text,
} from "@react-email/components";

interface WelcomeEmailProps {
  name: string;
  dashboardUrl: string;
}

export function WelcomeEmail({ name, dashboardUrl }: WelcomeEmailProps) {
  const firstName = name.split(" ")[0];
  return (
    <Html>
      <Head />
      <Preview>Bem-vindo à Aureon Partners</Preview>
      <Body style={main}>
        <Container style={container}>
          <Text style={eyebrow}>AUREON PARTNERS</Text>
          <Heading style={heading}>Bem-vindo, {firstName}.</Heading>
          <Text style={paragraph}>
            Sua conta foi criada com sucesso. A partir de agora você tem acesso à sua área
            do cliente, com relatórios, documentos e o acompanhamento da sua carteira.
          </Text>
          <Button href={dashboardUrl} style={button}>
            Acessar minha área
          </Button>
          <Hr style={hr} />
          <Text style={footer}>Aureon Partners — Gestão patrimonial institucional.</Text>
        </Container>
      </Body>
    </Html>
  );
}

export default WelcomeEmail;

const main = { backgroundColor: "#0B0D10", fontFamily: "Helvetica, Arial, sans-serif" };
const container = { margin: "0 auto", padding: "40px 24px", maxWidth: "560px" };
const eyebrow = { color: "#B68A4E", fontSize: "12px", letterSpacing: "3px", fontWeight: 600, marginBottom: "24px" };
const heading = { color: "#ECEAE3", fontSize: "24px", fontWeight: 600 };
const paragraph = { color: "#8B8F97", fontSize: "15px", lineHeight: "1.6" };
const button = {
  backgroundColor: "#B68A4E",
  borderRadius: "6px",
  color: "#0B0D10",
  fontSize: "14px",
  fontWeight: 600,
  textDecoration: "none",
  textAlign: "center" as const,
  display: "block",
  padding: "14px 24px",
  marginTop: "24px",
};
const hr = { borderColor: "rgba(255,255,255,0.08)", margin: "32px 0" };
const footer = { color: "#5D6066", fontSize: "12px" };
