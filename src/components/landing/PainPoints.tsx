import { XCircle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const painPoints = [
  {
    title: "Sei nella tua testa invece che nel momento",
    description: "Durante il sesso pensi: 'Sto facendo bene? Dovrei cambiare? Quanto manca?' Invece di goderti le sensazioni, sei bloccato nel dialogo mentale. Questo è esattamente il quadro dell'ansia da prestazione.",
  },
  {
    title: "Il sesso è diventato un lavoro, non un piacere",
    description: "Vedi lo squirting come una 'missione da compiere', un obiettivo da conquistare. Ti sforzi per ore, ma ti senti sempre sotto esame. Più ci provi, meno funziona.",
  },
  {
    title: "Lei si sente sotto pressione (anche se non te lo dice)",
    description: "La tua partner percepisce che vuoi ottenere un risultato. Inizia a pensare: 'Devo farcela per lui, se non succede sarà deluso', e si sente sbagliata o 'rotta'.",
  },
  {
    title: "Non sai più cosa è reale e cosa è finzione",
    description: "Porno e forum online ti hanno dato aspettative irreali: squirting in 5 minuti, ogni volta, con tutte. Non sai cosa dice la scienza, cosa è anatomia e cosa è recitazione.",
  },
  {
    title: "Conosci tecniche, ma non capisci perché funzionano",
    description: "Hai visto il famoso movimento 'vieni qui' con le dita, ma non hai una mappa chiara di ghiandole di Skene, punto G, clitoride interno. Improvvisi al buio.",
  },
  {
    title: "Non sai come parlarne senza creare imbarazzo",
    description: "Vorresti esplorare questo tema con la tua partner, ma non sai da dove iniziare senza creare pressione, aspettative o sensi di colpa.",
  },
];

interface PainPointsProps {
  onBuyClick?: () => void;
}

export const PainPoints = ({ onBuyClick }: PainPointsProps) => {
  return (
    <section className="py-16 md:py-20 bg-muted/50">
      <div className="container px-5">
        <div className="text-center mb-10 md:mb-16">
          <span className="inline-block bg-destructive/10 text-destructive px-4 py-2 rounded-full text-sm font-medium mb-4">
            Ti Riconosci?
          </span>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-display font-bold text-foreground mb-4 leading-tight">
            Ti Riconosci in Almeno Una<br className="hidden sm:block" />
            <span className="text-primary">di Queste Situazioni?</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-4 md:gap-6 max-w-5xl mx-auto">
          {painPoints.map((point, index) => (
            <div
              key={index}
              className="bg-card rounded-2xl p-5 md:p-6 shadow-soft hover:shadow-elevated transition-all duration-300 border border-border/50"
            >
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-destructive/10 flex items-center justify-center flex-shrink-0">
                  <XCircle className="w-5 h-5 md:w-6 md:h-6 text-destructive" />
                </div>
                <div>
                  <h3 className="text-lg md:text-xl font-bold text-foreground mb-2 leading-snug">
                    {point.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed text-sm md:text-base">
                    {point.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Mini CTA */}
        <div className="mt-10 md:mt-12 text-center">
          <div className="inline-block bg-card rounded-2xl p-6 md:p-8 shadow-elevated border border-primary/20 max-w-2xl">
            <p className="text-foreground text-base md:text-lg font-medium mb-4">
              Se ti sei riconosciuto in almeno 2 di questi punti,<br className="hidden sm:block" />
              <span className="text-primary font-bold">questa guida è stata scritta per te.</span>
            </p>
            {onBuyClick && (
              <Button 
                variant="cta" 
                size="lg" 
                onClick={onBuyClick}
                className="group min-h-[48px] w-full sm:w-auto"
              >
                Scopri la Soluzione
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </Button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
