import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Text,
} from "@react-email/components";

interface LeadConfirmationEmailProps {
  name: string;
}

export function LeadConfirmationEmail({ name }: LeadConfirmationEmailProps) {
  const firstName = name.split(" ")[0];

  return (
    <Html>
      <Head />
      <Preview>Recebemos sua solicitação — Aureon Partners</Preview>
      <Body style={main}>
        <Container style={container}>
          <Text style={eyebrow}>AUREON PARTNERS</Text>
          <Heading style={heading}>Obrigado pelo seu contato, {firstName}.</Heading>
          <Text style={paragraph}>
            Recebemos sua solicitação e um de nossos consultores entrará em contato em até
            um dia útil para entender melhor seus objetivos e apresentar o próximo passo.
          </Text>
          <Hr style={hr} />
          <Text style={footer}>
            Aureon Partners — Gestão patrimonial institucional.
            <br />
            Esta é uma mensagem automática; não é necessário responder.
          </Text>
        </Container>
      </Body>
    </Html>
  );
}

export default LeadConfirmationEmail;

const main = { backgroundColor: "#0B0D10", fontFamily: "Helvetica, Arial, sans-serif" };
const container = { margin: "0 auto", padding: "40px 24px", maxWidth: "560px" };
const eyebrow = {
  color: "#B68A4E",
  fontSize: "12px",
  letterSpacing: "3px",
  fontWeight: 600,
  marginBottom: "24px",
};
const heading = { color: "#ECEAE3", fontSize: "24px", lineHeight: "1.3", fontWeight: 600 };
const paragraph = { color: "#8B8F97", fontSize: "15px", lineHeight: "1.6" };
const hr = { borderColor: "rgba(255,255,255,0.08)", margin: "32px 0" };
const footer = { color: "#5D6066", fontSize: "12px", lineHeight: "1.6" };
