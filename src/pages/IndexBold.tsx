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
const beforeAfter = [
  { before: "Non sai se sta fingendo o se le è piaciuto davvero", after: "Sai esattamente quali segnali leggere per decifrare il suo corpo e le sue sensazioni" },
  { before: 'Durante il sesso hai mille pensieri ("Sto facendo bene? Quanto manca?")', after: "Sei completamente presente e riesci a goderti ogni secondo" },
  { before: "Cerchi risposte ai tuoi dubbi alle 2 di notte tra mille forum e siti poco affidabili", after: "Sai di avere nello stesso posto tutte le info che ti servono + step pratici da seguire" },
  { before: "Non sei mai riuscito a farla squirtare e ti sei arreso all'idea di non farlo mai", after: "Riesci a farla squirtare mentre continui a goderti il momento" },
  { before: "Hai paura di non reggere il confronto con le sue esperienze passate", after: "Hai massima sicurezza in te stesso per le tue capacità (e lei se ne accorge)" },
  { before: "Quando gli amici parlano di sesso vorresti cambiare discorso", after: "Non sei più quello che ascolta storie sul sesso, ma quello che le racconta" },
  { before: "Non sai dove mettere le mani e in che modo", after: "Sai esattamente dove toccare, in che modo e in quale sequenza" },
  { before: "Non distingui più tra la realtà e la finzione dei porno", after: "Conosci le basi dell'anatomia femminile e sai perfettamente cosa è reale e cosa no" },
  { before: "Vivi il sesso come un esame da superare", after: "Entrambi riuscite a godervi appieno il rapporto" },
];

const bulletPoints = [
  "I 2 punti specifici del suo corpo che la faranno impazzire ogni singola volta – con illustrazioni e spiegazioni pratiche…",
  "Quali sono i 12 errori più commessi tra le lenzuola e come evitarli definitivamente…",
  "La verità sullo squirting: perché NON è quello che ti hanno sempre raccontato…",
  "7 Segnali di Eccitazione che nessuno può fingere e che ti sveleranno il suo REALE livello di coinvolgimento…",
  "Le 5 posizioni anatomiche più efficaci per stimolarla nei punti giusti…",
  "Come impostare le condizioni ottimali per un rapporto appagante e soddisfacente al 100%...",
  "6 Tecniche Avanzate per fare in modo che qualunque ragazza si ricordi di te per tutta la vita…",
  "L'anatomia del piacere femminile che ti renderà l'amante più esperto che lei abbia mai visto in vita sua…",
  "Il singolo errore che bloccherà il suo squirting vanificando tutti i tuoi sforzi…",
  "Perché il 40% del risultato si decide ancora prima di toccarla, e come sfruttarlo a tuo vantaggio…",
  "Come gestire eventuali tentativi \"meno riusciti\" per viverla entrambi senza la minima ansia, stress e frustrazione…",
  "5 Metodi Scientifici per scacciare l'ansia da prestazione una volta per tutte…",
  "I Fondamenti Psicologici che ti permetteranno di goderti appieno il sesso – prima, durante e dopo…",
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
  { icon: ListChecks, title: "Checklist Completa per Ogni Situazione", value: 19, description: "Una lista precompilata – segnali da osservare, errori da evitare – che ti aiuterà a concentrarti su quello che stai facendo, invece di dover pensare se ti sei scordato qualcosa." },
  { icon: MessageSquare, title: "FAQ Estese con Risposte Complete", value: 24, description: "Ci hai provato più volte e non succede nulla. Lei sente dolore e non capisci perché. Ha paura di \"fare pipì\" e si blocca. Qui le risolverai tutte, una per una." },
  { icon: FileText, title: "Guida Rapida Risoluzione Problemi", value: 17, description: "Funziona come una mappa decisionale immediata: succede X, fai Y. Tienila a portata di mano per i momenti in cui qualcosa va storto." },
  { icon: Heart, title: "Esercizi Pratici per Lei", value: 29, description: "Il 40% del risultato dipende da quanto lei riesce ad abbandonarsi. Questa mini guida la aiuta a sviluppare consapevolezza corporea e rimuovere le inibizioni." },
  { icon: Smartphone, title: "App Utili per Coppie", value: 15, description: "La sessione perfetta si costruisce anche fuori dal letto. Selezione ragionata di app per creare anticipazione e migliorare la comunicazione." },
  { icon: LineChart, title: "Scheda di Tracking Progressi", value: 21, description: "Tieni traccia di cosa funziona, dei feedback di lei e dei cambiamenti nel tempo – così ogni sessione costruisce sulla precedente." },
];

const testimonials = [
  { name: "Luca M.", location: "34 anni, Torino", text: "Ero scettico, mi sembrava roba da disperati. L'ho comprato alle 11 di sera quasi per scommessa con me stesso. La parte sulla psicologia mi ha spiazzato perché non mi aspettavo che il problema fosse lì.", rating: 5 },
  { name: "Davide R.", location: "27 anni, Assago", text: "Sono single, quindi il contesto è diverso da chi ha una relazione fissa. Ma quello che ho trovato utile è soprattutto la parte sull'anatomia. Avevo delle lacune enormi che non avevo mai ammesso neanche a me.", rating: 5 },
  { name: "Marco T.", location: "41 anni, Imola", text: "Dopo 10 anni insieme mia moglie e io eravamo finiti in quel loop in cui il sesso funziona ma non è più niente di speciale. La cosa che mi ha colpito di più è stata la parte sulla comunicazione.", rating: 5 },
  { name: "Filippo C.", location: "25 anni, Udine", text: "La parte che mi ha aiutato di più non è quella sulle tecniche. È quella su come parlarne con lei. Non avevo idea di come si apre quel tipo di conversazione senza sembrare un cretino.", rating: 5 },
  { name: "Matteo B.", location: "29 anni, Treviglio", text: "Avevo già provato a cercare roba simile online. Forum, video, articoli. Il problema è che sono tutti pezzi scollegati. Qui per la prima volta ho trovato tutto in un posto solo, in un ordine che ha senso.", rating: 5 },
  { name: "Riccardo V.", location: "41 anni, Venezia", text: "Lo compri con un po' di imbarazzo, inutile negarlo. Ma poi lo apri e capisci subito che non è la solita roba. È scritto seriamente, ci sono fonti, ci sono spiegazioni vere. Mia moglie ha notato che qualcosa è cambiato in me.", rating: 5 },
];

const faqs = [
  { question: "In cosa è diverso dai video online?", answer: "Questa guida è strutturata: 70% psicologia/comunicazione, 30% tecnica. Basata su ricerca scientifica, non su consigli da forum." },
  { question: "Quanto tempo serve per vedere risultati?", answer: "Alcuni riportano miglioramenti nella prima settimana. Le strategie sono progettate per essere usate già dalla prossima occasione." },
  { question: "Posso leggerlo insieme alla mia partner?", answer: "Sì, e lo consigliamo. Il BONUS #4 è pensato apposta per essere condiviso con lei." },
  { question: "Cosa succede dopo l'acquisto?", answer: "Ricevi immediatamente email con i link per scaricare tutto. Puoi iniziare entro 2 minuti." },
  { question: "Posso ottenere il rimborso?", answer: "Sì. Hai 60 giorni interi per provare il protocollo. Se non sei soddisfatto, rimborso completo senza domande." },
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
  const originalPrice = "€99";
  const bonusTotal = bonuses.reduce((sum, b) => sum + b.value, 0);

  return (
    <main className="min-h-screen bg-black text-white overflow-x-hidden">
      {/* ANNOUNCEMENT BAR */}
      <div className="bg-red-600 text-white py-2.5 sm:py-4 text-center text-xs sm:text-base font-bold px-3 sm:px-4 animate-pulse leading-tight">
        ⚡ Offerta di Lancio – 71% di sconto + 6 Bonus GRATIS (valore €138) ⚡
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
                🔥 Offerta di Lancio – 71% di sconto
              </div>
              
              <h1 className="text-2xl sm:text-4xl lg:text-5xl xl:text-6xl font-black leading-tight">
                IL PROTOCOLLO
                <span className="text-red-500 block">DEL PIACERE</span>
              </h1>

              <p className="text-base sm:text-xl text-gray-300 max-w-xl mx-auto lg:mx-0">
                Scopri i "Giusti Tasti" da Toccare per Portare il Sesso al Livello Superiore e Farla Squirtare Ogni Volta che Vuoi… <span className="text-red-400 font-semibold">Senza Ansia, Senza Pressione e Senza Sentirti Inadeguato</span>
              </p>

              <div className="space-y-3">
                {[
                  { icon: FileText, text: "Strategie pratiche che potrai usare già dalla prossima occasione" },
                  { icon: Target, text: "Basato su riferimenti anatomici scientificamente accurati" },
                  { icon: Gift, text: "In REGALO 6 BONUS Esclusivi dal Valore Totale di €138" },
                  { icon: Shield, text: 'Garanzia 60 giorni "L\'hai Soddisfatta o ti Rimborsiamo"' },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 justify-center lg:justify-start">
                    <item.icon className="w-5 h-5 text-red-500 flex-shrink-0" />
                    <span className="text-gray-200 font-medium text-sm sm:text-base">{item.text}</span>
                  </div>
                ))}
              </div>

              {/* Price Block */}
              <div className="bg-gradient-to-r from-red-900/50 to-red-800/30 rounded-2xl p-4 sm:p-6 border-2 border-red-600/50">
                <div className="flex items-center justify-center gap-3 sm:gap-4 mb-4">
                  <span className="text-xl sm:text-2xl text-gray-400 line-through">{originalPrice}</span>
                  <span className="text-4xl sm:text-5xl font-black text-white">{price}</span>
                  <span className="bg-red-600 text-white text-xs sm:text-sm font-bold px-2.5 sm:px-3 py-1 rounded">-71%</span>
                </div>
                
                <Button 
                  onClick={handleBuyClick}
                  className="w-full bg-red-600 hover:bg-red-700 text-white text-sm sm:text-lg font-bold py-5 sm:py-6 rounded-xl group whitespace-normal leading-tight"
                >
                  Sì, Voglio il Protocollo + TUTTI i BONUS
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform flex-shrink-0" />
                </Button>

                <div className="mt-3 sm:mt-4 flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 text-xs sm:text-sm text-gray-400">
                  <span className="flex items-center gap-1"><CheckCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-red-500" /> Download immediato</span>
                  <span className="flex items-center gap-1"><Shield className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-red-500" /> Pagamento sicuro</span>
                  <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-red-500" /> Garanzia 60 giorni</span>
                </div>
              </div>
            </div>

            {/* Product Images */}
            <div className="relative flex justify-center pb-4 px-4">
              <div className="absolute inset-0 bg-red-600/20 rounded-full blur-3xl scale-75" />
              <div className="relative flex items-end justify-center gap-4 sm:gap-8 max-w-[340px] sm:max-w-none mx-auto">
                <img src={ebookMockup} alt="Ebook" className="w-48 sm:w-72 lg:w-80 drop-shadow-2xl" />
                <img src={bonusMockup} alt="Bonus" className="w-32 sm:w-48 lg:w-56 drop-shadow-xl" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* COSA SCOPRIRAI */}
      <section className="py-10 sm:py-20 bg-gradient-to-b from-black to-gray-900">
        <div className="container px-4 sm:px-6">
          <div className="text-center mb-12">
            <span className="inline-block bg-red-600/20 text-red-500 px-4 py-2 rounded-full text-sm font-bold mb-4 border border-red-600/30">
              📖 CONTENUTI
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-white">
              Ecco cosa scoprirai nel
              <span className="text-red-500 block">Protocollo del Piacere:</span>
            </h2>
          </div>

          <div className="max-w-3xl mx-auto space-y-3">
            {bulletPoints.map((point, i) => (
              <div key={i} className="flex items-start gap-3 bg-gray-900/50 rounded-xl p-4 border border-gray-800">
                <CheckCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                <span className="text-gray-200 text-sm sm:text-base leading-relaxed">{point}</span>
              </div>
            ))}
            <div className="bg-gray-900/50 rounded-xl p-4 border border-gray-800 text-center">
              <p className="text-red-400 font-bold text-base sm:text-lg">E molto, molto altro…</p>
              <p className="text-gray-400 text-sm mt-2">Oltre 200 pagine chiare e 25 capitoli guidati, 50+ esercizi pratici e illustrazioni per visualizzare e comprendere meglio.</p>
            </div>
          </div>

          <div className="mt-10 text-center">
            <Button onClick={handleBuyClick} className="bg-red-600 hover:bg-red-700 text-white font-bold py-5 px-8 text-sm sm:text-base group whitespace-normal">
              Sì, Voglio il Protocollo + TUTTI i BONUS (Valore €{99 + bonusTotal}) per soli {price}
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 flex-shrink-0" />
            </Button>
          </div>
        </div>
      </section>

      {/* NON TROVERAI NULLA DEL GENERE */}
      <section className="py-16 sm:py-20 bg-gray-900">
        <div className="container px-4 sm:px-6">
          <div className="text-center mb-12">
            <span className="inline-block bg-red-600/20 text-red-500 px-4 py-2 rounded-full text-sm font-bold mb-4">
              💡 PERCHÉ È UNICO
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-white">
              Non troverai nulla del genere
              <span className="text-red-500 block">su internet (né da nessun'altra parte)…</span>
            </h2>
          </div>

          <div className="max-w-3xl mx-auto mb-10">
            <p className="text-gray-400 text-sm sm:text-base leading-relaxed mb-6 text-center">
              Se volessi provare a ricostruire questi contenuti da solo, dovresti mettere insieme:
            </p>
            <div className="space-y-3">
              {[
                "Manuali universitari di anatomia per comprendere a fondo il piacere femminile…",
                "Un corso di terapia sessuale per smontare l'ansia da prestazione con metodi scientifici…",
                "Un libro sulla comunicazione intima di coppia per sapere cosa dire – e cosa non dire…",
                "Le tecniche pratiche di stimolazione sparse tra forum americani e libri in inglese…",
                "Le pratiche di mindfulness e rilassamento che i terapeuti usano per aiutare entrambi…",
                "E capire come incastrare tutto in una sequenza che funzioni nella realtà, non solo nella teoria.",
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3 bg-black/30 rounded-xl p-3 sm:p-4 border border-gray-800">
                  <span className="text-red-500 font-bold text-lg flex-shrink-0">•</span>
                  <span className="text-gray-300 text-xs sm:text-sm">{item}</span>
                </div>
              ))}
            </div>
            <p className="text-gray-400 text-sm sm:text-base leading-relaxed mt-6 text-center">
              Anche se tu riuscissi a trovare tutto, ci vorrebbero <span className="text-white font-bold">mesi</span>. E nel frattempo continueresti a fare esattamente quello che stai facendo adesso.
            </p>
            <p className="text-red-400 font-bold text-center mt-4 text-sm sm:text-base">
              Oppure puoi ricevere tutto ciò in questo esatto momento – già tradotto in italiano, in sequenza, con illustrazioni e 6 BONUS in regalo – per soli {price} iva inclusa.
            </p>
          </div>

          <div className="text-center">
            <Button onClick={handleBuyClick} className="bg-red-600 hover:bg-red-700 text-white font-bold py-5 px-8 text-sm sm:text-base group whitespace-normal">
              Sì, Voglio il Protocollo + TUTTI i BONUS per soli {price}
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 flex-shrink-0" />
            </Button>
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
                  <h3 className="text-xl font-bold text-white">Il Protocollo del Piacere</h3>
                  <p className="text-red-500 font-medium">200+ pagine, 25 capitoli</p>
                </div>
              </div>
              <div className="bg-red-600/10 rounded-xl p-4 text-center">
                <span className="text-xl font-bold text-red-500">Valore: €99</span>
              </div>
            </div>

            {/* Bonuses */}
            <div className="space-y-3">
              <div className="flex items-center gap-3 mb-4">
                <Gift className="w-6 h-6 text-red-500" />
                <h3 className="text-xl font-bold text-white">6 Bonus GRATIS</h3>
              </div>
              {bonuses.map((bonus, i) => (
                <div key={i} className="bg-gray-900/50 rounded-xl p-4 border border-gray-800">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <bonus.icon className="w-5 h-5 text-red-500" />
                      <span className="text-white font-medium text-sm sm:text-base">{bonus.title}</span>
                    </div>
                    <span className="text-red-500 font-bold text-sm">€{bonus.value}</span>
                  </div>
                  <p className="text-gray-500 text-xs sm:text-sm leading-relaxed pl-8">{bonus.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Value Stack CTA */}
          <div className="mt-12 max-w-2xl mx-auto">
            <div className="bg-gradient-to-r from-red-900/50 to-red-800/30 rounded-2xl p-5 sm:p-8 border-2 border-red-600/50 text-center">
              <div className="space-y-2 mb-6 text-gray-400">
                <div>Valore Protocollo: <span className="text-white">€99</span></div>
                <div>Valore 6 Bonus: <span className="text-white">€{bonusTotal}</span></div>
                <div className="h-px bg-red-600/30 my-3" />
                <div className="text-lg">Valore Totale: <span className="text-gray-500 line-through">€{99 + bonusTotal}</span></div>
                <div className="text-2xl sm:text-3xl font-black text-white">Oggi: <span className="text-red-500">{price}</span></div>
              </div>
              <Button onClick={handleBuyClick} className="w-full bg-red-600 hover:bg-red-700 text-white text-sm sm:text-base font-bold py-5 sm:py-6 group whitespace-normal leading-tight">
                Sì, Voglio il Protocollo + TUTTI i BONUS (Valore €{99 + bonusTotal}) per soli {price}
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 flex-shrink-0" />
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
            <h2 className="text-2xl sm:text-4xl font-black text-white">Cosa Dice Chi Ha Acquistato Questo Protocollo?</h2>
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

      {/* PRIMA vs DOPO */}
      <section className="py-16 sm:py-20 bg-black">
        <div className="container px-4 sm:px-6">
          <div className="text-center mb-12">
            <span className="inline-block bg-red-600/20 text-red-500 px-4 py-2 rounded-full text-sm font-bold mb-4">
              🔄 TRASFORMAZIONE
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-white">
              Prima vs Dopo
              <span className="text-red-500 block">il Protocollo del Piacere</span>
            </h2>
          </div>

          <div className="max-w-4xl mx-auto space-y-3">
            {/* Header */}
            <div className="hidden sm:grid grid-cols-2 gap-3 mb-2">
              <div className="text-center font-bold text-red-500 text-sm uppercase tracking-wide">❌ Prima</div>
              <div className="text-center font-bold text-green-500 text-sm uppercase tracking-wide">✅ Dopo</div>
            </div>
            {beforeAfter.map((item, i) => (
              <div key={i} className="grid sm:grid-cols-2 gap-2 sm:gap-3">
                <div className="bg-red-900/20 rounded-xl p-3 sm:p-4 border border-red-900/30">
                  <div className="flex items-start gap-2">
                    <XCircle className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-400 text-xs sm:text-sm">{item.before}</span>
                  </div>
                </div>
                <div className="bg-green-900/20 rounded-xl p-3 sm:p-4 border border-green-900/30">
                  <div className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-300 text-xs sm:text-sm">{item.after}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 sm:py-20 bg-gray-900">
        <div className="container px-4 sm:px-6 max-w-3xl">
          <div className="text-center mb-12">
            <span className="inline-block bg-red-600/20 text-red-500 px-4 py-2 rounded-full text-sm font-bold mb-4">❓ FAQ</span>
            <h2 className="text-2xl sm:text-4xl font-black text-white">Domande Frequenti</h2>
          </div>

          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((faq, i) => (
              <AccordionItem key={i} value={`faq-${i}`} className="bg-black/50 rounded-xl border border-gray-800 px-4 sm:px-5">
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
            <div className="bg-gradient-to-br from-red-900/30 to-gray-900 rounded-3xl p-6 sm:p-12 border-2 border-red-600/50 text-center">
              <div className="w-20 h-20 rounded-full bg-red-600/20 flex items-center justify-center mx-auto mb-6">
                <Shield className="w-10 h-10 text-red-500" />
              </div>
              <h2 className="text-2xl sm:text-4xl font-black text-white mb-3">"L'Hai Soddisfatta o Ti Rimborsiamo"</h2>
              <p className="text-xl text-red-500 font-bold mb-4">GARANZIA DEL 100%</p>
              <p className="text-gray-400 mb-4 max-w-xl mx-auto text-sm sm:text-base leading-relaxed">
                Il rischio di questo acquisto è tutto nostro, non tuo. Hai <span className="text-white font-bold">60 giorni interi</span> per leggere il protocollo, applicare quello che trovi e vedere con i tuoi occhi cosa cambia.
              </p>
              <p className="text-gray-400 mb-8 max-w-xl mx-auto text-sm sm:text-base leading-relaxed">
                Se non sei soddisfatto – per qualsiasi motivo, anche uno che non ci vuoi spiegare – ti rimborsiamo il 100%. Senza domande. Senza moduli da compilare.
              </p>

              <div className="grid grid-cols-3 gap-3 sm:gap-4">
                {[
                  { icon: RefreshCcw, title: "Rimborso Completo", desc: "Entro 60 giorni" },
                  { icon: Gift, title: "Tieni i Bonus", desc: "Anche se chiedi rimborso" },
                  { icon: Mail, title: "Nessuna Domanda", desc: "Basta una mail" },
                ].map((item, i) => (
                  <div key={i} className="bg-black/50 rounded-xl p-3 sm:p-5">
                    <item.icon className="w-6 h-6 sm:w-7 sm:h-7 text-red-500 mx-auto mb-2 sm:mb-3" />
                    <h3 className="text-white font-bold text-sm sm:text-base mb-1">{item.title}</h3>
                    <p className="text-gray-500 text-xs sm:text-sm">{item.desc}</p>
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
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white mb-6">
              Hai solo 2 possibilità:
              <span className="block text-red-300 text-lg sm:text-2xl lg:text-3xl mt-2">O esci con un sistema che cambia la tua vita sessuale per sempre… o esci con gli stessi 29€ in tasca.</span>
            </h2>
            <p className="text-base sm:text-lg text-red-100/80 mb-8 max-w-xl mx-auto">
              L'unico scenario in cui ci perdi, è quello in cui continui a fare quello che hai sempre fatto… aspettandoti come per magia dei risultati diversi.
            </p>

            <div className="bg-black/30 rounded-2xl p-5 sm:p-8 border border-red-600/30 mb-8">
              <div className="flex items-center justify-center gap-3 sm:gap-4 mb-4">
                <span className="text-xl sm:text-2xl text-red-300 line-through">€{99 + bonusTotal}</span>
                <span className="text-4xl sm:text-5xl font-black text-white">{price}</span>
                <span className="bg-white text-red-600 text-xs sm:text-sm font-bold px-2.5 sm:px-3 py-1 rounded">-71%</span>
              </div>
              <Button onClick={handleBuyClick} className="w-full sm:w-auto bg-white text-red-600 hover:bg-gray-100 text-sm sm:text-lg font-black py-6 sm:py-7 px-6 sm:px-12 group whitespace-normal leading-tight">
                Sì, Voglio il Protocollo + TUTTI i BONUS
                <ArrowRight className="w-6 h-6 ml-2 group-hover:translate-x-1 flex-shrink-0" />
              </Button>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 text-xs sm:text-sm text-red-200">
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
            <p>© {new Date().getFullYear()} Il Protocollo del Piacere. Tutti i diritti riservati.</p>
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
                <span className="text-xs text-gray-500 line-through">€99</span>
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