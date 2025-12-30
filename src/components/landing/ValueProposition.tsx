import { Book, Gift, CheckCircle, FileText, MessageSquare, ListChecks, Heart, Smartphone, LineChart, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const bonuses = [
  {
    icon: ListChecks,
    title: "Checklist Complete per Ogni Situazione",
    description: "Checklist stampabili (pre-sessione, durante, post-sessione) per non dimenticare nulla: ambiente, consenso, segnali da osservare, errori da evitare.",
    value: 19,
  },
  {
    icon: MessageSquare,
    title: "FAQ Estese con Risposte Complete",
    description: "Documento con decine di domande e risposte approfondite su problemi reali: cosa fare se lei sente dolore, se non arriva nulla dopo molte sessioni, se ha paura di 'fare pipì', ecc.",
    value: 24,
  },
  {
    icon: FileText,
    title: "Guida Rapida Risoluzione Problemi",
    description: "Una mappa decisionale da consultare al volo: 'Se succede X, controlla Y, poi fai Z'. Ideale da avere a portata di mano.",
    value: 17,
  },
  {
    icon: Heart,
    title: "Esercizi Pratici per Lei",
    description: "Una mini guida pensata per lei: esercizi di consapevolezza corporea, auto-esplorazione, rimozione delle inibizioni e dialogo con te.",
    value: 29,
  },
  {
    icon: Smartphone,
    title: "App Utili per Coppie",
    description: "Selezione e spiegazione di app per migliorare comunicazione, intimità, rilassamento e pianificazione dei vostri momenti insieme.",
    value: 15,
  },
  {
    icon: LineChart,
    title: "Scheda di Tracking Progressi",
    description: "Template editabile per monitorare nel tempo ciò che funziona: tecniche, livello di connessione, feedback di lei, miglioramenti nel rapporto.",
    value: 21,
  },
];

interface ValuePropositionProps {
  onBuyClick?: () => void;
}

export const ValueProposition = ({ onBuyClick }: ValuePropositionProps) => {
  const ebookValue = 79;
  const bonusTotal = bonuses.reduce((sum, b) => sum + b.value, 0);
  const totalValue = ebookValue + bonusTotal;

  return (
    <section className="py-10 sm:py-14 md:py-20 bg-gradient-to-b from-background to-muted/30">
      <div className="container px-4 sm:px-5">
        <div className="text-center mb-6 sm:mb-8 md:mb-12">
          <span className="inline-block bg-primary/10 text-primary px-3 py-1.5 rounded-full text-xs sm:text-sm font-medium mb-2 sm:mb-4">
            Cosa Riceverai
          </span>
          <h2 className="text-[20px] sm:text-2xl md:text-3xl lg:text-4xl font-display font-bold text-foreground mb-2 sm:mb-4">
            Cosa Riceverai Oltre all'Ebook
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-4 sm:gap-6 md:gap-8 max-w-6xl mx-auto">
          {/* Main Ebook */}
          <div className="bg-card rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 shadow-elevated border-2 border-primary/20 relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-primary text-primary-foreground px-3 sm:px-4 py-1 text-xs sm:text-sm font-bold rounded-bl-xl">
              PRINCIPALE
            </div>
            
            <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
              <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-xl sm:rounded-2xl bg-primary/10 flex items-center justify-center">
                <Book className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-primary" />
              </div>
              <div>
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-foreground">Manuale Completo</h3>
                <p className="text-primary font-medium text-sm sm:text-base">200+ pagine, 25 capitoli</p>
              </div>
            </div>

            <ul className="space-y-2 sm:space-y-3 mb-4 sm:mb-6">
              {[
                "Percorso completo: psicologia, anatomia, tecniche, scenari avanzati",
                "Struttura chiara e progressiva, pensata come un vero percorso di coaching",
                "Puoi usarlo da solo o leggerlo insieme alla tua partner",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-2 sm:gap-3">
                  <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-foreground text-[13px] sm:text-sm md:text-base">{item}</span>
                </li>
              ))}
            </ul>

            <div className="bg-primary/5 rounded-lg sm:rounded-xl p-3 sm:p-4 text-center">
              <span className="text-base sm:text-lg md:text-xl font-bold text-primary">Valore: €{ebookValue}</span>
            </div>
          </div>

          {/* Bonus Section */}
          <div className="space-y-3 sm:space-y-4">
            <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-4">
              <Gift className="w-5 h-5 sm:w-6 sm:h-6 text-accent" />
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-foreground">6 Bonus Inclusi GRATIS</h3>
            </div>

            <div className="grid gap-2 sm:gap-3">
              {bonuses.map((bonus, index) => (
                <div
                  key={index}
                  className="bg-card rounded-lg sm:rounded-xl p-3 sm:p-4 shadow-soft border border-border/50 hover:shadow-elevated transition-all"
                >
                  <div className="flex items-start gap-2 sm:gap-3">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                      <bonus.icon className="w-4 h-4 sm:w-5 sm:h-5 text-accent" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2 mb-0.5 sm:mb-1">
                        <h4 className="font-bold text-foreground text-[13px] sm:text-sm md:text-base leading-tight">{bonus.title}</h4>
                        <span className="text-accent font-bold text-xs sm:text-sm whitespace-nowrap">€{bonus.value}</span>
                      </div>
                      <p className="text-muted-foreground text-[11px] sm:text-xs md:text-sm line-clamp-2 leading-relaxed">{bonus.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Value Stack */}
        <div className="mt-8 sm:mt-10 md:mt-12 max-w-2xl mx-auto">
          <div className="bg-card rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 shadow-elevated border border-primary/20 text-center">
            <div className="space-y-1.5 sm:space-y-2 mb-4 sm:mb-6">
              <div className="flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-4 text-muted-foreground text-sm">
                <span>Valore Ebook:</span>
                <span className="font-bold">€{ebookValue}</span>
              </div>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-4 text-muted-foreground text-sm">
                <span>Valore 6 Bonus:</span>
                <span className="font-bold">€{bonusTotal}</span>
              </div>
              <div className="h-px bg-border my-2 sm:my-3" />
              <div className="flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-4 text-base sm:text-lg">
                <span className="text-foreground font-medium">Valore Totale:</span>
                <span className="font-bold text-muted-foreground line-through">€{totalValue}</span>
              </div>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 text-xl sm:text-2xl md:text-3xl">
                <span className="text-foreground font-bold">Oggi paghi solo:</span>
                <span className="font-bold text-primary">€37</span>
              </div>
            </div>

            {/* Price comparison */}
            <div className="bg-muted/50 rounded-lg sm:rounded-xl p-3 sm:p-4 mb-4 sm:mb-6 text-left">
              <p className="text-[12px] sm:text-sm md:text-base text-muted-foreground leading-relaxed">
                💡 <strong className="text-foreground">Per confronto:</strong> Una sessione con un sex therapist costa tra 80 e 150€. 
                Un workshop di coppia può costare 300–500€. Questa guida ha l'equivalente di diverse sessioni di lavoro, 
                ma la paghi meno di una cena fuori.
              </p>
            </div>

            {onBuyClick && (
              <Button 
                variant="cta" 
                size="xl" 
                onClick={onBuyClick}
                className="group min-h-[48px] sm:min-h-[52px] w-full text-[13px] sm:text-base"
              >
                Ottieni Tutto a €37
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 transition-transform group-hover:translate-x-1" />
              </Button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};