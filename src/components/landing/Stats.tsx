import { Users, Star, BookOpen, Award } from "lucide-react";

const stats = [
  {
    icon: Users,
    value: "500+",
    label: "Coppie Soddisfatte",
    description: "Hanno già trasformato la loro intimità",
  },
  {
    icon: Star,
    value: "4.9/5",
    label: "Valutazione Media",
    description: "Basata su feedback reali",
  },
  {
    icon: BookOpen,
    value: "200+",
    label: "Pagine di Contenuti",
    description: "Guida completa e dettagliata",
  },
  {
    icon: Award,
    value: "94%",
    label: "Tasso di Successo",
    description: "Risultati concreti e misurabili",
  },
];

export const Stats = () => {
  return (
    <section className="py-16 bg-foreground text-primary-foreground">
      <div className="container">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="text-center group"
            >
              <div className="w-14 h-14 bg-primary/20 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/30 transition-colors">
                <stat.icon className="w-7 h-7 text-primary" />
              </div>
              <div className="text-4xl md:text-5xl font-display font-bold mb-2 text-primary-foreground">
                {stat.value}
              </div>
              <div className="font-semibold mb-1">{stat.label}</div>
              <div className="text-sm text-primary-foreground/60">{stat.description}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
