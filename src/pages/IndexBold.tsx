import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useStripeCheckout } from "@/hooks/useStripeCheckout";
import { 
  ArrowRight, CheckCircle, Shield, Clock, Brain, Target, Heart, Gift, 
  XCircle, X, MessageSquare, Book, FileText, ListChecks, Smartphone, 
  LineChart, BookOpen, FlaskConical, Star, Quote, RefreshCcw, Mail, Download,
  ChevronDown
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

const IndexBold = () => {
  const [isStickyCTAVisible, setIsStickyCTAVisible] = useState(false);
  const { startCheckout } = useStripeCheckout();

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
    void startCheckout(false, true);
  };

  const price = "€29";
  const originalPrice = "€79";
  const bonusTotal = bonuses.reduce((sum, b) => sum + b.value, 0);

  return (
    <main className="min-h-screen bg-black text-white overflow-x-hidden">
      {/* ANNOUNCEMENT BAR */}
      <div className="bg-red-600 text-white py-2.5 sm:py-4 text-center text-xs sm:text-base font-bold px-3 sm:px-4 animate-pulse leading-tight">
        ⚡ OFFERTA LIMITATA: 53% di SCONTO + 6 Bonus GRATIS (valore €125) - SOLO OGGI! ⚡
      </div>

      {/* HERO SECTION */}
      <section className="relative py-12 sm:py-16 lg:py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-red-900/30 via-black to-black" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-red-600/20 rounded-full blur-3xl" />
        
        <div className="container relative z-10 px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Content */}
            <div className="text-center lg:text-left space-y-6">
              <div className="inline-block bg-red-600 text-white px-4 py-2 rounded-full text-sm font-bold uppercase tracking-wide">
                🔥 Best Seller 2024
              </div>
              
              <h1 className="text-2xl sm:text-4xl lg:text-5xl xl:text-6xl font-black leading-tight">
                BASTA ANSIA.
                <span className="text-red-500 block">BASTA PRESSIONE.</span>
                <span className="text-red-400 block text-2xl sm:text-3xl lg:text-4xl mt-2">È Ora di Cambiare.</span>
              </h1>

              <p className="text-base sm:text-xl text-gray-300 max-w-xl mx-auto lg:mx-0">
                La guida scientifica di <span className="text-red-500 font-bold">200+ pagine</span> che elimina l'ansia da prestazione e trasforma il sesso da missione a connessione.
              </p>

              <div className="space-y-3">
                {[
                  { icon: Brain, text: "70% psicologia, 30% tecnica" },
                  { icon: Target, text: "Anatomia reale, non porno" },
                  { icon: Heart, text: "Connessione, non performance" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 justify-center lg:justify-start">
                    <item.icon className="w-5 h-5 text-red-500" />
                    <span className="text-gray-200 font-medium">{item.text}</span>
                  </div>
                ))}
              </div>

              {/* Price Block */}
              <div className="bg-gradient-to-r from-red-900/50 to-red-800/30 rounded-2xl p-4 sm:p-6 border-2 border-red-600/50">
                <div className="flex items-center justify-center gap-3 sm:gap-4 mb-4">
                  <span className="text-xl sm:text-2xl text-gray-400 line-through">{originalPrice}</span>
                  <span className="text-4xl sm:text-5xl font-black text-white">{price}</span>
                  <span className="bg-red-600 text-white text-xs sm:text-sm font-bold px-2.5 sm:px-3 py-1 rounded">-53%</span>
                </div>
                
                <Button 
                  onClick={handleBuyClick}
                  className="w-full bg-red-600 hover:bg-red-700 text-white text-base sm:text-lg font-bold py-5 sm:py-6 rounded-xl group"
                >
                  🔥 OTTIENI ACCESSO IMMEDIATO
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>

                <div className="mt-3 sm:mt-4 flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 text-xs sm:text-sm text-gray-400">
                  <span className="flex items-center gap-1"><CheckCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-red-500" /> Download immediato</span>
                  <span className="flex items-center gap-1"><Shield className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-red-500" /> Pagamento sicuro</span>
                  <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-red-500" /> Garanzia 60 giorni</span>
                </div>
              </div>
            </div>

            {/* Product Images */}
            <div className="relative flex justify-center pb-8 px-4">
              <div className="absolute inset-0 bg-red-600/20 rounded-full blur-3xl scale-75" />
              <div className="relative flex items-end justify-center max-w-[320px] sm:max-w-none mx-auto">
                <img src={ebookMockup} alt="Ebook" className="w-52 sm:w-72 lg:w-80 drop-shadow-2xl" />
                <div className="absolute bottom-0 -right-2 sm:-right-8">
                  <img src={bonusMockup} alt="Bonus" className="w-36 sm:w-52 lg:w-56 drop-shadow-xl" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PAIN POINTS */}
      <section className="py-16 sm:py-20 bg-gradient-to-b from-black to-gray-900">
        <div className="container px-4 sm:px-6">
          <div className="text-center mb-12">
            <span className="inline-block bg-red-600/20 text-red-500 px-4 py-2 rounded-full text-sm font-bold mb-4 border border-red-600/30">
              ⚠️ ATTENZIONE
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-white">
              Ti Riconosci in Almeno Una
              <span className="text-red-500 block">di Queste Situazioni?</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-4 sm:gap-6 max-w-5xl mx-auto">
            {painPoints.map((point, i) => (
              <div key={i} className="bg-gray-900/80 rounded-xl p-4 sm:p-6 border border-red-900/30 hover:border-red-600/50 transition-all">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-red-600/20 flex items-center justify-center flex-shrink-0">
                    <XCircle className="w-5 h-5 text-red-500" />
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-white mb-2">{point.title}</h3>
                    <p className="text-gray-400 text-sm leading-relaxed">{point.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <div className="bg-red-600/10 border-2 border-red-600/50 rounded-2xl p-6 max-w-2xl mx-auto">
              <p className="text-white text-lg font-medium mb-4">
                Se ti sei riconosciuto in almeno 2 punti,
                <span className="text-red-500 font-bold"> questa guida è per te.</span>
              </p>
              <Button onClick={handleBuyClick} className="bg-red-600 hover:bg-red-700 text-white font-bold py-4 px-8 group">
                Scopri la Soluzione <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* WHY DIFFERENT */}
      <section className="py-16 sm:py-20 bg-gray-900">
        <div className="container px-4 sm:px-6">
          <div className="text-center mb-12">
            <span className="inline-block bg-red-600/20 text-red-500 px-4 py-2 rounded-full text-sm font-bold mb-4">
              💡 PERCHÉ È DIVERSA
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-white">
              Non è l'Ennesima Guida
              <span className="text-red-500 block">Trovata Online</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {uniqueFeatures.map((feature, i) => (
              <div key={i} className="bg-black/50 rounded-2xl p-5 sm:p-8 border border-gray-800 text-center hover:border-red-600/50 transition-all">
                <div className="w-16 h-16 rounded-2xl bg-red-600/20 flex items-center justify-center mx-auto mb-5">
                  <feature.icon className="w-8 h-8 text-red-500" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-white mb-3">{feature.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TABLE OF CONTENTS */}
      <section className="py-16 sm:py-20 bg-black">
        <div className="container px-4 sm:px-6">
          <div className="text-center mb-12">
            <span className="inline-block bg-red-600/20 text-red-500 px-4 py-2 rounded-full text-sm font-bold mb-4">
              📚 CONTENUTI
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-white mb-4">6 Sezioni Complete</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">Un percorso strutturato dalle basi psicologiche alle tecniche avanzate</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-5 max-w-6xl mx-auto">
            {sections.map((section, i) => (
              <div key={i} className="bg-gray-900/50 rounded-xl overflow-hidden border border-gray-800 hover:border-red-600/50 transition-all group">
                <div className="bg-gradient-to-br from-red-900/30 to-gray-900 p-6 flex justify-center">
                  <img src={section.image} alt={section.title} className="w-32 h-auto rounded-lg shadow-lg group-hover:scale-105 transition-transform" loading="lazy" />
                </div>
                <div className="p-3 sm:p-5">
                  <span className="bg-red-600 text-white text-[10px] sm:text-xs font-bold px-2 py-0.5 sm:py-1 rounded">PARTE {i + 1}</span>
                  <h3 className="text-sm sm:text-lg font-bold text-white mt-2">{section.title}</h3>
                  <p className="text-red-400 text-xs sm:text-sm">{section.subtitle}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 bg-red-600/10 border border-red-600/30 rounded-2xl p-4 sm:p-6 text-center max-w-3xl mx-auto">
            <p className="text-white font-medium text-sm sm:text-lg">
              <span className="text-red-500 font-bold">200+ pagine</span>, <span className="text-red-500 font-bold">25 capitoli</span>, <span className="text-red-500 font-bold">50+ esercizi</span>
            </p>
          </div>
        </div>
      </section>

      {/* VALUE PROPOSITION */}
      <section className="py-16 sm:py-20 bg-gradient-to-b from-gray-900 to-black">
        <div className="container px-4 sm:px-6">
          <div className="text-center mb-12">
            <span className="inline-block bg-red-600/20 text-red-500 px-4 py-2 rounded-full text-sm font-bold mb-4">
              🎁 COSA RICEVI
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-white">Oltre all'Ebook</h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Main Ebook */}
            <div className="bg-gradient-to-br from-red-900/30 to-gray-900 rounded-2xl p-6 sm:p-8 border-2 border-red-600/50 relative">
              <div className="absolute top-0 right-0 bg-red-600 text-white px-3 sm:px-4 py-1 text-xs sm:text-sm font-bold rounded-bl-xl">PRINCIPALE</div>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-xl bg-red-600/20 flex items-center justify-center">
                  <Book className="w-7 h-7 text-red-500" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">Manuale Completo</h3>
                  <p className="text-red-500 font-medium">200+ pagine, 25 capitoli</p>
                </div>
              </div>
              <div className="bg-red-600/10 rounded-xl p-4 text-center">
                <span className="text-xl font-bold text-red-500">Valore: €79</span>
              </div>
            </div>

            {/* Bonuses */}
            <div className="space-y-3">
              <div className="flex items-center gap-3 mb-4">
                <Gift className="w-6 h-6 text-red-500" />
                <h3 className="text-xl font-bold text-white">6 Bonus GRATIS</h3>
              </div>
              {bonuses.map((bonus, i) => (
                <div key={i} className="bg-gray-900/50 rounded-xl p-4 border border-gray-800 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <bonus.icon className="w-5 h-5 text-red-500" />
                    <span className="text-white font-medium">{bonus.title}</span>
                  </div>
                  <span className="text-red-500 font-bold">€{bonus.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Value Stack CTA */}
          <div className="mt-12 max-w-2xl mx-auto">
            <div className="bg-gradient-to-r from-red-900/50 to-red-800/30 rounded-2xl p-5 sm:p-8 border-2 border-red-600/50 text-center">
              <div className="space-y-2 mb-6 text-gray-400">
                <div>Valore Ebook: <span className="text-white">€79</span></div>
                <div>Valore 6 Bonus: <span className="text-white">€{bonusTotal}</span></div>
                <div className="h-px bg-red-600/30 my-3" />
                <div className="text-lg">Valore Totale: <span className="text-gray-500 line-through">€{79 + bonusTotal}</span></div>
                <div className="text-2xl sm:text-3xl font-black text-white">Oggi: <span className="text-red-500">{price}</span></div>
              </div>
              <Button onClick={handleBuyClick} className="w-full bg-red-600 hover:bg-red-700 text-white text-lg font-bold py-6 group">
                🔥 OTTIENI TUTTO A {price}
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* SOCIAL PROOF */}
      <section className="py-16 sm:py-20 bg-gray-900">
        <div className="container px-4 sm:px-6">
          <div className="text-center mb-12">
            <span className="inline-block bg-red-600/20 text-red-500 px-4 py-2 rounded-full text-sm font-bold mb-4">
              ⭐ TESTIMONIANZE
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-white">Cosa Dicono i Lettori</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {testimonials.map((t, i) => (
              <div key={i} className="bg-black/50 rounded-2xl p-6 border border-gray-800">
                <Quote className="w-8 h-8 text-red-600/30 mb-4" />
                <p className="text-gray-300 italic mb-5">"{t.text}"</p>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-white">{t.name}</p>
                    <p className="text-sm text-gray-500">{t.location}</p>
                  </div>
                  <div className="flex gap-0.5">
                    {Array.from({ length: t.rating }).map((_, j) => (
                      <Star key={j} className="w-4 h-4 fill-red-500 text-red-500" />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* IS FOR YOU */}
      <section className="py-16 sm:py-20 bg-black">
        <div className="container px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-black text-white">Per Chi è Questa Guida</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            <div className="bg-green-900/20 rounded-2xl p-6 sm:p-8 border-2 border-green-600/30">
              <div className="flex items-center gap-3 mb-6">
                <CheckCircle className="w-6 h-6 text-green-500" />
                <h3 className="text-xl font-bold text-white">È per te se...</h3>
              </div>
              <ul className="space-y-4">
                {forYou.map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-300">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-red-900/20 rounded-2xl p-6 sm:p-8 border border-red-900/30">
              <div className="flex items-center gap-3 mb-6">
                <XCircle className="w-6 h-6 text-red-500" />
                <h3 className="text-xl font-bold text-white">Non è per te se...</h3>
              </div>
              <ul className="space-y-4">
                {notForYou.map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <XCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-500">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 sm:py-20 bg-gray-900">
        <div className="container px-4 sm:px-6 max-w-3xl">
          <div className="text-center mb-12">
            <span className="inline-block bg-red-600/20 text-red-500 px-4 py-2 rounded-full text-sm font-bold mb-4">❓ FAQ</span>
            <h2 className="text-3xl sm:text-4xl font-black text-white">Domande Frequenti</h2>
          </div>

          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((faq, i) => (
              <AccordionItem key={i} value={`faq-${i}`} className="bg-black/50 rounded-xl border border-gray-800 px-5">
                <AccordionTrigger className="text-left font-semibold text-white hover:text-red-500 py-5">{faq.question}</AccordionTrigger>
                <AccordionContent className="text-gray-400 pb-5">{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* GUARANTEE */}
      <section className="py-16 sm:py-20 bg-black">
        <div className="container px-4 sm:px-6">
          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-br from-red-900/30 to-gray-900 rounded-3xl p-8 sm:p-12 border-2 border-red-600/50 text-center">
              <div className="w-20 h-20 rounded-full bg-red-600/20 flex items-center justify-center mx-auto mb-6">
                <Shield className="w-10 h-10 text-red-500" />
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-white mb-3">Garanzia 60 Giorni</h2>
              <p className="text-xl text-red-500 font-bold mb-4">RISCHIO ZERO</p>
              <p className="text-gray-400 mb-8 max-w-xl mx-auto">
                Prova la guida con calma. Se non fa per te, rimborso completo. E tieni comunque tutti i bonus.
              </p>

              <div className="grid md:grid-cols-3 gap-4">
                {[
                  { icon: RefreshCcw, title: "Rimborso Completo", desc: "Entro 60 giorni" },
                  { icon: Gift, title: "Tieni i Bonus", desc: "Anche se chiedi rimborso" },
                  { icon: Mail, title: "Nessuna Domanda", desc: "Basta una mail" },
                ].map((item, i) => (
                  <div key={i} className="bg-black/50 rounded-xl p-5">
                    <item.icon className="w-7 h-7 text-red-500 mx-auto mb-3" />
                    <h3 className="text-white font-bold mb-1">{item.title}</h3>
                    <p className="text-gray-500 text-sm">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-16 sm:py-20 bg-gradient-to-b from-red-900 to-red-950">
        <div className="container px-4 sm:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-6">
              È ORA DI AGIRE.
              <span className="block text-red-300">Non Domani. ADESSO.</span>
            </h2>
            <p className="text-lg text-red-100/80 mb-8 max-w-xl mx-auto">
              Puoi continuare come prima, o puoi cambiare. La scelta è tua.
            </p>

            <div className="bg-black/30 rounded-2xl p-6 sm:p-8 border border-red-600/30 mb-8">
              <div className="flex items-center justify-center gap-4 mb-4">
                <span className="text-2xl text-red-300 line-through">€204</span>
                <span className="text-5xl font-black text-white">{price}</span>
                <span className="bg-white text-red-600 text-sm font-bold px-3 py-1 rounded">-53%</span>
              </div>
              <Button onClick={handleBuyClick} className="w-full sm:w-auto bg-white text-red-600 hover:bg-gray-100 text-xl font-black py-7 px-12 group">
                SÌ, VOGLIO INIZIARE ORA!
                <ArrowRight className="w-6 h-6 ml-2 group-hover:translate-x-1" />
              </Button>
            </div>

            <div className="flex flex-wrap justify-center gap-6 text-sm text-red-200">
              <span className="flex items-center gap-2"><Shield className="w-4 h-4" /> Pagamento Sicuro</span>
              <span className="flex items-center gap-2"><Download className="w-4 h-4" /> Download Immediato</span>
              <span className="flex items-center gap-2"><Clock className="w-4 h-4" /> Garanzia 60 Giorni</span>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-8 bg-black border-t border-gray-800">
        <div className="container px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-500">
            <p>© {new Date().getFullYear()} Manuale dell'Idraulico Distratto. Tutti i diritti riservati.</p>
            <div className="flex items-center gap-6">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Termini</a>
              <a href="#" className="hover:text-white transition-colors">Contatti</a>
            </div>
          </div>
        </div>
      </footer>

      {/* STICKY CTA */}
      {isStickyCTAVisible && (
        <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden">
          <div className="bg-black/95 backdrop-blur-lg border-t border-red-600/50 px-4 py-3">
            <div className="flex items-center justify-between gap-3">
              <div className="flex flex-col">
                <span className="text-xs text-gray-500 line-through">€79</span>
                <span className="text-xl font-bold text-white">{price}</span>
              </div>
              <Button onClick={handleBuyClick} className="flex-1 max-w-[200px] bg-red-600 hover:bg-red-700 text-white font-bold py-4 group">
                🔥 Accesso Immediato
                <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1" />
              </Button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default IndexBold;