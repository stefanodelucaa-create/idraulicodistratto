import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle, Star, BookOpen, Gift, Shield, Clock, Cpu, Zap, Layers, Sparkles, Target, Users, TrendingUp } from "lucide-react";
import ebookMockup from "@/assets/ebook-mockup.png";
import bonusMockup from "@/assets/bonus-mockup.png";
import { toast } from "sonner";

// Modern/Tech Style - Gradients, glassmorphism, futuristic aesthetic
const IndexTech = () => {
  const handleBuyClick = () => {
    toast.info("Checkout non disponibile al momento.");
  };

  const price = "€29";

  return (
    <div className="min-h-screen bg-slate-950 text-white overflow-hidden" style={{ fontFamily: "'DM Sans', sans-serif" }}>
      {/* Animated gradient background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute top-0 -left-1/4 w-1/2 h-1/2 bg-gradient-to-br from-violet-600/30 to-transparent rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-0 -right-1/4 w-1/2 h-1/2 bg-gradient-to-tl from-cyan-500/30 to-transparent rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1/3 h-1/3 bg-gradient-to-br from-fuchsia-500/20 to-transparent rounded-full blur-[100px]" />
      </div>

      {/* Header */}
      <header className="relative z-10 bg-slate-950/50 backdrop-blur-xl border-b border-white/10">
        <div className="container py-3 flex items-center justify-center gap-2">
          <div className="flex items-center gap-2 bg-gradient-to-r from-violet-500/20 to-cyan-500/20 px-4 py-1.5 rounded-full border border-white/10">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <span className="text-sm font-medium bg-gradient-to-r from-violet-300 to-cyan-300 bg-clip-text text-transparent">
              Sistema Completo v2.0 — Bonus Pack Incluso
            </span>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative z-10 py-20 lg:py-28">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2">
                <div className="px-3 py-1 bg-gradient-to-r from-violet-500 to-cyan-500 rounded-full text-xs font-bold uppercase tracking-wider">
                  Nuovo
                </div>
                <div className="px-3 py-1 bg-white/10 backdrop-blur rounded-full text-xs font-medium text-gray-300 border border-white/10">
                  200+ Pagine
                </div>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                Il Sistema
                <span className="block bg-gradient-to-r from-violet-400 via-fuchsia-400 to-cyan-400 bg-clip-text text-transparent">
                  Definitivo
                </span>
                per l'Intimità
              </h1>

              <p className="text-xl text-gray-400 max-w-lg leading-relaxed">
                Un approccio <span className="text-cyan-400">scientifico e sistematico</span> per 
                trasformare completamente la tua vita intima. Basato su ricerche reali e feedback di oltre 500 utenti.
              </p>

              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: Cpu, label: "Metodo Scientifico" },
                  { icon: Layers, label: "6 Moduli Completi" },
                  { icon: Zap, label: "Risultati Rapidi" },
                  { icon: Shield, label: "Privacy Totale" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 bg-white/5 backdrop-blur-sm rounded-xl p-3 border border-white/10">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-violet-500/20 to-cyan-500/20 flex items-center justify-center">
                      <item.icon className="w-5 h-5 text-cyan-400" />
                    </div>
                    <span className="text-sm font-medium text-gray-300">{item.label}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-6 items-start pt-4">
                <Button 
                  onClick={handleBuyClick}
                  className="bg-gradient-to-r from-violet-600 to-cyan-600 hover:from-violet-700 hover:to-cyan-700 text-white text-lg px-10 py-7 rounded-2xl font-bold shadow-[0_0_50px_rgba(139,92,246,0.3)] hover:shadow-[0_0_70px_rgba(139,92,246,0.4)] transition-all border border-white/20"
                >
                  <span className="flex items-center gap-2">
                    Accedi al Sistema
                    <ArrowRight className="w-5 h-5" />
                  </span>
                </Button>
                <div className="text-center sm:text-left">
                  <div className="flex items-center gap-3">
                    <span className="text-4xl font-bold bg-gradient-to-r from-violet-300 to-cyan-300 bg-clip-text text-transparent">{price}</span>
                    <span className="text-gray-500 line-through">€87</span>
                  </div>
                  <span className="text-cyan-400/80 text-sm">Accesso lifetime</span>
                </div>
              </div>
            </div>

            <div className="relative flex justify-center">
              {/* Glowing ring */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-80 h-80 rounded-full bg-gradient-to-r from-violet-500/20 to-cyan-500/20 blur-3xl" />
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-64 h-64 rounded-full border border-violet-500/30 animate-pulse" />
              </div>
              
              <div className="relative z-10">
                <img src={ebookMockup} alt="Sistema Completo" className="w-72 lg:w-80 drop-shadow-2xl" style={{ filter: 'drop-shadow(0 30px 60px rgba(139,92,246,0.3))' }} />
                <img src={bonusMockup} alt="Bonus Pack" className="absolute -right-8 bottom-4 w-40 lg:w-48 drop-shadow-2xl" style={{ filter: 'drop-shadow(0 20px 40px rgba(6,182,212,0.2))' }} />
                
                {/* Floating cards */}
                <div className="absolute -left-4 top-1/4 bg-slate-900/80 backdrop-blur-xl border border-white/10 rounded-xl p-3 shadow-xl">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-cyan-500 flex items-center justify-center">
                      <BookOpen className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-400">Contenuti</p>
                      <p className="text-sm font-bold text-white">200+ Pagine</p>
                    </div>
                  </div>
                </div>
                
                <div className="absolute -right-4 top-8 bg-gradient-to-r from-violet-600 to-cyan-600 rounded-xl px-4 py-2 shadow-xl">
                  <div className="flex items-center gap-2">
                    <Gift className="w-4 h-4 text-white" />
                    <span className="text-sm font-bold text-white">+€20 Bonus</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="relative z-10 py-20">
        <div className="container">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-white/5 backdrop-blur px-4 py-2 rounded-full border border-white/10 mb-6">
              <Cpu className="w-4 h-4 text-cyan-400" />
              <span className="text-sm text-gray-300">Sistema Modulare</span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              Architettura del <span className="bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">Sistema</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              6 moduli interconnessi per una trasformazione completa
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { num: "01", title: "Core Psychology", desc: "Fondamenti mentali per superare blocchi e ansie." },
              { num: "02", title: "Anatomy Mapping", desc: "Mappatura completa delle zone di piacere." },
              { num: "03", title: "Environment Setup", desc: "Ottimizzazione del contesto per massimi risultati." },
              { num: "04", title: "Technique Library", desc: "Database completo di tecniche step-by-step." },
              { num: "05", title: "Advanced Protocols", desc: "Strategie avanzate per esperti." },
              { num: "06", title: "Relationship Engine", desc: "Costruzione di connessione duratura." },
            ].map((item, i) => (
              <div key={i} className="group relative">
                <div className="absolute inset-0 bg-gradient-to-r from-violet-600/20 to-cyan-600/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative bg-slate-900/50 backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:border-violet-500/30 transition-all h-full">
                  <div className="text-4xl font-bold bg-gradient-to-r from-violet-400/30 to-cyan-400/30 bg-clip-text text-transparent mb-4">
                    {item.num}
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-white">{item.title}</h3>
                  <p className="text-gray-400">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="relative z-10 py-16">
        <div className="container">
          <div className="bg-gradient-to-r from-violet-900/30 via-fuchsia-900/30 to-cyan-900/30 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-12">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
              {[
                { value: "500+", label: "Utenti Attivi", icon: Users },
                { value: "94%", label: "Success Rate", icon: Target },
                { value: "200+", label: "Pagine", icon: BookOpen },
                { value: "4.9★", label: "Rating", icon: Star },
              ].map((stat, i) => (
                <div key={i} className="space-y-2">
                  <stat.icon className="w-6 h-6 text-cyan-400 mx-auto" />
                  <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-violet-300 to-cyan-300 bg-clip-text text-transparent">{stat.value}</div>
                  <div className="text-gray-400 text-sm">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative z-10 py-24">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-violet-500/20 to-cyan-500/20 px-4 py-2 rounded-full border border-white/10 mb-8">
              <Zap className="w-4 h-4 text-cyan-400" />
              <span className="text-sm text-gray-300">Accesso Immediato</span>
            </div>
            
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              Pronto per il <span className="bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">Prossimo Livello</span>?
            </h2>
            <p className="text-xl text-gray-400 mb-10 max-w-xl mx-auto">
              Ottieni accesso completo al sistema, tutti i moduli e il bonus pack incluso.
            </p>

            <div className="bg-slate-900/50 backdrop-blur-xl border border-white/10 rounded-3xl p-10">
              <div className="flex items-center justify-center gap-4 mb-6">
                <span className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-violet-300 to-cyan-300 bg-clip-text text-transparent">{price}</span>
                <div className="text-left">
                  <span className="text-gray-500 line-through block">€87</span>
                  <span className="text-cyan-400 text-sm">-57% OFF</span>
                </div>
              </div>
              <Button 
                onClick={handleBuyClick}
                className="bg-gradient-to-r from-violet-600 to-cyan-600 hover:from-violet-700 hover:to-cyan-700 text-white text-xl px-12 py-8 rounded-2xl font-bold shadow-[0_0_50px_rgba(139,92,246,0.3)] hover:shadow-[0_0_70px_rgba(139,92,246,0.4)] transition-all border border-white/20 w-full sm:w-auto"
              >
                Inizia Ora — Accesso Lifetime
                <ArrowRight className="w-6 h-6 ml-2" />
              </Button>
              <div className="flex items-center justify-center gap-6 mt-6 text-gray-500 text-sm">
                <span className="flex items-center gap-2"><Shield className="w-4 h-4" /> Secure checkout</span>
                <span className="flex items-center gap-2"><Clock className="w-4 h-4" /> Instant access</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 py-8 border-t border-white/5">
        <div className="container text-center text-gray-600 text-sm">
          <p>© 2024 Manuale dell'Idraulico Distratto. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default IndexTech;
