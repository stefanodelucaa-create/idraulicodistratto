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
    <section className="py-12 sm:py-16 md:py-20 bg-muted/50">
      <div className="container px-4 sm:px-5">
        <div className="text-center mb-8 sm:mb-10 md:mb-16">
          <span className="inline-block bg-destructive/10 text-destructive px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium mb-3 sm:mb-4">
            Ti Riconosci?
          </span>
          <h2 className="text-[20px] sm:text-2xl md:text-3xl lg:text-4xl font-display font-bold text-foreground mb-3 sm:mb-4 leading-tight px-2">
            Ti Riconosci in Almeno Una
            <span className="text-primary block sm:inline"> di Queste Situazioni?</span>
          </h2>
        </div>

        <div className="grid gap-3 sm:gap-4 md:grid-cols-2 md:gap-6 max-w-5xl mx-auto">
          {painPoints.map((point, index) => (
            <div
              key={index}
              className="bg-card rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6 shadow-soft hover:shadow-elevated transition-all duration-300 border border-border/50"
            >
              <div className="flex items-start gap-3 sm:gap-4">
                <div className="w-9 h-9 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-lg sm:rounded-xl bg-destructive/10 flex items-center justify-center flex-shrink-0">
                  <XCircle className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-destructive" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-[15px] sm:text-lg md:text-xl font-bold text-foreground mb-1.5 sm:mb-2 leading-snug">
                    {point.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed text-[13px] sm:text-sm md:text-base">
                    {point.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Mini CTA */}
        <div className="mt-8 sm:mt-10 md:mt-12 text-center px-2">
          <div className="bg-card rounded-xl sm:rounded-2xl p-5 sm:p-6 md:p-8 shadow-elevated border border-primary/20 max-w-2xl mx-auto">
            <p className="text-foreground text-[14px] sm:text-base md:text-lg font-medium mb-3 sm:mb-4 leading-relaxed">
              Se ti sei riconosciuto in almeno 2 di questi punti,
              <span className="text-primary font-bold block sm:inline"> questa guida è stata scritta per te.</span>
            </p>
            {onBuyClick && (
              <Button 
                variant="cta" 
                size="lg" 
                onClick={onBuyClick}
                className="group min-h-[48px] w-full sm:w-auto text-[14px] sm:text-base"
              >
                Scopri la Soluzione
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 transition-transform group-hover:translate-x-1" />
              </Button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
