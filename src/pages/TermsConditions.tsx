import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export default function TermsConditions() {
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
          Termini e Condizioni
        </h1>

        <div className="prose prose-lg max-w-none text-muted-foreground space-y-6">
          <p className="text-sm text-muted-foreground/70">
            Ultimo aggiornamento: {new Date().toLocaleDateString('it-IT')}
          </p>

          <section>
            <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">1. Accettazione dei Termini</h2>
            <p>
              Acquistando il prodotto "Manuale dell'Idraulico Distratto" accetti integralmente 
              i presenti Termini e Condizioni. Ti invitiamo a leggerli attentamente prima di 
              procedere con l'acquisto.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">2. Descrizione del Prodotto</h2>
            <p>
              "Manuale dell'Idraulico Distratto" è un prodotto digitale (ebook) che fornisce 
              informazioni e consigli relativi all'intimità di coppia. Il prodotto viene consegnato 
              in formato digitale PDF tramite email.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">3. Acquisto e Pagamento</h2>
            <ul className="list-disc pl-6 space-y-2 mt-3">
              <li>I prezzi sono indicati in Euro (€) e includono l'IVA ove applicabile</li>
              <li>Il pagamento viene elaborato in modo sicuro tramite Shopify Payments</li>
              <li>Accettiamo carte di credito/debito e altri metodi di pagamento disponibili</li>
              <li>L'ordine è confermato solo dopo l'avvenuto pagamento</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">4. Consegna</h2>
            <p>
              Dopo il completamento dell'acquisto, riceverai un'email all'indirizzo fornito 
              contenente il link per scaricare il prodotto digitale. La consegna è immediata 
              e automatica.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">5. Garanzia Soddisfatti o Rimborsati</h2>
            <p>
              Offriamo una garanzia di 60 giorni "Soddisfatti o Rimborsati". Se per qualsiasi 
              motivo non sei soddisfatto del prodotto, puoi richiedere un rimborso completo 
              entro 60 giorni dalla data di acquisto, senza dover fornire alcuna spiegazione.
            </p>
            <p className="mt-3">
              Per richiedere il rimborso, contattaci a: <a href="mailto:info@idraulicodistratto.com" className="text-primary hover:underline">info@idraulicodistratto.com</a>
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">6. Proprietà Intellettuale</h2>
            <p>
              Tutti i contenuti del prodotto, inclusi testi, immagini e grafica, sono protetti 
              da diritto d'autore. L'acquisto conferisce una licenza personale e non trasferibile 
              per l'utilizzo del prodotto.
            </p>
            <p className="mt-3">È vietato:</p>
            <ul className="list-disc pl-6 space-y-2 mt-3">
              <li>Riprodurre, distribuire o rivendere il prodotto</li>
              <li>Condividere il prodotto con terzi</li>
              <li>Modificare o creare opere derivate</li>
              <li>Utilizzare il contenuto per scopi commerciali</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">7. Limitazione di Responsabilità</h2>
            <p>
              Il prodotto ha scopo puramente informativo e educativo. Non sostituisce in alcun 
              modo il parere di professionisti qualificati (medici, psicologi, sessuologi).
            </p>
            <p className="mt-3">
              Non ci assumiamo responsabilità per:
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-3">
              <li>Risultati individuali che possono variare</li>
              <li>Uso improprio delle informazioni contenute</li>
              <li>Danni diretti o indiretti derivanti dall'uso del prodotto</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">8. Lifetime Access</h2>
            <p>
              L'opzione "Lifetime Access" garantisce l'accesso a tutti gli aggiornamenti futuri 
              del prodotto. Questa opzione è disponibile come upgrade separato e include:
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-3">
              <li>Aggiornamenti illimitati del contenuto</li>
              <li>Supporto prioritario via email</li>
              <li>Sconti su futuri prodotti</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">9. Modifiche ai Termini</h2>
            <p>
              Ci riserviamo il diritto di modificare questi Termini e Condizioni in qualsiasi 
              momento. Le modifiche saranno effettive dalla data di pubblicazione su questa pagina.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">10. Legge Applicabile e Foro Competente</h2>
            <p>
              I presenti Termini e Condizioni sono regolati dalla legge italiana. Per qualsiasi 
              controversia sarà competente il Foro del luogo di residenza del consumatore.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">11. Contatti</h2>
            <p>
              Per qualsiasi domanda relativa a questi Termini e Condizioni, contattaci a: <br />
              <a href="mailto:info@idraulicodistratto.com" className="text-primary hover:underline">info@idraulicodistratto.com</a>
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
