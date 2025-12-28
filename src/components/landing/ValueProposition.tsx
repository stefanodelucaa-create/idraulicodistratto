import { Book, Gift, FileText, CheckCircle } from "lucide-react";

export const ValueProposition = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-background to-muted/30">
      <div className="container">
        <div className="text-center mb-12">
          <span className="inline-block bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-4">
            Cosa Ottieni
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-foreground mb-4">
            Un Investimento nel Tuo Rapporto
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Main Ebook */}
          <div className="bg-card rounded-3xl p-8 shadow-elevated border-2 border-primary/20 relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-primary text-primary-foreground px-4 py-1 text-sm font-bold rounded-bl-xl">
              INCLUSO
            </div>
            
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center">
                <Book className="w-8 h-8 text-primary" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-foreground">Manuale Completo</h3>
                <p className="text-primary font-medium">Oltre 200 pagine</p>
              </div>
            </div>

            <ul className="space-y-3 mb-6">
              {[
                "6 sezioni complete e strutturate",
                "20 capitoli dettagliati",
                "Tecniche step-by-step illustrate",
                "Fondamenti psicologici e anatomici",
                "Scenari avanzati per esperti",
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                  <span className="text-foreground">{item}</span>
                </li>
              ))}
            </ul>

            <div className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-muted-foreground" />
              <span className="text-muted-foreground">Formato PDF - Download immediato</span>
            </div>
          </div>

          {/* Bonus */}
          <div className="bg-card rounded-3xl p-8 shadow-elevated border-2 border-accent/30 relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-accent text-accent-foreground px-4 py-1 text-sm font-bold rounded-bl-xl">
              BONUS GRATIS
            </div>
            
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 rounded-2xl bg-accent/10 flex items-center justify-center">
                <Gift className="w-8 h-8 text-accent" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-foreground">Risorse Pratiche</h3>
                <p className="text-accent font-medium">50 pagine bonus</p>
              </div>
            </div>

            <ul className="space-y-3 mb-6">
              {[
                "Checklist pre-incontro",
                "Guida alla comunicazione intima",
                "Schede tecniche di riferimento",
                "Esercizi pratici per coppie",
                "FAQ e soluzioni comuni",
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-accent flex-shrink-0" />
                  <span className="text-foreground">{item}</span>
                </li>
              ))}
            </ul>

            <div className="bg-accent/10 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <span className="text-foreground font-medium">Valore reale:</span>
                <span className="text-lg font-bold text-muted-foreground line-through">€20</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-foreground font-medium">Per te oggi:</span>
                <span className="text-2xl font-bold text-accent">GRATIS</span>
              </div>
            </div>
          </div>
        </div>

        {/* Total value */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-4 bg-primary/5 rounded-full px-8 py-4">
            <span className="text-lg text-muted-foreground">Valore totale:</span>
            <span className="text-2xl font-bold text-muted-foreground line-through">€87</span>
            <span className="text-3xl font-bold text-primary">→ Oggi solo €37</span>
          </div>
        </div>
      </div>
    </section>
  );
};
