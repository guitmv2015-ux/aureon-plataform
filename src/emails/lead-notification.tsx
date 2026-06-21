import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Section,
  Text,
} from "@react-email/components";

interface LeadNotificationEmailProps {
  name: string;
  email: string;
  phone?: string | null;
  company?: string | null;
  message?: string | null;
  source: string;
}

export function LeadNotificationEmail({
  name,
  email,
  phone,
  company,
  message,
  source,
}: LeadNotificationEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>Novo lead recebido: {name}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Text style={eyebrow}>NOVO LEAD · {source}</Text>
          <Heading style={heading}>{name}</Heading>
          <Section style={card}>
            <Text style={row}><strong>E-mail:</strong> {email}</Text>
            {phone ? <Text style={row}><strong>Telefone:</strong> {phone}</Text> : null}
            {company ? <Text style={row}><strong>Empresa:</strong> {company}</Text> : null}
          </Section>
          {message ? (
            <>
              <Hr style={hr} />
              <Text style={paragraph}>{message}</Text>
            </>
          ) : null}
        </Container>
      </Body>
    </Html>
  );
}

export default LeadNotificationEmail;

const main = { backgroundColor: "#0B0D10", fontFamily: "Helvetica, Arial, sans-serif" };
const container = { margin: "0 auto", padding: "40px 24px", maxWidth: "560px" };
const eyebrow = { color: "#B68A4E", fontSize: "12px", letterSpacing: "3px", fontWeight: 600, marginBottom: "16px" };
const heading = { color: "#ECEAE3", fontSize: "22px", fontWeight: 600, marginBottom: "20px" };
const card = { backgroundColor: "#171B21", borderRadius: "8px", padding: "20px" };
const row = { color: "#ECEAE3", fontSize: "14px", margin: "4px 0" };
const hr = { borderColor: "rgba(255,255,255,0.08)", margin: "24px 0" };
const paragraph = { color: "#8B8F97", fontSize: "14px", lineHeight: "1.6" };
