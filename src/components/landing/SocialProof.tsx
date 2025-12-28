import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Marco R.",
    location: "Milano",
    text: "Finalmente una guida che spiega le cose in modo chiaro e senza tabù. Ha davvero trasformato la nostra intimità di coppia.",
    rating: 5
  },
  {
    name: "Alessandro T.",
    location: "Roma",
    text: "Le tecniche step-by-step sono incredibilmente utili. Ho capito cose che non sapevo dopo anni di relazione.",
    rating: 5
  },
  {
    name: "Luca M.",
    location: "Napoli",
    text: "Il bonus con le checklist è oro puro. Pratico, diretto, efficace. Consiglio a tutti gli uomini che vogliono migliorare.",
    rating: 5
  }
];

const stats = [
  { value: "500+", label: "Coppie Soddisfatte" },
  { value: "20", label: "Capitoli Dettagliati" },
  { value: "100%", label: "Download Immediato" }
];

export const SocialProof = () => {
  return (
    <section id="testimonianze" className="py-20 bg-card-gradient">
      <div className="container">
        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-16">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <p className="text-3xl md:text-4xl font-display font-bold text-primary mb-1">
                {stat.value}
              </p>
              <p className="text-sm md:text-base text-muted-foreground">
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        {/* Testimonials */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-primary font-semibold text-sm uppercase tracking-wider">
            Testimonianze
          </span>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mt-4 mb-6">
            Cosa Dicono i Nostri Lettori
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-card rounded-2xl p-6 shadow-soft border border-border/50"
            >
              <Quote className="w-8 h-8 text-primary/30 mb-4" />
              
              <p className="text-foreground mb-6 italic">
                "{testimonial.text}"
              </p>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold text-foreground">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                </div>
                <div className="flex gap-0.5">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Expert credentials */}
        <div className="mt-16 bg-card rounded-2xl p-8 shadow-soft border border-border/50 text-center max-w-3xl mx-auto">
          <h3 className="text-xl font-display font-bold text-foreground mb-4">
            Basato su Ricerca Scientifica
          </h3>
          <p className="text-muted-foreground">
            Questa guida combina studi scientifici sulla fisiologia femminile, 
            principi di psicologia della sessualità, e feedback reali da centinaia 
            di coppie che hanno applicato queste tecniche con successo.
          </p>
        </div>
      </div>
    </section>
  );
};
