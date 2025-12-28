import { AlertCircle, XCircle, TrendingDown, Heart } from "lucide-react";

const painPoints = [
  {
    icon: XCircle,
    title: "Ti senti inadeguato?",
    description: "Molti uomini provano frustrazione e insicurezza quando non riescono a portare la propria partner al massimo piacere. Questa sensazione può minare la fiducia in se stessi.",
  },
  {
    icon: TrendingDown,
    title: "La passione sta svanendo?",
    description: "Con il tempo, la routine può prendere il sopravvento. Senza nuove competenze e tecniche, l'intimità diventa prevedibile e perde quella scintilla iniziale.",
  },
  {
    icon: AlertCircle,
    title: "Non sai da dove iniziare?",
    description: "Internet è pieno di informazioni confuse e spesso sbagliate. Senza una guida chiara e strutturata, è facile perdersi e non sapere cosa funziona davvero.",
  },
  {
    icon: Heart,
    title: "Vuoi vedere lei felice?",
    description: "Il desiderio più profondo di ogni uomo è vedere la propria partner completamente soddisfatta e appagata. Questo ebook ti dà gli strumenti per realizzare questo obiettivo.",
  },
];

export const PainPoints = () => {
  return (
    <section className="py-20 bg-muted/50">
      <div className="container">
        <div className="text-center mb-16">
          <span className="inline-block bg-destructive/10 text-destructive px-4 py-2 rounded-full text-sm font-medium mb-4">
            Il Problema
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-foreground mb-6">
            Ogni Uomo Merita di Saper<br />
            <span className="text-primary">Soddisfare la Propria Partner</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            La verità è che nessuno ci insegna queste cose. La maggior parte degli uomini 
            si affida all&apos;istinto o a informazioni frammentarie, perdendo l&apos;opportunità 
            di creare un&apos;intimità davvero appagante.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {painPoints.map((point, index) => (
            <div
              key={index}
              className="bg-card rounded-2xl p-6 shadow-soft hover:shadow-elevated transition-all duration-300 border border-border/50"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <point.icon className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-foreground mb-2">
                    {point.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {point.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Transition to solution */}
        <div className="mt-16 text-center">
          <div className="inline-block bg-card rounded-2xl p-8 shadow-elevated border border-primary/20">
            <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              La Soluzione Esiste
            </h3>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              Dopo mesi di ricerca e raccolta delle migliori tecniche, ho creato una guida completa 
              di <span className="text-primary font-bold">oltre 200 pagine</span> che ti accompagna 
              passo dopo passo verso la maestria nell&apos;intimità di coppia.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
