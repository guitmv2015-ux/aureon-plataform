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

interface PasswordResetEmailProps {
  resetUrl: string;
}

export function PasswordResetEmail({ resetUrl }: PasswordResetEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>Redefina sua senha — Aureon Partners</Preview>
      <Body style={main}>
        <Container style={container}>
          <Text style={eyebrow}>AUREON PARTNERS</Text>
          <Heading style={heading}>Redefinição de senha</Heading>
          <Text style={paragraph}>
            Recebemos uma solicitação para redefinir a senha da sua conta. Se não foi você,
            ignore este e-mail com segurança — sua senha permanecerá inalterada.
          </Text>
          <Button href={resetUrl} style={button}>
            Criar nova senha
          </Button>
          <Hr style={hr} />
          <Text style={footer}>Este link expira em 1 hora por motivos de segurança.</Text>
        </Container>
      </Body>
    </Html>
  );
}

export default PasswordResetEmail;

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
