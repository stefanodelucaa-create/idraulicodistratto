import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { 
  ArrowRight, CheckCircle, Shield, Clock, Brain, Target, Heart, Gift, 
  XCircle, X, MessageSquare, Book, FileText, ListChecks, Smartphone, 
  LineChart, BookOpen, FlaskConical, Star, Quote, RefreshCcw, Mail, Download,
  ChevronDown, Sparkles, Crown
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import ebookMockup from "@/assets/ebook-mockup.png";
import bonusMockup from "@/assets/bonus-mockup.png";
import sezione1 from "@/assets/sezione-1.png";
import sezione2 from "@/assets/sezione-2.png";
import sezione3 from "@/assets/sezione-3.png";
import sezione4 from "@/assets/sezione-4.png";
import sezione5 from "@/assets/sezione-5.png";
import sezione6 from "@/assets/sezione-6.png";

// ============ DATA ============
const painPoints = [
  { title: "Sei nella tua testa invece che nel momento", description: "Durante il sesso pensi: 'Sto facendo bene? Dovrei cambiare? Quanto manca?' Invece di goderti le sensazioni, sei bloccato nel dialogo mentale." },
  { title: "Il sesso è diventato un lavoro, non un piacere", description: "Vedi lo squirting come una 'missione da compiere', un obiettivo da conquistare. Ti sforzi per ore, ma ti senti sempre sotto esame." },
  { title: "Lei si sente sotto pressione (anche se non te lo dice)", description: "La tua partner percepisce che vuoi ottenere un risultato. Inizia a pensare: 'Devo farcela per lui, se non succede sarà deluso'." },
  { title: "Non sai più cosa è reale e cosa è finzione", description: "Porno e forum online ti hanno dato aspettative irreali: squirting in 5 minuti, ogni volta, con tutte." },
  { title: "Conosci tecniche, ma non capisci perché funzionano", description: "Hai visto il famoso movimento 'vieni qui' con le dita, ma non hai una mappa chiara di ghiandole di Skene, punto G, clitoride interno." },
  { title: "Non sai come parlarne senza creare imbarazzo", description: "Vorresti esplorare questo tema con la tua partner, ma non sai da dove iniziare senza creare pressione." },
];

const uniqueFeatures = [
  { icon: Brain, title: "Psicologia Prima della Tecnica", description: "Circa il 70% dell'ebook è dedicato a mindset, ansia da prestazione e comunicazione." },
  { icon: Target, title: "Anatomia Scientifica, non Porno-Fantascienza", description: "Capirai finalmente come è fatto davvero il corpo femminile: clitoride interno, punto G, ghiandole di Skene." },
  { icon: MessageSquare, title: "Comunicazione Strutturata", description: "Script pronti all'uso, domande aperte, esempi di frasi da usare prima, durante e dopo." },
];

const sections = [
  { image: sezione1, title: "Fondamenti Psicologici", subtitle: "3 capitoli per smontare l'ansia" },
  { image: sezione2, title: "Anatomia Femminile Essenziale", subtitle: "Mappa completa del piacere" },
  { image: sezione3, title: "Preparazione & Ambiente", subtitle: "Condizioni ideali" },
  { image: sezione4, title: "Tecniche Step-by-Step", subtitle: "Dalla ricerca del punto G" },
  { image: sezione5, title: "Scenari Avanzati", subtitle: "Penetrazione e oltre" },
  { image: sezione6, title: "Oltre la Tecnica", subtitle: "Se non succede" },
];

const bonuses = [
  { icon: ListChecks, title: "Checklist Complete", value: 19 },
  { icon: MessageSquare, title: "FAQ Estese", value: 24 },
  { icon: FileText, title: "Guida Rapida Problemi", value: 17 },
  { icon: Heart, title: "Esercizi per Lei", value: 29 },
  { icon: Smartphone, title: "App Utili Coppie", value: 15 },
  { icon: LineChart, title: "Scheda Tracking", value: 21 },
];

const testimonials = [
  { name: "Marco R.", location: "Milano", text: "La parte sulla psicologia mi ha aperto gli occhi. Ho capito che stavo mettendo pressione a entrambi senza rendermene conto.", rating: 5 },
  { name: "Alessandro T.", location: "Roma", text: "Finalmente una guida che spiega il 'perché' dietro le tecniche. Capire l'anatomia reale ha fatto la differenza.", rating: 5 },
  { name: "Luca M.", location: "Napoli", text: "Gli script per la comunicazione sono oro. Sapevo che dovevo parlarne ma non sapevo come.", rating: 5 },
];

const forYou = [
  "Sei in una relazione con cui vuoi costruire vera intimità",
  "Vuoi liberarti dall'ansia da prestazione",
  "Sei disposto a comunicare apertamente",
  "Vuoi capire il corpo femminile a livello profondo",
  "Ti interessa il piacere di entrambi",
];

const notForYou = [
  'Cerchi garanzie "100% in 10 minuti"',
  "Non ti interessa comunicare",
  "Vuoi solo qualcosa di rapido",
  "Non accetti la variabilità anatomica",
];

const faqs = [
  { question: "In cosa è diverso dai video online?", answer: "Questa guida è strutturata: 70% psicologia/comunicazione, 30% tecnica. Basata su ricerca scientifica." },
  { question: "Quanto tempo serve per vedere risultati?", answer: "Alcuni riportano miglioramenti nella prima settimana. Per le tecniche, consigliamo 3-4 sessioni senza pressione." },
  { question: "Posso leggerlo insieme alla mia partner?", answer: "Sì, e lo consigliamo. Molte sezioni sono pensate per essere condivise." },
  { question: "Cosa succede dopo l'acquisto?", answer: "Ricevi immediatamente email con i link per scaricare tutto. Puoi iniziare entro 2 minuti." },
  { question: "Posso ottenere il rimborso?", answer: "Sì. 60 giorni di garanzia completa. Tieni comunque i bonus." },
];

const IndexDark = () => {
  const [isStickyCTAVisible, setIsStickyCTAVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const shouldShow = window.scrollY > 600;
      const nearBottom = window.scrollY + window.innerHeight > document.documentElement.scrollHeight - 400;
      setIsStickyCTAVisible(shouldShow && !nearBottom);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleBuyClick = () => {
    toast.info("Checkout non disponibile al momento.");
  };

  const price = "€29";
  const originalPrice = "€79";
  const bonusTotal = bonuses.reduce((sum, b) => sum + b.value, 0);

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white font-sans">
      {/* ANNOUNCEMENT BAR */}
      <div className="bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 text-black py-3 sm:py-4 text-center text-sm sm:text-base font-semibold px-4">
        <Crown className="w-4 h-4 inline mr-2" />
        Edizione Premium: 53% di Sconto + 6 Bonus Esclusivi (valore €125)
        <Crown className="w-4 h-4 inline ml-2" />
      </div>

      {/* HERO SECTION */}
      <section className="relative py-16 sm:py-20 lg:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-900/20 via-[#0a0a0a] to-[#0a0a0a]" />
        <div className="absolute top-20 right-20 w-72 h-72 bg-amber-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-amber-600/5 rounded-full blur-3xl" />
        
        <div className="container relative z-10 px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Content */}
            <div className="text-center lg:text-left space-y-8">
              <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/30 text-amber-400 px-5 py-2.5 rounded-full text-sm font-medium">
                <Sparkles className="w-4 h-4" />
                Esperienza Premium
              </div>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-light leading-tight tracking-tight">
                L'Arte dell'
                <span className="text-amber-400 font-normal block">Intimità Autentica</span>
              </h1>

              <p className="text-xl text-neutral-400 max-w-xl leading-relaxed">
                Una guida raffinata di <span className="text-amber-400">200+ pagine</span> che trasforma l'ansia da prestazione in connessione profonda.
              </p>

              <div className="space-y-4">
                {[
                  { icon: Brain, text: "70% psicologia e comunicazione" },
                  { icon: Target, text: "Anatomia scientifica reale" },
                  { icon: Heart, text: "Intimità prima della tecnica" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-4 justify-center lg:justify-start">
                    <div className="w-10 h-10 rounded-full bg-amber-500/10 flex items-center justify-center">
                      <item.icon className="w-5 h-5 text-amber-400" />
                    </div>
                    <span className="text-neutral-300">{item.text}</span>
                  </div>
                ))}
              </div>

              {/* Price Block */}
              <div className="bg-gradient-to-br from-neutral-900 to-neutral-900/50 rounded-3xl p-8 border border-amber-500/20 shadow-2xl shadow-amber-500/5">
                <div className="flex items-center justify-center gap-6 mb-6">
                  <span className="text-2xl text-neutral-500 line-through">{originalPrice}</span>
                  <span className="text-5xl font-light text-white">{price}</span>
                  <span className="bg-amber-500 text-black text-sm font-semibold px-4 py-1.5 rounded-full">-53%</span>
                </div>
                
                <Button 
                  onClick={handleBuyClick}
                  className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-black text-lg font-semibold py-7 rounded-2xl group shadow-lg shadow-amber-500/20"
                >
                  Accedi all'Esperienza Premium
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>

                <div className="mt-6 flex flex-wrap justify-center gap-6 text-sm text-neutral-500">
                  <span className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-amber-500" /> Download immediato</span>
                  <span className="flex items-center gap-2"><Shield className="w-4 h-4 text-amber-500" /> Pagamento sicuro</span>
                  <span className="flex items-center gap-2"><Clock className="w-4 h-4 text-amber-500" /> Garanzia 60 giorni</span>
                </div>
              </div>
            </div>

            {/* Product Images */}
            <div className="relative flex justify-center pb-8">
              <div className="absolute inset-0 bg-amber-500/10 rounded-full blur-3xl scale-75" />
              <div className="relative flex items-end justify-center">
                <img src={ebookMockup} alt="Ebook" className="w-72 sm:w-80 lg:w-96 drop-shadow-2xl -ml-8 sm:ml-0" style={{ filter: "drop-shadow(0 25px 60px rgba(245, 158, 11, 0.15))" }} />
                <div className="absolute bottom-0 -right-4 sm:-right-10">
                  <img src={bonusMockup} alt="Bonus" className="w-52 sm:w-60 lg:w-64 drop-shadow-xl" style={{ filter: "drop-shadow(0 20px 40px rgba(245, 158, 11, 0.1))" }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PAIN POINTS */}
      <section className="py-20 sm:py-24 bg-gradient-to-b from-[#0a0a0a] to-neutral-950">
        <div className="container px-4 sm:px-6">
          <div className="text-center mb-16">
            <span className="inline-block bg-amber-500/10 text-amber-400 px-5 py-2 rounded-full text-sm font-medium mb-6 border border-amber-500/20">
              Riconosciti
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-white">
              Ti Ritrovi in Queste
              <span className="text-amber-400 block">Situazioni?</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-5 max-w-5xl mx-auto">
            {painPoints.map((point, i) => (
              <div key={i} className="bg-neutral-900/50 rounded-2xl p-6 sm:p-7 border border-neutral-800 hover:border-amber-500/30 transition-all duration-300">
                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-xl bg-amber-500/10 flex items-center justify-center flex-shrink-0">
                    <XCircle className="w-5 h-5 text-amber-500" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-white mb-2">{point.title}</h3>
                    <p className="text-neutral-500 text-sm leading-relaxed">{point.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-14 text-center">
            <div className="bg-gradient-to-br from-neutral-900 to-neutral-900/50 border border-amber-500/20 rounded-3xl p-8 max-w-2xl mx-auto">
              <p className="text-white text-lg font-light mb-5">
                Se ti sei riconosciuto, questa guida è stata
                <span className="text-amber-400 font-normal"> creata per te.</span>
              </p>
              <Button onClick={handleBuyClick} className="bg-amber-500 hover:bg-amber-600 text-black font-semibold py-5 px-8 rounded-xl group">
                Esplora la Soluzione <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* WHY DIFFERENT */}
      <section className="py-20 sm:py-24 bg-neutral-950">
        <div className="container px-4 sm:px-6">
          <div className="text-center mb-16">
            <span className="inline-block bg-amber-500/10 text-amber-400 px-5 py-2 rounded-full text-sm font-medium mb-6 border border-amber-500/20">
              Differenza
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-white">
              Un Approccio
              <span className="text-amber-400 block">Completamente Diverso</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {uniqueFeatures.map((feature, i) => (
              <div key={i} className="bg-neutral-900/30 rounded-3xl p-8 border border-neutral-800 text-center hover:border-amber-500/30 transition-all duration-300">
                <div className="w-16 h-16 rounded-2xl bg-amber-500/10 flex items-center justify-center mx-auto mb-6">
                  <feature.icon className="w-8 h-8 text-amber-400" />
                </div>
                <h3 className="text-xl font-medium text-white mb-3">{feature.title}</h3>
                <p className="text-neutral-500 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TABLE OF CONTENTS */}
      <section className="py-20 sm:py-24 bg-[#0a0a0a]">
        <div className="container px-4 sm:px-6">
          <div className="text-center mb-16">
            <span className="inline-block bg-amber-500/10 text-amber-400 px-5 py-2 rounded-full text-sm font-medium mb-6 border border-amber-500/20">
              Contenuti
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-white mb-4">6 Capitoli Esclusivi</h2>
            <p className="text-neutral-500 max-w-2xl mx-auto text-lg">Un percorso raffinato dalla psicologia alle tecniche avanzate</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {sections.map((section, i) => (
              <div key={i} className="bg-neutral-900/30 rounded-2xl overflow-hidden border border-neutral-800 hover:border-amber-500/30 transition-all duration-300 group">
                <div className="bg-gradient-to-br from-amber-900/20 to-neutral-900 p-8 flex justify-center">
                  <img src={section.image} alt={section.title} className="w-36 h-auto rounded-lg shadow-lg group-hover:scale-105 transition-transform duration-300" loading="lazy" />
                </div>
                <div className="p-6">
                  <span className="text-amber-400 text-xs font-medium tracking-wider">CAPITOLO {i + 1}</span>
                  <h3 className="text-lg font-medium text-white mt-2">{section.title}</h3>
                  <p className="text-neutral-500 text-sm mt-1">{section.subtitle}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 bg-amber-500/5 border border-amber-500/20 rounded-2xl p-6 text-center max-w-3xl mx-auto">
            <p className="text-white font-light text-lg">
              <span className="text-amber-400">200+ pagine</span> · <span className="text-amber-400">25 capitoli</span> · <span className="text-amber-400">50+ esercizi</span>
            </p>
          </div>
        </div>
      </section>

      {/* VALUE PROPOSITION */}
      <section className="py-20 sm:py-24 bg-gradient-to-b from-neutral-950 to-[#0a0a0a]">
        <div className="container px-4 sm:px-6">
          <div className="text-center mb-16">
            <span className="inline-block bg-amber-500/10 text-amber-400 px-5 py-2 rounded-full text-sm font-medium mb-6 border border-amber-500/20">
              Valore Incluso
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-white">Cosa Riceverai</h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Main Ebook */}
            <div className="bg-gradient-to-br from-amber-900/20 to-neutral-900/50 rounded-3xl p-8 border border-amber-500/30 relative">
              <div className="absolute top-0 right-0 bg-amber-500 text-black px-5 py-1.5 text-sm font-semibold rounded-bl-2xl rounded-tr-3xl">PREMIUM</div>
              <div className="flex items-center gap-5 mb-6">
                <div className="w-16 h-16 rounded-2xl bg-amber-500/10 flex items-center justify-center">
                  <Book className="w-8 h-8 text-amber-400" />
                </div>
                <div>
                  <h3 className="text-2xl font-light text-white">Manuale Completo</h3>
                  <p className="text-amber-400">200+ pagine, 25 capitoli</p>
                </div>
              </div>
              <div className="bg-amber-500/10 rounded-2xl p-5 text-center">
                <span className="text-xl text-amber-400">Valore: €79</span>
              </div>
            </div>

            {/* Bonuses */}
            <div className="space-y-4">
              <div className="flex items-center gap-3 mb-6">
                <Gift className="w-6 h-6 text-amber-400" />
                <h3 className="text-2xl font-light text-white">6 Bonus Esclusivi</h3>
              </div>
              {bonuses.map((bonus, i) => (
                <div key={i} className="bg-neutral-900/30 rounded-xl p-4 border border-neutral-800 flex items-center justify-between hover:border-amber-500/30 transition-all">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg bg-amber-500/10 flex items-center justify-center">
                      <bonus.icon className="w-5 h-5 text-amber-400" />
                    </div>
                    <span className="text-white">{bonus.title}</span>
                  </div>
                  <span className="text-amber-400 font-medium">€{bonus.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Value Stack CTA */}
          <div className="mt-14 max-w-2xl mx-auto">
            <div className="bg-gradient-to-br from-neutral-900 to-neutral-900/50 rounded-3xl p-8 sm:p-10 border border-amber-500/20 text-center">
              <div className="space-y-3 mb-8 text-neutral-400">
                <div>Valore Ebook: <span className="text-white">€79</span></div>
                <div>Valore 6 Bonus: <span className="text-white">€{bonusTotal}</span></div>
                <div className="h-px bg-amber-500/20 my-4" />
                <div className="text-lg">Valore Totale: <span className="text-neutral-500 line-through">€{79 + bonusTotal}</span></div>
                <div className="text-4xl font-light text-white pt-2">Oggi: <span className="text-amber-400">{price}</span></div>
              </div>
              <Button onClick={handleBuyClick} className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-black text-lg font-semibold py-7 rounded-2xl group">
                Accedi a Tutto per {price}
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* SOCIAL PROOF */}
      <section className="py-20 sm:py-24 bg-neutral-950">
        <div className="container px-4 sm:px-6">
          <div className="text-center mb-16">
            <span className="inline-block bg-amber-500/10 text-amber-400 px-5 py-2 rounded-full text-sm font-medium mb-6 border border-amber-500/20">
              Testimonianze
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-white">Esperienze Reali</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {testimonials.map((t, i) => (
              <div key={i} className="bg-neutral-900/30 rounded-3xl p-7 border border-neutral-800">
                <Quote className="w-10 h-10 text-amber-500/20 mb-5" />
                <p className="text-neutral-300 italic mb-6 leading-relaxed">"{t.text}"</p>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-white">{t.name}</p>
                    <p className="text-sm text-neutral-500">{t.location}</p>
                  </div>
                  <div className="flex gap-1">
                    {Array.from({ length: t.rating }).map((_, j) => (
                      <Star key={j} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* IS FOR YOU */}
      <section className="py-20 sm:py-24 bg-[#0a0a0a]">
        <div className="container px-4 sm:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-white">Per Chi è Questa Guida</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <div className="bg-emerald-900/10 rounded-3xl p-8 border border-emerald-500/20">
              <div className="flex items-center gap-4 mb-8">
                <CheckCircle className="w-7 h-7 text-emerald-400" />
                <h3 className="text-2xl font-light text-white">È per te se...</h3>
              </div>
              <ul className="space-y-5">
                {forYou.map((item, i) => (
                  <li key={i} className="flex items-start gap-4">
                    <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <span className="text-neutral-300">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-neutral-900/30 rounded-3xl p-8 border border-neutral-800">
              <div className="flex items-center gap-4 mb-8">
                <XCircle className="w-7 h-7 text-neutral-500" />
                <h3 className="text-2xl font-light text-white">Non è per te se...</h3>
              </div>
              <ul className="space-y-5">
                {notForYou.map((item, i) => (
                  <li key={i} className="flex items-start gap-4">
                    <XCircle className="w-5 h-5 text-neutral-600 flex-shrink-0 mt-0.5" />
                    <span className="text-neutral-500">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 sm:py-24 bg-neutral-950">
        <div className="container px-4 sm:px-6 max-w-3xl">
          <div className="text-center mb-16">
            <span className="inline-block bg-amber-500/10 text-amber-400 px-5 py-2 rounded-full text-sm font-medium mb-6 border border-amber-500/20">FAQ</span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-white">Domande Frequenti</h2>
          </div>

          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, i) => (
              <AccordionItem key={i} value={`faq-${i}`} className="bg-neutral-900/30 rounded-2xl border border-neutral-800 px-6 data-[state=open]:border-amber-500/30">
                <AccordionTrigger className="text-left font-medium text-white hover:text-amber-400 py-6">{faq.question}</AccordionTrigger>
                <AccordionContent className="text-neutral-400 pb-6">{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* GUARANTEE */}
      <section className="py-20 sm:py-24 bg-[#0a0a0a]">
        <div className="container px-4 sm:px-6">
          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-br from-amber-900/20 to-neutral-900/50 rounded-[2rem] p-10 sm:p-14 border border-amber-500/30 text-center">
              <div className="w-24 h-24 rounded-full bg-amber-500/10 flex items-center justify-center mx-auto mb-8">
                <Shield className="w-12 h-12 text-amber-400" />
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-white mb-4">Garanzia 60 Giorni</h2>
              <p className="text-xl text-amber-400 mb-6">Soddisfazione Garantita</p>
              <p className="text-neutral-400 mb-10 max-w-xl mx-auto text-lg">
                Prova la guida con tranquillità. Se non è quello che cerchi, rimborso completo e tieni i bonus.
              </p>

              <div className="grid md:grid-cols-3 gap-5">
                {[
                  { icon: RefreshCcw, title: "Rimborso Completo", desc: "Entro 60 giorni" },
                  { icon: Gift, title: "Tieni i Bonus", desc: "Anche con rimborso" },
                  { icon: Mail, title: "Zero Domande", desc: "Processo semplice" },
                ].map((item, i) => (
                  <div key={i} className="bg-neutral-900/50 rounded-2xl p-6">
                    <item.icon className="w-7 h-7 text-amber-400 mx-auto mb-4" />
                    <h3 className="text-white font-medium mb-1">{item.title}</h3>
                    <p className="text-neutral-500 text-sm">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-20 sm:py-24 bg-gradient-to-b from-amber-900/30 to-[#0a0a0a]">
        <div className="container px-4 sm:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <Sparkles className="w-10 h-10 text-amber-400 mx-auto mb-6" />
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-white mb-6">
              Inizia il Tuo Percorso
              <span className="block text-amber-400">Verso l'Intimità Autentica</span>
            </h2>
            <p className="text-lg text-neutral-400 mb-10 max-w-xl mx-auto">
              Un investimento in te stesso e nella tua relazione che dura per sempre.
            </p>

            <div className="bg-neutral-900/50 rounded-3xl p-8 sm:p-10 border border-amber-500/20 mb-10">
              <div className="flex items-center justify-center gap-6 mb-6">
                <span className="text-2xl text-neutral-500 line-through">€204</span>
                <span className="text-5xl font-light text-white">{price}</span>
                <span className="bg-amber-500 text-black text-sm font-semibold px-4 py-1.5 rounded-full">-53%</span>
              </div>
              <Button onClick={handleBuyClick} className="w-full sm:w-auto bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-black text-xl font-semibold py-7 px-14 rounded-2xl group">
                Accedi Ora
                <ArrowRight className="w-6 h-6 ml-2 group-hover:translate-x-1" />
              </Button>
            </div>

            <div className="flex flex-wrap justify-center gap-8 text-sm text-neutral-500">
              <span className="flex items-center gap-2"><Shield className="w-4 h-4 text-amber-500" /> Pagamento Sicuro</span>
              <span className="flex items-center gap-2"><Download className="w-4 h-4 text-amber-500" /> Download Immediato</span>
              <span className="flex items-center gap-2"><Clock className="w-4 h-4 text-amber-500" /> Garanzia 60 Giorni</span>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-10 bg-[#0a0a0a] border-t border-neutral-800">
        <div className="container px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-neutral-500">
            <p>© {new Date().getFullYear()} Manuale dell'Idraulico Distratto. Tutti i diritti riservati.</p>
            <div className="flex items-center gap-8">
              <a href="#" className="hover:text-amber-400 transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-amber-400 transition-colors">Termini</a>
              <a href="#" className="hover:text-amber-400 transition-colors">Contatti</a>
            </div>
          </div>
        </div>
      </footer>

      {/* STICKY CTA */}
      {isStickyCTAVisible && (
        <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden">
          <div className="bg-[#0a0a0a]/95 backdrop-blur-lg border-t border-amber-500/30 px-4 py-4">
            <div className="flex items-center justify-between gap-4">
              <div className="flex flex-col">
                <span className="text-xs text-neutral-500 line-through">€79</span>
                <span className="text-xl font-light text-white">{price}</span>
              </div>
              <Button onClick={handleBuyClick} className="flex-1 max-w-[200px] bg-amber-500 hover:bg-amber-600 text-black font-semibold py-5 rounded-xl group">
                Accedi Ora
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1" />
              </Button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default IndexDark;