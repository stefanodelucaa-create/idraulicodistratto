import { CheckCircle, XCircle } from "lucide-react";

const forYou = [
  "Sei in una relazione (o frequenti una persona) con cui vuoi costruire vera intimità",
  "Vuoi liberarti dall'ansia da prestazione e dal sentirti \"valutato\"",
  "Sei disposto a comunicare apertamente, non cerchi trucchi da applicare di nascosto",
  "Vuoi capire il corpo femminile a livello profondo e rispettoso",
  "Ti interessa il piacere di entrambi, non una semplice \"spunta\" di risultato",
];

const notForYou = [
  "Cerchi garanzie \"100% in 10 minuti\"",
  "Non ti interessa comunicare, ma solo avere un nuovo \"trick\"",
  "Vuoi solo qualcosa di rapido e superficiale",
  "Non accetti che alcune donne possano NON squirtare per motivi anatomici",
];

export const IsForYou = () => {
  return (
    <section className="py-16 md:py-20 bg-muted/30">
      <div className="container px-5">
        <div className="text-center mb-10 md:mb-12">
          <span className="inline-block bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-4">
            È Per Te?
          </span>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-display font-bold text-foreground">
            Per Chi è (Davvero) Questa Guida
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6 md:gap-8 max-w-5xl mx-auto">
          {/* For You */}
          <div className="bg-card rounded-2xl p-6 md:p-8 shadow-soft border-2 border-primary/20">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-primary" />
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-foreground">È per te se...</h3>
            </div>
            
            <ul className="space-y-4">
              {forYou.map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-foreground text-sm md:text-base">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Not For You */}
          <div className="bg-card rounded-2xl p-6 md:p-8 shadow-soft border border-border/50">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-destructive/10 flex items-center justify-center">
                <XCircle className="w-5 h-5 text-destructive" />
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-foreground">Non è per te se...</h3>
            </div>
            
            <ul className="space-y-4">
              {notForYou.map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <XCircle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
                  <span className="text-muted-foreground text-sm md:text-base">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <p className="text-center text-muted-foreground mt-8 max-w-2xl mx-auto text-sm md:text-base">
          Questa sezione esiste per onestà. Non promettiamo miracoli, ma un percorso serio per chi vuole davvero migliorare.
        </p>
      </div>
    </section>
  );
};
