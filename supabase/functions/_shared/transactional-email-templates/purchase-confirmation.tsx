import * as React from 'npm:react@18.3.1'
import {
  Body, Container, Head, Heading, Html, Preview, Text, Button, Hr, Section,
} from 'npm:@react-email/components@0.0.22'
import type { TemplateEntry } from './registry.ts'

const SITE_NAME = "Manuale dell'Idraulico Distratto"

interface PurchaseConfirmationProps {
  customerName?: string
  downloadUrl?: string
  bonusDownloadUrl?: string
  includesLifetime?: boolean
}

const PurchaseConfirmationEmail = ({
  customerName,
  downloadUrl,
  bonusDownloadUrl,
  includesLifetime,
}: PurchaseConfirmationProps) => (
  <Html lang="it" dir="ltr">
    <Head />
    <Preview>Il tuo ebook è pronto per il download!</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={h1}>
          🎉 {customerName ? `Grazie ${customerName}!` : 'Grazie per il tuo acquisto!'}
        </Heading>
        <Text style={text}>
          Il tuo ordine del <strong>{SITE_NAME}</strong> è confermato. Ecco i link per scaricare i tuoi contenuti:
        </Text>

        <Section style={buttonSection}>
          {downloadUrl ? (
            <Button style={primaryButton} href={downloadUrl}>
              📥 Scarica il Manuale (PDF)
            </Button>
          ) : (
            <Text style={text}>Il link di download sarà disponibile a breve.</Text>
          )}
        </Section>

        {bonusDownloadUrl && (
          <Section style={buttonSection}>
            <Button style={secondaryButton} href={bonusDownloadUrl}>
              🎁 Scarica il Bonus Checklist
            </Button>
          </Section>
        )}

        {includesLifetime && (
          <Text style={highlight}>
            ✅ Hai anche l'accesso Lifetime agli aggiornamenti futuri!
          </Text>
        )}

        <Hr style={hr} />

        <Text style={smallText}>
          ⏰ I link di download sono validi per 1 ora. Dopo la scadenza, visita la pagina di conferma ordine per generarne di nuovi.
        </Text>

        <Text style={smallText}>
          💡 Hai bisogno di aiuto? Rispondi a questa email o contattaci a info@idraulicodistratto.com
        </Text>

        <Text style={footer}>
          © {new Date().getFullYear()} {SITE_NAME}. Tutti i diritti riservati.
        </Text>
      </Container>
    </Body>
  </Html>
)

export const template = {
  component: PurchaseConfirmationEmail,
  subject: 'Il tuo ebook è pronto! 📥',
  displayName: 'Conferma acquisto con download',
  previewData: {
    customerName: 'Marco',
    downloadUrl: 'https://example.com/download/manuale.pdf',
    bonusDownloadUrl: 'https://example.com/download/bonus.pdf',
    includesLifetime: true,
  },
} satisfies TemplateEntry

// Styles
const main = { backgroundColor: '#ffffff', fontFamily: "'Inter', Arial, sans-serif" }
const container = { padding: '30px 25px', maxWidth: '560px', margin: '0 auto' }
const h1 = { fontSize: '24px', fontWeight: 'bold' as const, color: '#1a1a1a', margin: '0 0 20px', lineHeight: '1.3' }
const text = { fontSize: '15px', color: '#3d3d3d', lineHeight: '1.6', margin: '0 0 20px' }
const buttonSection = { textAlign: 'center' as const, margin: '10px 0 20px' }
const primaryButton = {
  backgroundColor: '#c27119',
  color: '#ffffff',
  fontSize: '16px',
  fontWeight: 'bold' as const,
  padding: '14px 28px',
  borderRadius: '10px',
  textDecoration: 'none',
  display: 'inline-block',
}
const secondaryButton = {
  backgroundColor: '#d4893a',
  color: '#ffffff',
  fontSize: '15px',
  fontWeight: 'bold' as const,
  padding: '12px 24px',
  borderRadius: '10px',
  textDecoration: 'none',
  display: 'inline-block',
}
const highlight = { fontSize: '15px', color: '#2d7d46', backgroundColor: '#f0fdf4', padding: '12px 16px', borderRadius: '8px', margin: '0 0 20px' }
const hr = { borderColor: '#e5e5e5', margin: '24px 0' }
const smallText = { fontSize: '13px', color: '#777777', lineHeight: '1.5', margin: '0 0 12px' }
const footer = { fontSize: '12px', color: '#999999', margin: '24px 0 0', textAlign: 'center' as const }
