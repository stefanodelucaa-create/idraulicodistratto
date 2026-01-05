import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-3xl mx-auto px-5 md:px-10 py-10 md:py-16">
        {/* Back Link */}
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Torna alla Home</span>
        </Link>

        <h1 className="font-bold text-3xl md:text-4xl text-foreground mb-8">
          Privacy Policy
        </h1>

        <div className="prose prose-lg max-w-none text-muted-foreground space-y-6">
          <p className="text-sm text-muted-foreground/70">
            Ultimo aggiornamento: {new Date().toLocaleDateString('it-IT')}
          </p>

          <section>
            <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">1. Titolare del Trattamento</h2>
            <p>
              Il titolare del trattamento dei dati personali è Manuale dell'Idraulico Distratto. 
              Per qualsiasi informazione relativa al trattamento dei tuoi dati personali, puoi contattarci 
              all'indirizzo email: <a href="mailto:info@idraulicodistratto.com" className="text-primary hover:underline">info@idraulicodistratto.com</a>
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">2. Dati Raccolti</h2>
            <p>Raccogliamo i seguenti tipi di dati personali:</p>
            <ul className="list-disc pl-6 space-y-2 mt-3">
              <li><strong>Dati identificativi:</strong> nome, cognome, indirizzo email</li>
              <li><strong>Dati di pagamento:</strong> elaborati in modo sicuro tramite Shopify Payments</li>
              <li><strong>Dati di navigazione:</strong> indirizzo IP, tipo di browser, pagine visitate</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">3. Finalità del Trattamento</h2>
            <p>I tuoi dati personali vengono trattati per le seguenti finalità:</p>
            <ul className="list-disc pl-6 space-y-2 mt-3">
              <li>Elaborazione degli ordini e consegna dei prodotti digitali</li>
              <li>Invio di comunicazioni relative all'ordine</li>
              <li>Assistenza clienti</li>
              <li>Adempimento degli obblighi di legge</li>
              <li>Con il tuo consenso, invio di comunicazioni promozionali</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">4. Base Giuridica</h2>
            <p>
              Il trattamento dei tuoi dati è basato sull'esecuzione del contratto di acquisto, 
              sull'adempimento di obblighi legali, sul nostro legittimo interesse e, ove applicabile, 
              sul tuo consenso esplicito.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">5. Conservazione dei Dati</h2>
            <p>
              I tuoi dati personali saranno conservati per il tempo necessario alle finalità per cui 
              sono stati raccolti e comunque non oltre i termini previsti dalla legge.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">6. Condivisione dei Dati</h2>
            <p>I tuoi dati possono essere condivisi con:</p>
            <ul className="list-disc pl-6 space-y-2 mt-3">
              <li><strong>Shopify:</strong> per l'elaborazione dei pagamenti e la gestione degli ordini</li>
              <li><strong>Fornitori di servizi email:</strong> per l'invio delle comunicazioni</li>
              <li><strong>Autorità competenti:</strong> quando richiesto dalla legge</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">7. I Tuoi Diritti</h2>
            <p>Ai sensi del GDPR, hai diritto di:</p>
            <ul className="list-disc pl-6 space-y-2 mt-3">
              <li>Accedere ai tuoi dati personali</li>
              <li>Rettificare dati inesatti</li>
              <li>Richiedere la cancellazione dei tuoi dati</li>
              <li>Limitare il trattamento</li>
              <li>Opporti al trattamento</li>
              <li>Richiedere la portabilità dei dati</li>
              <li>Revocare il consenso in qualsiasi momento</li>
            </ul>
            <p className="mt-3">
              Per esercitare questi diritti, contattaci a: <a href="mailto:info@idraulicodistratto.com" className="text-primary hover:underline">info@idraulicodistratto.com</a>
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">8. Cookie</h2>
            <p>
              Questo sito utilizza cookie tecnici necessari al funzionamento e cookie analitici 
              per migliorare l'esperienza utente. Puoi gestire le preferenze sui cookie attraverso 
              le impostazioni del tuo browser.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">9. Sicurezza</h2>
            <p>
              Adottiamo misure di sicurezza tecniche e organizzative appropriate per proteggere 
              i tuoi dati personali da accessi non autorizzati, perdita o distruzione.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">10. Modifiche alla Privacy Policy</h2>
            <p>
              Ci riserviamo il diritto di modificare questa Privacy Policy in qualsiasi momento. 
              Le modifiche saranno pubblicate su questa pagina con la data di ultimo aggiornamento.
            </p>
          </section>
        </div>

        {/* Footer */}
        <footer className="mt-16 pt-8 border-t border-border text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Manuale dell'Idraulico Distratto. Tutti i diritti riservati.</p>
        </footer>
      </div>
    </div>
  );
}
