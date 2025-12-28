import { Heart, Brain, Lightbulb, Target, Users, Zap } from "lucide-react";

const benefits = [
  {
    icon: Brain,
    title: "Fondamenti Psicologici",
    description: "Decostruisci l'ansia da performance e cambia mentalità verso il piacere condiviso."
  },
  {
    icon: Heart,
    title: "Anatomia Femminile",
    description: "Comprendi la fisiologia del piacere femminile con spiegazioni chiare e scientifiche."
  },
  {
    icon: Lightbulb,
    title: "Preparazione Ottimale",
    description: "Crea l'ambiente perfetto per costruire eccitazione e intimità gradualmente."
  },
  {
    icon: Target,
    title: "Tecniche Step-by-Step",
    description: "Istruzioni pratiche dettagliate con posizioni, ritmi e segnali da riconoscere."
  },
  {
    icon: Zap,
    title: "Scenari Avanzati",
    description: "Tecniche avanzate e variazioni per chi vuole esplorare oltre le basi."
  },
  {
    icon: Users,
    title: "Intimità Duratura",
    description: "Focus sul piacere reciproco e sulla costruzione di una connessione profonda."
  }
];

export const Benefits = () => {
  return (
    <section id="benefits" className="py-20 bg-card-gradient">
      <div className="container">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-primary font-semibold text-sm uppercase tracking-wider">
            Cosa Imparerai
          </span>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mt-4 mb-6">
            Un Percorso Completo verso l'Intimità
          </h2>
          <p className="text-lg text-muted-foreground">
            20 capitoli che coprono ogni aspetto: dalla psicologia alle tecniche pratiche, 
            dalla comunicazione alle variazioni avanzate.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="group bg-card p-6 rounded-xl shadow-soft hover:shadow-elevated transition-all duration-300 border border-border/50"
            >
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <benefit.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-display font-semibold text-foreground mb-2">
                {benefit.title}
              </h3>
              <p className="text-muted-foreground">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
