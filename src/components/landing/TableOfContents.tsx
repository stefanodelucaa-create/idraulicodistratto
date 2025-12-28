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
    subtitle: "Costruire la Mentalità Giusta per un'Intimità Autentica",
    description: "Scopri come la mente influenza il piacere. Impara a superare blocchi mentali, costruire fiducia e creare la connessione emotiva che è il vero fondamento di un'intimità appagante.",
    color: "bg-[hsl(213,45%,87%)]",
  },
  {
    image: sezione2,
    title: "Anatomia Femminile Essenziale",
    subtitle: "La Mappa del Piacere - Conoscere il Corpo per Creare Connessione",
    description: "Una guida chiara e rispettosa all'anatomia femminile. Comprendi le zone erogene, i meccanismi del piacere e come la conoscenza del corpo crea una connessione più profonda.",
    color: "bg-[hsl(350,50%,90%)]",
  },
  {
    image: sezione3,
    title: "Preparazione e Ambiente",
    subtitle: "Creare le Condizioni per il Successo Prima Ancora di Toccare",
    description: "L'importanza del contesto: come creare l'atmosfera perfetta, gestire l'igiene, comunicare desideri e costruire l'anticipazione che trasforma ogni incontro in qualcosa di speciale.",
    color: "bg-[hsl(45,50%,88%)]",
  },
  {
    image: sezione4,
    title: "Tecniche Pratiche Step-by-Step",
    subtitle: "Dalla Teoria alla Pratica - Le Tecniche Specifiche",
    description: "Il cuore del manuale: tecniche dettagliate passo dopo passo, posizioni ottimali, ritmi e pressioni. Tutto ciò che serve per passare dalla teoria alla pratica con sicurezza.",
    color: "bg-[hsl(165,35%,85%)]",
  },
  {
    image: sezione5,
    title: "Scenari Avanzati",
    subtitle: "Portare l'Esplorazione a Livelli Più Profondi",
    description: "Per chi vuole andare oltre: tecniche avanzate, variazioni creative e modi per mantenere viva la passione nel tempo. Esplora nuovi territori dell'intimità insieme.",
    color: "bg-[hsl(178,40%,72%)]",
  },
  {
    image: sezione6,
    title: "Oltre la Tecnica",
    subtitle: "Il Vero Scopo: Intimità, Crescita e Piacere Condiviso",
    description: "Il piacere è solo l'inizio. Scopri come l'intimità fisica può rafforzare il legame di coppia, migliorare la comunicazione e portare a una crescita reciproca duratura.",
    color: "bg-[hsl(270,40%,88%)]",
  },
];

export const TableOfContents = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container">
        <div className="text-center mb-16">
          <span className="inline-block bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-4">
            Contenuti del Manuale
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-foreground mb-4">
            6 Sezioni Complete
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Un percorso strutturato che ti guida dalle basi psicologiche fino alle tecniche avanzate
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sections.map((section, index) => (
            <div
              key={index}
              className="group bg-card rounded-2xl overflow-hidden shadow-soft hover:shadow-elevated transition-all duration-300 hover:-translate-y-1"
            >
              {/* Section cover image */}
              <div className={`${section.color} p-6 flex justify-center`}>
                <img
                  src={section.image}
                  alt={section.title}
                  className="w-full max-w-[200px] h-auto rounded-lg shadow-lg group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              
              {/* Content */}
              <div className="p-6">
                <div className="flex items-center gap-2 mb-2">
                  <span className="bg-primary/10 text-primary text-xs font-bold px-2 py-1 rounded">
                    PARTE {index + 1}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">
                  {section.title}
                </h3>
                <p className="text-sm text-primary/80 font-medium mb-3">
                  {section.subtitle}
                </p>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {section.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
