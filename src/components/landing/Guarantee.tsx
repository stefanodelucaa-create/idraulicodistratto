import { Shield, RefreshCcw, Gift, Mail } from "lucide-react";

export const Guarantee = () => {
  return (
    <section className="py-16 md:py-20 bg-muted/30">
      <div className="container px-5">
        <div className="max-w-4xl mx-auto">
          <div className="bg-card rounded-3xl p-6 md:p-10 shadow-elevated border border-border/50 relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
            
            <div className="relative z-10">
              <div className="text-center mb-8 md:mb-10">
                <div className="inline-flex items-center justify-center w-16 h-16 md:w-20 md:h-20 rounded-full bg-primary/10 mb-5">
                  <Shield className="w-8 h-8 md:w-10 md:h-10 text-primary" />
                </div>
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-display font-bold text-foreground mb-3">
                  Garanzia Tripla 60 Giorni
                </h2>
                <p className="text-lg md:text-xl text-primary font-medium">
                  Rischio Zero per Te
                </p>
                <p className="mt-3 text-sm md:text-base text-muted-foreground">
                  Prova la guida con calma: l'investimento è di <span className="font-bold text-foreground">€37</span> e hai 60 giorni per decidere.
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-5 md:gap-6">
                <div className="text-center p-5 md:p-6 rounded-2xl bg-background/50">
                  <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <RefreshCcw className="w-6 h-6 md:w-7 md:h-7 text-primary" />
                  </div>
                  <h3 className="text-lg font-bold text-foreground mb-2">
                    Rimborso 60 Giorni
                  </h3>
                  <p className="text-muted-foreground text-sm md:text-base">
                    Se entro 60 giorni senti che la guida non ti ha dato valore, ti restituiamo tutto.
                  </p>
                </div>

                <div className="text-center p-5 md:p-6 rounded-2xl bg-background/50">
                  <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <Gift className="w-6 h-6 md:w-7 md:h-7 text-primary" />
                  </div>
                  <h3 className="text-lg font-bold text-foreground mb-2">
                    Tieni i Bonus
                  </h3>
                  <p className="text-muted-foreground text-sm md:text-base">
                    Anche in caso di rimborso, i 6 bonus restano tuoi. È il nostro modo per ringraziarti.
                  </p>
                </div>

                <div className="text-center p-5 md:p-6 rounded-2xl bg-background/50">
                  <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <Mail className="w-6 h-6 md:w-7 md:h-7 text-primary" />
                  </div>
                  <h3 className="text-lg font-bold text-foreground mb-2">
                    Nessuna Spiegazione
                  </h3>
                  <p className="text-muted-foreground text-sm md:text-base">
                    Basta una mail, senza domande o moduli complicati. Rimborso entro 48h.
                  </p>
                </div>
              </div>

              {/* Trust badges */}
              <div className="mt-8 pt-6 border-t border-border/50">
                <div className="flex flex-wrap justify-center gap-4 md:gap-6 text-sm text-muted-foreground">
                  <span className="flex items-center gap-2">
                    <Shield className="w-4 h-4 text-primary" />
                    Dati crittografati
                  </span>
                  <span className="flex items-center gap-2">
                    <Shield className="w-4 h-4 text-primary" />
                    Checkout sicuro
                  </span>
                  <span className="flex items-center gap-2">
                    <Shield className="w-4 h-4 text-primary" />
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
