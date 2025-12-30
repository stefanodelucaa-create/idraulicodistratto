import { Brain, Target, MessageSquare, X, CheckCircle } from "lucide-react";

const uniqueFeatures = [
  {
    icon: Brain,
    title: "Psicologia Prima della Tecnica",
    description: "Circa il 70% dell'ebook è dedicato a mindset, ansia da prestazione e comunicazione. Impari 5 tecniche dei terapeuti sessuali per spezzare l'ansia, cambiare il modo in cui definisci il 'successo' e spostarti da performance a connessione.",
  },
  {
    icon: Target,
    title: "Anatomia Scientifica, non Porno-Fantascienza",
    description: "Capirai finalmente come è fatto davvero il corpo femminile: clitoride interno di 9–11 cm, punto G, ghiandole di Skene. Comprenderai perché il 15–20% delle donne ha ghiandole poco sviluppate e perché NON è un fallimento se non squirta.",
  },
  {
    icon: MessageSquare,
    title: "Comunicazione Strutturata, non 'Parla un Po' di Più'",
    description: "Trovi script pronti all'uso, domande aperte, esempi di frasi da usare prima, durante e dopo, oltre a una guida per leggere il linguaggio non verbale. Non è teoria astratta: sono parole reali da usare in situazioni reali.",
  },
];

const comparisons = [
  {
    bad: "Trucchi veloci e promesse irreali",
    good: "Percorso completo: psicologia + anatomia + tecniche",
  },
  {
    bad: "\"Tutte possono squirtare in 5 minuti\"",
    good: "Spiega la variabilità anatomica e cosa è realisticamente possibile",
  },
  {
    bad: "Nessun contesto emotivo",
    good: "Fondamenta su intimità, consenso e sicurezza emotiva",
  },
  {
    bad: "Video porno come riferimento",
    good: "Ricerca scientifica e terapia sessuale come base",
  },
];

export const WhyDifferent = () => {
  return (
    <section className="py-16 md:py-20 bg-background">
      <div className="container px-5">
        <div className="text-center mb-10 md:mb-16">
          <span className="inline-block bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-4">
            Perché È Diversa
          </span>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-display font-bold text-foreground mb-4 leading-tight">
            Perché Questa Non è l'Ennesima{" "}
            <span className="text-primary">Guida sul Sesso Trovata Online</span>
          </h2>
        </div>

        {/* 3 Unique Features */}
        <div className="grid md:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto mb-12 md:mb-16">
          {uniqueFeatures.map((feature, index) => (
            <div
              key={index}
              className="bg-card rounded-2xl p-6 md:p-8 shadow-soft border border-border/50 text-center"
            >
              <div className="w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-5">
                <feature.icon className="w-7 h-7 md:w-8 md:h-8 text-primary" />
              </div>
              <h3 className="text-lg md:text-xl font-bold text-foreground mb-3">
                {feature.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed text-sm md:text-base">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Comparison Table - Mobile Optimized */}
        <div className="max-w-4xl mx-auto">
          <h3 className="text-xl md:text-2xl font-bold text-foreground text-center mb-6">
            Ciò che trovi online vs. ciò che trovi in questa guida
          </h3>

          {/* Desktop Table */}
          <div className="hidden md:block overflow-hidden rounded-2xl border border-border/50 shadow-soft">
            <table className="w-full">
              <thead>
                <tr className="bg-muted/50">
                  <th className="p-4 text-left font-bold text-foreground border-r border-border/50">
                    ❌ Guide generiche online
                  </th>
                  <th className="p-4 text-left font-bold text-foreground">
                    ✅ Questa guida
                  </th>
                </tr>
              </thead>
              <tbody>
                {comparisons.map((item, index) => (
                  <tr key={index} className={index % 2 === 0 ? "bg-card" : "bg-muted/30"}>
                    <td className="p-4 text-muted-foreground border-r border-border/50">
                      {item.bad}
                    </td>
                    <td className="p-4 text-foreground font-medium">
                      {item.good}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Comparison Cards */}
          <div className="md:hidden space-y-4">
            {comparisons.map((item, index) => (
              <div key={index} className="bg-card rounded-xl p-4 shadow-soft border border-border/50">
                <div className="flex items-start gap-3 mb-3">
                  <X className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
                  <p className="text-muted-foreground text-sm">{item.bad}</p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <p className="text-foreground font-medium text-sm">{item.good}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
