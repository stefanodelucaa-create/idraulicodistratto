import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "In cosa è diverso dai video online o dai forum?",
    answer: "I video online (spesso porno) mostrano risultati irrealistici senza contesto. I forum sono frammentari e pieni di consigli non verificati. Questa guida è strutturata come un vero percorso: 70% psicologia/comunicazione, 30% tecnica. Basata su ricerca scientifica e terapia sessuale, non su performance da film per adulti."
  },
  {
    question: "Quanto tempo serve per vedere risultati?",
    answer: "Dipende dalla vostra situazione di partenza. Alcuni lettori riportano miglioramenti nella comunicazione e nell'intimità già dalla prima settimana. Per le tecniche specifiche, consigliamo almeno 3-4 sessioni di esplorazione senza pressione prima di aspettarsi risultati concreti. Il vero cambiamento sta nel mindset, non nella fretta."
  },
  {
    question: "È adatto anche se ho poca esperienza?",
    answer: "Assolutamente sì. La guida parte dalle basi: psicologia, anatomia, comunicazione. Non presuppone nessuna esperienza pregressa. Anzi, chi inizia senza preconcetti spesso impara più velocemente di chi deve 'disimparare' informazioni sbagliate."
  },
  {
    question: "Posso leggerlo insieme alla mia partner?",
    answer: "Sì, e lo consigliamo. Molte sezioni sono pensate per essere condivise: gli esercizi di comunicazione, le checklist, persino il bonus 'Esercizi Pratici per Lei'. Leggere insieme crea un terreno comune e apre il dialogo in modo naturale."
  },
  {
    question: "Funziona anche se la mia partner non è interessata allo squirting?",
    answer: "Certo. Circa il 70% del contenuto riguarda psicologia, comunicazione e comprensione del piacere femminile in generale. Queste competenze migliorano l'intimità indipendentemente dall'obiettivo specifico. Lo squirting è un 'di più', non l'unico traguardo."
  },
  {
    question: "È adatto a coppie lesbiche / same-sex?",
    answer: "La maggior parte del contenuto (anatomia, comunicazione, tecniche manuali) è universale e applicabile a qualsiasi tipo di coppia. Alcune sezioni presuppongono una dinamica maschile-femminile, ma i principi sono facilmente adattabili."
  },
  {
    question: "Cosa succede subito dopo l'acquisto?",
    answer: "Ricevi immediatamente un'email con i link per scaricare l'ebook principale (PDF) e tutti i 6 bonus. Nessuna attesa, nessuna spedizione. Puoi iniziare a leggere entro 2 minuti dall'acquisto."
  },
  {
    question: "Ci sono costi nascosti o abbonamenti?",
    answer: "No. Paghi €37 una volta sola e hai accesso a vita a tutto il materiale. Nessun abbonamento, nessun costo ricorrente, nessun 'upsell' forzato dopo l'acquisto."
  },
  {
    question: "Posso ottenere il rimborso se non fa per me?",
    answer: "Sì. Hai 60 giorni di garanzia completa. Se per qualsiasi motivo senti che la guida non ti ha dato valore, basta una mail per il rimborso. E puoi tenere comunque tutti i 6 bonus come nostro ringraziamento per aver provato."
  }
];

export const FAQ = () => {
  return (
    <section id="faq" className="py-16 md:py-20 bg-background">
      <div className="container px-5 max-w-3xl">
        <div className="text-center mb-10 md:mb-12">
          <span className="inline-block bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-4">
            FAQ
          </span>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-display font-bold text-foreground">
            Domande Frequenti
          </h2>
        </div>

        <Accordion type="single" collapsible className="space-y-3">
          {faqs.map((faq, index) => (
            <AccordionItem 
              key={index} 
              value={`item-${index}`}
              className="bg-card rounded-xl px-5 md:px-6 shadow-soft border border-border/50 data-[state=open]:shadow-elevated transition-all"
            >
              <AccordionTrigger className="text-left font-semibold text-foreground hover:text-primary hover:no-underline py-4 md:py-5 min-h-[56px] text-sm md:text-base">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground pb-5 text-sm md:text-base leading-relaxed">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};
