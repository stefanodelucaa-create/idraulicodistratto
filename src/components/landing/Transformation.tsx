import { ArrowRight, TrendingUp } from "lucide-react";

const transformations = [
  {
    before: "Insicurezza e ansia prima di ogni incontro",
    after: "Sicurezza totale e controllo del momento",
  },
  {
    before: "Lei finge o resta insoddisfatta",
    after: "Piacere autentico e condiviso ogni volta",
  },
  {
    before: "Rapporti brevi e frustranti",
    after: "Intimità profonda e duratura",
  },
  {
    before: "Paura del giudizio e imbarazzo",
    after: "Comunicazione aperta e complicità",
  },
];

export const Transformation = () => {
  return (
    <section className="py-20 bg-background relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 left-1/4 w-72 h-72 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 rounded-full bg-accent/10 blur-3xl" />
      </div>

      <div className="container relative z-10">
        <div className="text-center mb-16">
          <span className="inline-block bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-4">
            La Trasformazione
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-foreground mb-6">
            Da Dove Sei a <span className="text-primary">Dove Sarai</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Questo manuale non ti insegna solo tecniche — ti trasforma completamente 
            nel partner che lei ha sempre desiderato.
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-6">
          {transformations.map((item, index) => (
            <div
              key={index}
              className="group bg-card rounded-2xl p-6 shadow-soft hover:shadow-elevated transition-all duration-300 border border-border/50"
            >
              <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8">
                {/* Before */}
                <div className="flex-1 w-full">
                  <div className="bg-destructive/10 rounded-xl p-4 text-center md:text-left">
                    <span className="text-xs font-bold text-destructive uppercase tracking-wider mb-2 block">Prima</span>
                    <p className="text-foreground font-medium">{item.before}</p>
                  </div>
                </div>

                {/* Arrow */}
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center shadow-glow">
                    <ArrowRight className="w-6 h-6 text-primary-foreground" />
                  </div>
                </div>

                {/* After */}
                <div className="flex-1 w-full">
                  <div className="bg-primary/10 rounded-xl p-4 text-center md:text-left">
                    <span className="text-xs font-bold text-primary uppercase tracking-wider mb-2 block">Dopo</span>
                    <p className="text-foreground font-medium">{item.after}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom stat */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-3 bg-card rounded-full px-6 py-4 shadow-elevated">
            <TrendingUp className="w-6 h-6 text-primary" />
            <span className="text-lg font-bold text-foreground">
              Il 94% dei lettori riporta un miglioramento significativo
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
