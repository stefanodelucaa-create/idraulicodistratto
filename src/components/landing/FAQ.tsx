import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "Come riceverò l'ebook dopo l'acquisto?",
    answer: "Subito dopo il pagamento, riceverai un'email con i link per scaricare l'ebook principale e il PDF bonus. Il download è immediato e i file sono tuoi per sempre."
  },
  {
    question: "In che formato è disponibile?",
    answer: "L'ebook e il bonus sono in formato PDF, compatibile con qualsiasi dispositivo: smartphone, tablet, computer. Puoi leggerlo dove preferisci."
  },
  {
    question: "Il pagamento è sicuro?",
    answer: "Assolutamente sì. Utilizziamo Shopify per elaborare i pagamenti, che garantisce transazioni sicure e crittografate. I tuoi dati sono sempre protetti."
  },
  {
    question: "È adatto a tutti?",
    answer: "Questa guida è pensata per uomini che vogliono comprendere meglio l'intimità femminile e migliorare la propria relazione di coppia. Il contenuto è esplicito ma sempre rispettoso e orientato al benessere reciproco."
  },
  {
    question: "Quanto sono dettagliate le tecniche?",
    answer: "Molto dettagliate. Ogni tecnica è spiegata step-by-step con descrizioni precise di posizioni, movimenti, pressioni e ritmi. Niente è lasciato al caso."
  },
  {
    question: "C'è una garanzia?",
    answer: "Siamo sicuri della qualità del contenuto. Se per qualsiasi motivo non sei soddisfatto, contattaci entro 30 giorni dall'acquisto per assistenza."
  }
];

export const FAQ = () => {
  return (
    <section id="faq" className="py-20 bg-background">
      <div className="container max-w-3xl">
        <div className="text-center mb-12">
          <span className="text-primary font-semibold text-sm uppercase tracking-wider">
            Domande Frequenti
          </span>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mt-4">
            Hai Domande?
          </h2>
        </div>

        <Accordion type="single" collapsible className="space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem 
              key={index} 
              value={`item-${index}`}
              className="bg-card rounded-xl px-6 shadow-soft border border-border/50 data-[state=open]:shadow-elevated transition-all"
            >
              <AccordionTrigger className="text-left font-semibold text-foreground hover:text-primary hover:no-underline py-5">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground pb-5">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};
