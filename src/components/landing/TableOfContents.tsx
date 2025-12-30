import { ChevronDown } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import sezione1 from "@/assets/sezione-1.png";
import sezione2 from "@/assets/sezione-2.png";
import sezione3 from "@/assets/sezione-3.png";
import sezione4 from "@/assets/sezione-4.png";
import sezione5 from "@/assets/sezione-5.png";
import sezione6 from "@/assets/sezione-6.png";

const sections = [
  {
    image: sezione1,
    title: "Fondamenti Psicologici",
    subtitle: "3 capitoli per smontare l'ansia da prestazione",
    description: "Cambia mindset da conquista a connessione e impara a comunicare senza mettere pressione.",
    color: "bg-[hsl(213,45%,87%)]",
  },
  {
    image: sezione2,
    title: "Anatomia Femminile Essenziale",
    subtitle: "Mappa completa del piacere femminile",
    description: "Clitoride interno, punto G e ghiandole di Skene: cosa succede davvero durante lo squirting.",
    color: "bg-[hsl(350,50%,90%)]",
  },
  {
    image: sezione3,
    title: "Preparazione & Ambiente",
    subtitle: "Come creare le condizioni ideali",
    description: "Tempi reali (40–65 minuti), ambiente fisico, clima emotivo e segnali che ti dicono che è pronta.",
    color: "bg-[hsl(45,50%,88%)]",
  },
  {
    image: sezione4,
    title: "Tecniche Step-by-Step",
    subtitle: "Dalla ricerca del punto G alla stimolazione combinata",
    description: "Indicazioni su ritmo, pressione, posizioni e cosa fare quando senti che sta arrivando.",
    color: "bg-[hsl(165,35%,85%)]",
  },
  {
    image: sezione5,
    title: "Scenari Avanzati",
    subtitle: "Squirting durante penetrazione e oltre",
    description: "Combinazioni avanzate, uso consapevole di sex toys e squirting multiplo.",
    color: "bg-[hsl(178,40%,72%)]",
  },
  {
    image: sezione6,
    title: "Oltre la Tecnica",
    subtitle: "Cosa fare se non succede",
    description: "Come evitare di trasformare tutto in un esame e rafforzare il rapporto anche senza squirting.",
    color: "bg-[hsl(270,40%,88%)]",
  },
];

const chapterDetails = [
  {
    title: "Parte 1 – Fondamenti Psicologici",
    chapters: [
      "Cap. 1: Cos'è l'ansia da prestazione, 12 segnali per riconoscerla, 5 tecniche per scioglierla",
      "Cap. 2: Dal mindset da \"missione\" alla mentalità orientata al piacere, 5 esercizi pratici",
      "Cap. 3: Comunicazione e consenso, formula in 4 passi per parlarne, linguaggio verbale e non verbale",
    ],
  },
  {
    title: "Parte 2 – Anatomia Femminile Essenziale",
    chapters: [
      "Cap. 4: Clitoride interno (9-11 cm), punto G, ghiandole di Skene in dettaglio",
      "Cap. 5: Fisiologia dello squirting, fasi e differenza con female ejaculation",
      "Cap. 6: Perché non tutte squirteranno e perché va benissimo così (variabilità 15-20%)",
    ],
  },
  {
    title: "Parte 3 – Preparazione & Ambiente",
    chapters: [
      "Cap. 7: Setting fisico ideale, tempistiche realistiche (40-65 minuti)",
      "Cap. 8: Preparazione emotiva, costruire anticipazione e sicurezza",
      "Cap. 9: Segnali di eccitazione da riconoscere prima di iniziare",
      "Cap. 10: Igiene, comfort e gestione pratica dei fluidi",
    ],
  },
  {
    title: "Parte 4 – Tecniche Step-by-Step",
    chapters: [
      "Cap. 11: Trovare il punto G – posizione esatta e variazioni anatomiche",
      "Cap. 12: La tecnica base 'vieni qui' – ritmo, pressione, angolazione",
      "Cap. 13: Stimolazione combinata clitoride + punto G",
      "Cap. 14: Leggere i segnali: cosa fare quando senti che sta arrivando",
      "Cap. 15: Posizioni ottimali per massimizzare l'accesso al punto G",
    ],
  },
  {
    title: "Parte 5 – Scenari Avanzati",
    chapters: [
      "Cap. 16: Squirting durante la penetrazione – angoli e posizioni",
      "Cap. 17: Uso consapevole di sex toys per amplificare le sensazioni",
      "Cap. 18: Squirting multiplo – mito o realtà? Cosa dice la scienza",
      "Cap. 19: Variazioni avanzate e esplorazione dei limiti",
    ],
  },
  {
    title: "Parte 6 – Oltre la Tecnica",
    chapters: [
      "Cap. 20: Cosa fare se non succede – evitare frustrazione e pressione",
      "Cap. 21: Come usare questo percorso per rafforzare il rapporto",
      "Cap. 22: Comunicazione post-sessione e feedback costruttivo",
      "Cap. 23: Mantenere viva l'esplorazione nel tempo",
      "Cap. 24: FAQ e troubleshooting situazionale",
      "Cap. 25: Il vero obiettivo: intimità autentica, non performance",
    ],
  },
];

export const TableOfContents = () => {
  return (
    <section className="py-16 md:py-20 bg-background">
      <div className="container px-5">
        <div className="text-center mb-10 md:mb-16">
          <span className="inline-block bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-4">
            Contenuti del Manuale
          </span>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-display font-bold text-foreground mb-4">
            6 Sezioni Complete
          </h2>
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
            Un percorso strutturato che ti guida dalle basi psicologiche fino alle tecniche avanzate
          </p>
        </div>

        {/* Section Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-8 mb-12 md:mb-16">
          {sections.map((section, index) => (
            <div
              key={index}
              className="group bg-card rounded-2xl overflow-hidden shadow-soft hover:shadow-elevated transition-all duration-300 hover:-translate-y-1"
            >
              {/* Section cover image */}
              <div className={`${section.color} p-4 md:p-6 flex justify-center`}>
                <img
                  src={section.image}
                  alt={section.title}
                  className="w-full max-w-[160px] md:max-w-[200px] h-auto rounded-lg shadow-lg group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
              </div>
              
              {/* Content */}
              <div className="p-5 md:p-6">
                <div className="flex items-center gap-2 mb-2">
                  <span className="bg-primary/10 text-primary text-xs font-bold px-2 py-1 rounded">
                    PARTE {index + 1}
                  </span>
                </div>
                <h3 className="text-lg md:text-xl font-bold text-foreground mb-2">
                  {section.title}
                </h3>
                <p className="text-sm text-primary/80 font-medium mb-2">
                  {section.subtitle}
                </p>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {section.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Detailed Accordion */}
        <div className="max-w-4xl mx-auto">
          <h3 className="text-xl md:text-2xl font-bold text-foreground text-center mb-6 md:mb-8">
            Cosa Imparerai Esattamente: 25 Capitoli in 6 Parti
          </h3>

          <Accordion type="single" collapsible className="space-y-3">
            {chapterDetails.map((part, index) => (
              <AccordionItem
                key={index}
                value={`part-${index}`}
                className="bg-card rounded-xl border border-border/50 shadow-soft overflow-hidden"
              >
                <AccordionTrigger className="px-5 md:px-6 py-4 md:py-5 text-left font-bold text-foreground hover:text-primary hover:no-underline text-base md:text-lg min-h-[56px]">
                  {part.title}
                </AccordionTrigger>
                <AccordionContent className="px-5 md:px-6 pb-5 md:pb-6">
                  <ul className="space-y-3">
                    {part.chapters.map((chapter, chIndex) => (
                      <li key={chIndex} className="flex items-start gap-3 text-muted-foreground text-sm md:text-base leading-relaxed">
                        <span className="w-1.5 h-1.5 bg-primary rounded-full flex-shrink-0 mt-2" />
                        {chapter}
                      </li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          {/* Summary box */}
          <div className="mt-8 bg-primary/5 rounded-2xl p-5 md:p-6 text-center border border-primary/20">
            <p className="text-foreground font-medium text-base md:text-lg">
              In totale: <span className="text-primary font-bold">oltre 200 pagine</span>, 
              <span className="text-primary font-bold"> 25 capitoli</span>, 
              <span className="text-primary font-bold"> 50+ esercizi pratici</span>, 
              <span className="text-primary font-bold"> 30+ frasi pronte</span> da usare con la tua partner.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
