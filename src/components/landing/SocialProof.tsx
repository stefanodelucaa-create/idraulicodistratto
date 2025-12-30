import { BookOpen, FlaskConical, Heart, Star, Quote } from "lucide-react";

const trustFeatures = [
  {
    icon: BookOpen,
    title: "Contenuto Denso e Strutturato",
    description: "Oltre 200 pagine, 25 capitoli, basati su psicologia sessuale, anatomia e comunicazione reale di coppia.",
  },
  {
    icon: FlaskConical,
    title: "Basata su Ricerca e Esperienza Reale",
    description: "Concetti presi da terapia sessuale, studio dell'anatomia femminile e analisi di centinaia di discussioni reali tra uomini e donne.",
  },
  {
    icon: Heart,
    title: "Focalizzata su Intimità, non Performance",
    description: "L'obiettivo non è 'farle fare qualcosa' per ego, ma costruire intimità, sicurezza e piacere condiviso.",
  },
];

// Placeholder for future testimonials
const testimonials = [
  {
    name: "Marco R.",
    location: "Milano",
    text: "La parte sulla psicologia mi ha aperto gli occhi. Ho capito che stavo mettendo pressione a entrambi senza rendermene conto. Ora l'approccio è completamente diverso.",
    rating: 5
  },
  {
    name: "Alessandro T.",
    location: "Roma", 
    text: "Finalmente una guida che spiega il 'perché' dietro le tecniche. Capire l'anatomia reale ha fatto la differenza. Niente più improvvisazione.",
    rating: 5
  },
  {
    name: "Luca M.",
    location: "Napoli",
    text: "Gli script per la comunicazione sono oro. Sapevo che dovevo parlarne ma non sapevo come. Ora abbiamo un dialogo aperto che non avevamo mai avuto.",
    rating: 5
  }
];

export const SocialProof = () => {
  return (
    <section id="testimonianze" className="py-16 md:py-20 bg-card-gradient">
      <div className="container px-5">
        {/* Trust Section Title */}
        <div className="text-center mb-10 md:mb-12">
          <span className="inline-block bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-4">
            Affidabilità
          </span>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-display font-bold text-foreground mb-4">
            Perché Puoi Fidarti di Questa Guida
          </h2>
        </div>

        {/* Trust Features */}
        <div className="grid md:grid-cols-3 gap-6 md:gap-8 max-w-5xl mx-auto mb-12 md:mb-16">
          {trustFeatures.map((feature, index) => (
            <div
              key={index}
              className="bg-card rounded-2xl p-6 md:p-8 shadow-soft border border-border/50 text-center"
            >
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-5">
                <feature.icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-lg md:text-xl font-bold text-foreground mb-3">
                {feature.title}
              </h3>
              <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Testimonials */}
        <div className="text-center mb-8">
          <h3 className="text-xl md:text-2xl font-bold text-foreground">
            Cosa Dicono i Nostri Lettori
          </h3>
        </div>

        <div className="grid md:grid-cols-3 gap-5 md:gap-6 max-w-5xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-card rounded-2xl p-5 md:p-6 shadow-soft border border-border/50"
            >
              <Quote className="w-8 h-8 text-primary/30 mb-4" />
              
              <p className="text-foreground mb-5 italic text-sm md:text-base leading-relaxed">
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
      </div>
    </section>
  );
};
