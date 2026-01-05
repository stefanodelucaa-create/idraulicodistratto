import { Link } from "react-router-dom";
import { ArrowLeft, Mail, Clock, MessageCircle } from "lucide-react";

export default function Contatti() {
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

        <h1 className="font-bold text-3xl md:text-4xl text-foreground mb-4">
          Contatti
        </h1>
        <p className="text-lg text-muted-foreground mb-10">
          Hai domande? Siamo qui per aiutarti.
        </p>

        {/* Contact Cards */}
        <div className="grid gap-6 md:grid-cols-2 mb-12">
          {/* Email Card */}
          <div className="bg-card rounded-2xl p-6 shadow-soft border border-border">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                <Mail className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Email</h3>
                <p className="text-sm text-muted-foreground">Il modo più veloce per contattarci</p>
              </div>
            </div>
            <a 
              href="mailto:info@idraulicodistratto.com" 
              className="text-primary hover:underline font-medium"
            >
              info@idraulicodistratto.com
            </a>
          </div>

          {/* Response Time Card */}
          <div className="bg-card rounded-2xl p-6 shadow-soft border border-border">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center">
                <Clock className="w-6 h-6 text-accent" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Tempi di Risposta</h3>
                <p className="text-sm text-muted-foreground">Rispondiamo rapidamente</p>
              </div>
            </div>
            <p className="text-foreground font-medium">
              Entro 24-48 ore lavorative
            </p>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="bg-secondary rounded-2xl p-8">
          <div className="flex items-center gap-3 mb-6">
            <MessageCircle className="w-6 h-6 text-primary" />
            <h2 className="font-semibold text-xl text-foreground">Domande Frequenti</h2>
          </div>
          
          <div className="space-y-6">
            <div>
              <h3 className="font-medium text-foreground mb-2">Come posso richiedere un rimborso?</h3>
              <p className="text-muted-foreground text-[15px]">
                Hai 60 giorni per richiedere un rimborso completo. Invia un'email a 
                info@idraulicodistratto.com con il numero d'ordine e riceverai il rimborso 
                entro 5-7 giorni lavorativi.
              </p>
            </div>

            <div>
              <h3 className="font-medium text-foreground mb-2">Non ho ricevuto l'email con il download</h3>
              <p className="text-muted-foreground text-[15px]">
                Controlla la cartella spam/posta indesiderata. Se non trovi l'email, contattaci 
                con il numero d'ordine e ti invieremo nuovamente il link.
              </p>
            </div>

            <div>
              <h3 className="font-medium text-foreground mb-2">Come funziona Lifetime Access?</h3>
              <p className="text-muted-foreground text-[15px]">
                Con Lifetime Access ricevi tutti gli aggiornamenti futuri dell'ebook 
                automaticamente via email, senza costi aggiuntivi. Per sempre.
              </p>
            </div>

            <div>
              <h3 className="font-medium text-foreground mb-2">Posso condividere l'ebook?</h3>
              <p className="text-muted-foreground text-[15px]">
                No, la licenza è personale e non trasferibile. La condivisione non autorizzata 
                viola i nostri Termini e Condizioni.
              </p>
            </div>
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-10 text-center">
          <p className="text-muted-foreground">
            Per questioni legali, consulta la nostra{" "}
            <Link to="/privacy-policy" className="text-primary hover:underline">Privacy Policy</Link>
            {" "}e i{" "}
            <Link to="/termini-condizioni" className="text-primary hover:underline">Termini e Condizioni</Link>.
          </p>
        </div>

        {/* Footer */}
        <footer className="mt-16 pt-8 border-t border-border text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Manuale dell'Idraulico Distratto. Tutti i diritti riservati.</p>
        </footer>
      </div>
    </div>
  );
}
