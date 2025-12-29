import { CheckCircle } from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Comprendi il Problema",
    description: "Imparerai a riconoscere le cause principali dell'insoddisfazione nella coppia e come affrontarle con consapevolezza.",
  },
  {
    number: "02", 
    title: "Lavora sulla Mente",
    description: "Non è solo fisico! Ti spiegheremo come gestire l'ansia da prestazione e costruire la giusta mentalità per il successo.",
  },
  {
    number: "03",
    title: "Conosci l'Anatomia",
    description: "Una comprensione profonda della fisiologia femminile ti permetterà di sapere esattamente cosa fare e quando.",
  },
  {
    number: "04",
    title: "Tecniche Durante il Rapporto",
    description: "Imparerai tutte le pratiche migliori da attuare durante l'intimità per massimizzare il piacere della tua partner.",
  },
  {
    number: "05",
    title: "Cosa Evitare",
    description: "Scoprirai gli errori più comuni che gli uomini commettono e come evitarli per non rovinare il momento.",
  },
  {
    number: "06",
    title: "Esercizi Pratici",
    description: "Ti illustreremo tutti gli esercizi necessari per migliorare le tue performance senza costosi rimedi esterni.",
  },
];

export const StepByStep = () => {
  return (
    <section className="py-20 bg-background relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-primary/30 to-transparent" />
      
      <div className="container">
        <div className="text-center mb-16">
          <span className="inline-block bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-4">
            Il Metodo
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-foreground mb-6">
            Il Percorso in <span className="text-primary">6 Step</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Un metodo strutturato e testato che ti guiderà passo dopo passo verso 
            la trasformazione completa della tua vita intima.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {steps.map((step, index) => (
            <div
              key={index}
              className={`relative flex items-start gap-6 mb-8 last:mb-0 ${
                index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
              }`}
            >
              {/* Step number */}
              <div className="flex-shrink-0 w-16 h-16 rounded-2xl bg-primary text-primary-foreground flex items-center justify-center text-2xl font-bold shadow-glow z-10">
                {step.number}
              </div>

              {/* Content card */}
              <div className="flex-1 bg-card rounded-2xl p-6 shadow-soft border border-border/50 hover:shadow-elevated transition-all duration-300">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-xl font-bold text-foreground mb-2">
                      {step.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <p className="text-lg text-muted-foreground mb-4">
            Tutto questo in <span className="text-primary font-bold">oltre 200 pagine</span> di contenuti esclusivi
          </p>
          <div className="inline-flex items-center gap-2 bg-accent/20 text-accent-foreground px-6 py-3 rounded-full">
            <CheckCircle className="w-5 h-5" />
            <span className="font-medium">Lavorando SOLO su te stesso, senza costosi rimedi esterni</span>
          </div>
        </div>
      </div>
    </section>
  );
};
