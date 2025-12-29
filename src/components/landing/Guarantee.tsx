import { Shield, Lock, Download, Eye } from "lucide-react";

export const Guarantee = () => {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container">
        <div className="max-w-4xl mx-auto">
          <div className="bg-card rounded-3xl p-8 md:p-12 shadow-elevated border border-border/50 relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
            
            <div className="relative z-10">
              <div className="text-center mb-10">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 mb-6">
                  <Shield className="w-10 h-10 text-primary" />
                </div>
                <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
                  Le Nostre Garanzie
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  La tua soddisfazione e privacy sono la nostra priorità assoluta.
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center p-6 rounded-2xl bg-background/50">
                  <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <Eye className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="text-lg font-bold text-foreground mb-2">
                    Privacy Totale
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    Pagamento anonimo. Nessuna dicitura esplicita sull'estratto conto o sulla fattura.
                  </p>
                </div>

                <div className="text-center p-6 rounded-2xl bg-background/50">
                  <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <Download className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="text-lg font-bold text-foreground mb-2">
                    Download Immediato
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    Ricevi subito l'accesso al tuo ebook. Nessuna attesa, inizia a leggere in pochi secondi.
                  </p>
                </div>

                <div className="text-center p-6 rounded-2xl bg-background/50">
                  <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <Lock className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="text-lg font-bold text-foreground mb-2">
                    Pagamento Sicuro
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    Transazioni protette con crittografia SSL. I tuoi dati sono sempre al sicuro.
                  </p>
                </div>
              </div>

              {/* Trust badges */}
              <div className="mt-10 pt-8 border-t border-border/50">
                <div className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
                  <span className="flex items-center gap-2">
                    <Shield className="w-4 h-4 text-primary" />
                    Dati crittografati
                  </span>
                  <span className="flex items-center gap-2">
                    <Lock className="w-4 h-4 text-primary" />
                    Checkout sicuro
                  </span>
                  <span className="flex items-center gap-2">
                    <Eye className="w-4 h-4 text-primary" />
                    100% discreto
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
