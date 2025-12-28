import { Book, FileText, CheckSquare, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface WhatYouGetProps {
  onBuyClick: () => void;
}

const items = [
  {
    icon: Book,
    title: "Ebook Completo",
    description: "20 capitoli dettagliati che coprono fondamenti, anatomia, tecniche e molto altro.",
    details: ["Formato PDF", "100+ pagine", "Illustrazioni esplicative"]
  },
  {
    icon: FileText,
    title: "Bonus: Risorse Pratiche",
    description: "PDF bonus con checklist, schede pratiche e strumenti applicativi.",
    details: ["Checklist pre-sessione", "Schede riassuntive", "Guide rapide"]
  },
  {
    icon: CheckSquare,
    title: "Accesso a Vita",
    description: "Scarica e consulta quando vuoi, senza limiti di tempo o accessi.",
    details: ["Download immediato", "Aggiornamenti gratuiti", "Nessun abbonamento"]
  }
];

export const WhatYouGet = ({ onBuyClick }: WhatYouGetProps) => {
  return (
    <section id="contenuto" className="py-20 bg-background">
      <div className="container">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-primary font-semibold text-sm uppercase tracking-wider">
            Il Pacchetto Completo
          </span>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mt-4 mb-6">
            Cosa Riceverai
          </h2>
          <p className="text-lg text-muted-foreground">
            Tutto ciò di cui hai bisogno per trasformare la tua vita intima, 
            subito accessibile dopo l'acquisto.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          {items.map((item, index) => (
            <div
              key={index}
              className="relative bg-card rounded-2xl p-8 shadow-soft border border-border/50 hover:shadow-elevated transition-all duration-300"
            >
              {index === 0 && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-xs font-semibold px-4 py-1 rounded-full">
                  PRINCIPALE
                </div>
              )}
              
              <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mb-6">
                <item.icon className="w-7 h-7 text-primary" />
              </div>
              
              <h3 className="text-xl font-display font-bold text-foreground mb-3">
                {item.title}
              </h3>
              
              <p className="text-muted-foreground mb-6">
                {item.description}
              </p>
              
              <ul className="space-y-2">
                {item.details.map((detail, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-foreground">
                    <span className="w-1.5 h-1.5 bg-primary rounded-full" />
                    {detail}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Button 
            variant="cta" 
            size="xl" 
            onClick={onBuyClick}
            className="group"
          >
            Ottieni il Pacchetto Completo
            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
          </Button>
        </div>
      </div>
    </section>
  );
};
