import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useStripeCheckout } from "@/hooks/useStripeCheckout";
import { 
  ArrowRight, CheckCircle, Shield, Clock, Target, Heart, Gift, 
  X, MessageSquare, FileText, ListChecks, Smartphone, 
  LineChart, Book, Star, Quote, RefreshCcw, Mail, Download
} from "lucide-react";
import protocolloCover from "@/assets/protocollo-cover-transparent.png";
import { PrePurchaseSidebar } from "@/components/landing/PrePurchaseSidebar";

// ============ DATA ============
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

const bonuses = [
  { icon: ListChecks, title: "Checklist Completa per Ogni Situazione", value: 19, description: "Prima di un momento intimo la testa può andare in mille direzioni… Ma con questa checklist pratica, non dovrai più pensare a cosa fare e cosa non fare. Avrai una lista precompilata – segnali da osservare, errori da evitare – che ti aiuterà a concentrarti su quello che stai facendo." },
  { icon: MessageSquare, title: "FAQ Estese con Risposte Complete", value: 24, description: "Ci hai provato più volte e non succede nulla. Lei sente dolore e non capisci perché. Ha paura di \"fare pipì\" e si blocca ogni volta che ci va vicino. Queste sono le domande a cui non trovi risposte sui forum. Qui le risolverai tutte, una per una." },
  { icon: FileText, title: "Guida Rapida Risoluzione Problemi", value: 17, description: "Non è il momento di sfogliare 200 pagine. Questa guida funziona come una mappa decisionale immediata: succede X, fai Y. Tienila a portata di mano per i momenti in cui qualcosa va storto e hai bisogno della risposta giusta nell'immediato." },
  { icon: Heart, title: "Esercizi Pratici per Lei", value: 29, description: "Il 40% del risultato dipende da quanto lei riesce ad abbandonarsi. Questa mini guida – pensata per essere condivisa con la tua partner – la aiuta a sviluppare consapevolezza corporea, rimuovere le inibizioni e dirti cosa sente davvero. Meno blocchi da parte sua significa meno sforzo da parte tua." },
  { icon: Smartphone, title: "App Utili per Coppie", value: 15, description: "La sessione perfetta si costruisce anche fuori dal letto. Questa selezione ragionata di app ti aiuta a creare anticipazione, migliorare la comunicazione e mantenere alta l'intimità nel tempo, senza trasformarsi nell'ennesima fonte di pressione." },
  { icon: LineChart, title: "Scheda di Tracking Progressi", value: 21, description: "Con questo template tieni traccia di cosa funziona, dei feedback di lei e dei cambiamenti nel tempo – così ogni sessione costruisce sulla precedente invece di ripartire da zero." },
];

const testimonials = [
  { name: "Luca M.", location: "34 anni, Torino", text: "Ero scettico, mi sembrava roba da disperati. L'ho comprato alle 11 di sera quasi per scommessa con me stesso. La parte sulla psicologia mi ha spiazzato perché non mi aspettavo che il problema fosse lì. Pensavo di dover imparare tecniche nuove. Invece ho capito che mi sabotavo io da solo, ancora prima di iniziare.", rating: 5 },
  { name: "Davide R.", location: "27 anni, Assago", text: "Sono single, quindi il contesto è diverso da chi ha una relazione fissa. Ma quello che ho trovato utile è soprattutto la parte sull'anatomia. Avevo delle lacune enormi che non avevo mai ammesso neanche a me. Adesso quando sto con una ragazza so quello che sto facendo.", rating: 5 },
  { name: "Marco T.", location: "41 anni, Imola", text: "Dopo 10 anni insieme mia moglie e io eravamo finiti in quel loop in cui il sesso funziona ma non è più niente di speciale. Nessuno dei due lo diceva, ma si sentiva. La cosa che mi ha colpito di più è stata la parte sulla comunicazione. Non avevo idea che quello che succede fuori dalla camera da letto impattasse così tanto quello che succede dentro.", rating: 5 },
  { name: "Filippo C.", location: "25 anni, Udine", text: "La parte che mi ha aiutato di più non è quella sulle tecniche. È quella su come parlarne con lei. Non avevo idea di come si apre quel tipo di conversazione senza sembrare un cretino o metterla a disagio. I capitoli iniziali li ho letti tre volte. Non esagero.", rating: 5 },
  { name: "Federico G.", location: "32 anni, Reggio Calabria", text: "È la prima volta che qualcuno spiega in modo chiaro cosa succede nella testa durante il sesso e perché peggiora tutto. Adesso abbiamo un dialogo che prima non avevamo mai avuto. Il resto è venuto da solo.", rating: 5 },
  { name: "Giuseppe A.", location: "36 anni, Bari", text: "È cambiato qualcosa già nelle prime settimane. Adesso la situazione è diversa. Lei è diversa. O forse sono io che sono diverso con lei. Non lo so, ma funziona.", rating: 5 },
  { name: "Martin S.", location: "34 anni, Roma", text: "Ho 34 anni e pensavo di sapere già tutto. Ma ho scoperto un sacco di cose sulla stimolazione combinata e sui segnali veri, non quelli dei porno. Ho riletto alcuni capitoli due volte perché la prima non ci credevo. Il fatto che ci siano le illustrazioni fa tutta la differenza.", rating: 5 },
  { name: "Matteo B.", location: "29 anni, Treviglio", text: "Avevo già provato a cercare roba simile online. Forum, video, articoli. Il problema è che sono tutti pezzi scollegati. Qui per la prima volta ho trovato tutto in un posto solo, in un ordine che ha senso. Vale cento volte di più di quello che costa.", rating: 5 },
  { name: "Riccardo V.", location: "41 anni, Venezia", text: "Lo compri con un po' di imbarazzo, inutile negarlo. Ma poi lo apri e capisci subito che non è la solita roba che ti aspettavi. È scritto seriamente, ci sono fonti, ci sono spiegazioni vere. Mia moglie ha notato che qualcosa è cambiato in me.", rating: 5 },
];

const IndexBold = () => {
  const [isStickyCTAVisible, setIsStickyCTAVisible] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { startCheckout } = useStripeCheckout();

  useEffect(() => {
    const handleScroll = () => {
      const heroHeight = window.innerHeight * 0.8;
      const bottomThreshold = document.documentElement.scrollHeight - window.innerHeight - 200;
      setIsStickyCTAVisible(window.scrollY > heroHeight && window.scrollY < bottomThreshold);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleBuyClick = () => {
    setIsSidebarOpen(true);
  };

  const handleCheckout = (includeLifetime: boolean) => {
    void startCheckout(includeLifetime, true);
  };

  const price = "€29";
  const originalPrice = "€99";
  const bonusTotal = bonuses.reduce((sum, b) => sum + b.value, 0);

  return (
    <main className="min-h-screen bg-black text-white overflow-x-hidden">
      {/* ANNOUNCEMENT BAR */}
      <div className="bg-red-600 text-white py-2.5 sm:py-4 text-center text-base sm:text-lg font-bold px-4 sm:px-6 animate-pulse leading-snug">
        Offerta di Lancio – 71% di sconto + 6 Bonus GRATIS (valore €138)
      </div>

      {/* ====== 1. HERO SECTION ====== */}
      <section className="relative py-12 sm:py-16 lg:py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-red-900/30 via-black to-black" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-red-600/20 rounded-full blur-3xl" />
        
        <div className="container relative z-10 px-4 sm:px-6">
          <div className="max-w-2xl mx-auto text-center space-y-6">
              <div className="inline-block bg-red-600 text-white px-4 py-2 rounded-full text-sm font-bold uppercase tracking-wide">
                Offerta di Lancio – 71% di sconto
              </div>

              {/* Cover Image */}
              <div className="flex justify-center">
                <div className="relative">
                  <div className="absolute inset-0 bg-red-600/20 rounded-3xl blur-3xl scale-90" />
                  <img 
                    src={protocolloCover} 
                    alt="Il Protocollo del Piacere" 
                    loading="eager"
                    className="relative w-64 sm:w-72 md:w-80 lg:w-96 drop-shadow-2xl"
                    style={{ filter: "drop-shadow(0 25px 50px rgba(0,0,0,0.4))" }}
                  />
                </div>
              </div>
              
              <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-black leading-tight">
                IL PROTOCOLLO
                <span className="text-red-500 block">DEL PIACERE</span>
              </h1>

              <p className="text-lg sm:text-xl text-gray-300 max-w-xl mx-auto leading-relaxed">
                Scopri i "Giusti Tasti" da Toccare per Portare il Sesso al Livello Superiore e Farla Squirtare Ogni Volta che Vuoi… <span className="text-red-400 font-semibold">Senza Ansia, Senza Pressione e Senza Sentirti Inadeguato</span>
              </p>

              <p className="text-base sm:text-lg text-gray-400 max-w-xl mx-auto leading-relaxed">
                Il Protocollo Scientifico di oltre 200 pagine che ti mostrerà i segreti della psicologia sessuale, dell'anatomia femminile e della comunicazione intima per sbloccare il miglior sesso della sua (e della tua) vita
              </p>

              <div className="space-y-3 inline-block text-left">
                {[
                  { icon: FileText, text: "Strategie pratiche che potrai usare già dalla prossima occasione" },
                  { icon: Target, text: "Basato su riferimenti anatomici scientificamente accurati" },
                  { icon: Gift, text: "In REGALO 6 BONUS Esclusivi dal Valore Totale di €138" },
                  { icon: Shield, text: 'Garanzia 60 giorni "L\'hai Soddisfatta o ti Rimborsiamo"' },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <item.icon className="w-5 h-5 text-red-500 flex-shrink-0" />
                    <span className="text-gray-200 font-medium text-base">{item.text}</span>
                  </div>
                ))}
              </div>

              {/* Price Block */}
              <div className="bg-gradient-to-r from-red-900/50 to-red-800/30 rounded-2xl p-4 sm:p-6 border-2 border-red-600/50">
                <p className="text-gray-400 text-sm mb-1">Prezzo di Cartellino</p>
                <div className="flex items-center justify-center gap-3 sm:gap-4 mb-4">
                  <span className="text-xl sm:text-2xl text-gray-400 line-through">{originalPrice}</span>
                  <span className="text-4xl sm:text-5xl font-black text-white">{price}</span>
                  <span className="bg-red-600 text-white text-xs sm:text-sm font-bold px-2.5 sm:px-3 py-1 rounded">-71%</span>
                </div>
                
                <Button 
                  onClick={handleBuyClick}
                  className="w-full bg-red-600 hover:bg-red-700 text-white text-base sm:text-lg font-bold py-5 sm:py-6 rounded-xl group h-auto min-h-[56px]"
                >
                  <span className="text-center leading-snug">Sì, Voglio il Protocollo<br className="sm:hidden" /> + TUTTI i BONUS</span>
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform flex-shrink-0" />
                </Button>
                <p className="text-gray-500 text-xs mt-2">(Valore complessivo €{99 + bonusTotal}) per soli {price}</p>

                <div className="mt-3 sm:mt-4 flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 text-xs sm:text-sm text-gray-400">
                  <span className="flex items-center gap-1"><CheckCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-red-500" /> Download immediato</span>
                  <span className="flex items-center gap-1"><Shield className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-red-500" /> Pagamento sicuro</span>
                  <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-red-500" /> Garanzia 60 giorni</span>
                </div>
              </div>
          </div>
        </div>
      </section>

      {/* ====== 2. COSA SCOPRIRAI (Bullet Points) ====== */}
      <section className="py-10 sm:py-20 bg-gradient-to-b from-black to-gray-900">
        <div className="container px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-black text-white">
              Ecco cosa scoprirai nel
              <span className="text-red-500 block">Protocollo del Piacere:</span>
            </h2>
          </div>

          <div className="max-w-3xl mx-auto space-y-3">
            {bulletPoints.map((point, i) => (
              <div key={i} className="flex items-start gap-3 bg-gray-900/50 rounded-xl p-4 border border-gray-800">
                <CheckCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                <span className="text-gray-200 text-base sm:text-lg leading-relaxed">{point}</span>
              </div>
            ))}
            <div className="bg-gray-900/50 rounded-xl p-4 border border-gray-800 text-center">
              <p className="text-red-400 font-bold text-lg sm:text-xl">E molto, molto altro…</p>
              <p className="text-gray-400 text-base mt-2">Oltre 200 pagine chiare e 25 capitoli guidati, 50+ esercizi pratici e illustrazioni per visualizzare e comprendere meglio.</p>
            </div>
          </div>

          <div className="mt-10 text-center">
            <Button onClick={handleBuyClick} className="bg-red-600 hover:bg-red-700 text-white font-bold py-5 px-8 text-sm sm:text-base group whitespace-normal">
              Sì, Voglio il Protocollo Scientifico + TUTTI i BONUS (Valore €{99 + bonusTotal}) per soli {price}
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 flex-shrink-0" />
            </Button>
          </div>
        </div>
      </section>

      {/* ====== 3. PRIMA vs DOPO ====== */}
      <section className="py-16 sm:py-20 bg-gray-900">
        <div className="container px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-4xl font-black text-white">
              Prima vs Dopo
              <span className="text-red-500 block">il Protocollo del Piacere</span>
            </h2>
          </div>

          <div className="max-w-4xl mx-auto overflow-hidden rounded-2xl border border-gray-700/50">
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className="bg-red-900/50 text-red-400 font-bold text-sm sm:text-base uppercase tracking-wider py-4 px-4 sm:px-6 w-1/2 text-center border-b border-gray-700/50">
                    <span className="flex items-center justify-center gap-2"><X className="w-4 h-4" /> Prima</span>
                  </th>
                  <th className="bg-green-900/50 text-green-400 font-bold text-sm sm:text-base uppercase tracking-wider py-4 px-4 sm:px-6 w-1/2 text-center border-b border-gray-700/50">
                    <span className="flex items-center justify-center gap-2"><CheckCircle className="w-4 h-4" /> Dopo</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {beforeAfter.map((item, i) => (
                  <tr key={i} className={`${i % 2 === 0 ? "bg-gray-900/20" : "bg-gray-900/50"} hover:bg-gray-800/50 transition-colors`}>
                    <td className="py-3.5 px-4 sm:px-6 border-b border-r border-gray-700/30 text-gray-400 text-sm sm:text-base align-top leading-relaxed">
                      {item.before}
                    </td>
                    <td className="py-3.5 px-4 sm:px-6 border-b border-gray-700/30 text-gray-200 text-sm sm:text-base align-top leading-relaxed">
                      {item.after}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ====== 4. NON TROVERAI NULLA DEL GENERE ====== */}
      <section className="py-16 sm:py-20 bg-black">
        <div className="container px-4 sm:px-6">
          <div className="text-center mb-12">
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
                "Un libro sulla comunicazione intima di coppia per sapere cosa dire – e cosa non dire – prima, durante e dopo…",
                "Le tecniche pratiche di stimolazione che potresti (forse) trovare sparse tra forum americani e libri sul Kamasutra in inglese…",
                "Le pratiche di mindfulness e rilassamento che i terapeuti usano per aiutare lui a essere presente e lei ad abbandonarsi…",
                "E infine capire come incastrare tutto questo in una sequenza che funzioni nella realtà, non solo nella teoria.",
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3 bg-gray-900/30 rounded-xl p-3 sm:p-4 border border-gray-800">
                  <span className="text-red-500 font-bold text-lg flex-shrink-0">•</span>
                  <span className="text-gray-300 text-sm sm:text-base">{item}</span>
                </div>
              ))}
            </div>
            <p className="text-gray-400 text-sm sm:text-base leading-relaxed mt-6 text-center">
              Anche se tu riuscissi a trovare tutto, a filtrare le informazioni fake da quelle scientifiche, a mettere insieme i pezzi e a capire in quale ordine usarli… ci vorrebbero <span className="text-white font-bold">mesi</span>.
            </p>
            <p className="text-gray-400 text-sm sm:text-base leading-relaxed mt-2 text-center">
              E nel frattempo continueresti a fare esattamente quello che stai facendo adesso.
            </p>
            <p className="text-red-400 font-bold text-center mt-6 text-sm sm:text-base">
              Oppure puoi comodamente ricevere tutto ciò in questo esatto momento – già tradotto in italiano, in sequenza, con le illustrazioni e con 6 BONUS in regalo – per soli {price} iva inclusa.
            </p>
          </div>

          <div className="text-center">
            <Button onClick={handleBuyClick} className="bg-red-600 hover:bg-red-700 text-white font-bold py-5 px-8 text-sm sm:text-base group whitespace-normal">
              Sì, Voglio il Protocollo Scientifico + TUTTI i BONUS (Valore €{99 + bonusTotal}) per soli {price}
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 flex-shrink-0" />
            </Button>
          </div>
        </div>
      </section>

      {/* ====== 5. BONUS ====== */}
      <section className="py-16 sm:py-20 bg-gradient-to-b from-gray-900 to-black">
        <div className="container px-4 sm:px-6">
          <div className="max-w-3xl mx-auto space-y-6">
            {bonuses.map((bonus, i) => (
              <div key={i} className="bg-gray-900/50 rounded-2xl p-5 sm:p-6 border border-gray-800">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-red-600/20 flex items-center justify-center flex-shrink-0">
                    <bonus.icon className="w-6 h-6 text-red-500" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between flex-wrap gap-2 mb-2">
                      <h3 className="text-lg font-bold text-white">BONUS #{i + 1} — {bonus.title}</h3>
                      <span className="text-red-500 font-bold text-sm">(Valore €{bonus.value})</span>
                    </div>
                    <p className="text-gray-400 text-sm sm:text-base leading-relaxed">{bonus.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Button onClick={handleBuyClick} className="bg-red-600 hover:bg-red-700 text-white font-bold py-5 px-8 text-sm sm:text-base group whitespace-normal">
              Sì, Voglio il Protocollo Scientifico + TUTTI i BONUS (Valore €{99 + bonusTotal}) per soli {price}
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 flex-shrink-0" />
            </Button>
          </div>
        </div>
      </section>

      {/* ====== 6. TESTIMONIALS ====== */}
      <section className="py-16 sm:py-20 bg-gray-900">
        <div className="container px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-4xl font-black text-white uppercase">
              Cosa Dice Chi Ha Acquistato<br />Questo Protocollo Scientifico?
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {testimonials.map((t, i) => (
              <div key={i} className="bg-black/50 rounded-2xl p-6 border border-gray-800">
                <Quote className="w-8 h-8 text-red-600/30 mb-4" />
                <p className="text-gray-300 italic text-sm sm:text-base mb-5">"{t.text}"</p>
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

      {/* ====== 7. GUARANTEE ====== */}
      <section className="py-16 sm:py-20 bg-black">
        <div className="container px-4 sm:px-6">
          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-br from-red-900/30 to-gray-900 rounded-3xl p-6 sm:p-12 border-2 border-red-600/50 text-center">
              <p className="text-red-500 font-bold text-lg mb-2">GARANZIA DEL 100%</p>
              <div className="w-20 h-20 rounded-full bg-red-600/20 flex items-center justify-center mx-auto mb-6">
                <Shield className="w-10 h-10 text-red-500" />
              </div>
              <h2 className="text-2xl sm:text-4xl font-black text-white mb-6">"L'Hai Soddisfatta o Ti Rimborsiamo"</h2>
              
              <div className="text-left max-w-xl mx-auto space-y-4 text-gray-400 text-sm sm:text-base leading-relaxed">
                <p>
                  Voglio essere chiaro su una cosa: il rischio di questo acquisto è tutto nostro, non tuo.
                </p>
                <p>
                  Hai <span className="text-white font-bold">60 giorni interi</span> per leggere il protocollo, applicare quello che trovi e vedere con i tuoi occhi cosa cambia. Sessanta giorni. Non una settimana. Sessanta giorni.
                </p>
                <p>
                  Se alla fine di questo periodo non sei soddisfatto del risultato – per qualsiasi motivo, anche uno che non mi vuoi spiegare – ti rimborsiamo il 100% di quello che hai speso. Senza domande. Senza moduli da compilare. Senza aspettare settimane.
                </p>
                <p>
                  Questo significa che hai solo <span className="text-white font-bold">2 possibilità</span>: o esci da questa pagina con un sistema scientifico che cambia la tua vita sessuale per sempre… o esci con gli stessi 29€ in tasca.
                </p>
                <p>Non perdi niente in nessuno dei due casi.</p>
                <p className="text-red-400 font-semibold">
                  L'unico scenario in cui ci perdi, è quello in cui continui a fare quello che hai sempre fatto… aspettandoti come per magia dei risultati diversi.
                </p>
              </div>

              <div className="mt-8 flex items-center justify-center gap-4 text-xs sm:text-sm text-gray-500">
                <span className="flex items-center gap-1"><Shield className="w-4 h-4 text-red-500" /> Acquisto 100% sicuro</span>
                <span className="flex items-center gap-1"><Clock className="w-4 h-4 text-red-500" /> Garanzia di 60 giorni</span>
                <span className="flex items-center gap-1"><CheckCircle className="w-4 h-4 text-red-500" /> Nessuna domanda</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====== 8. FINAL CTA ====== */}
      <section className="py-16 sm:py-20 bg-gradient-to-b from-red-900 to-red-950">
        <div className="container px-4 sm:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <div className="bg-black/30 rounded-2xl p-5 sm:p-8 border border-red-600/30">
              <div className="flex items-center justify-center gap-3 sm:gap-4 mb-4">
                <span className="text-xl sm:text-2xl text-red-300 line-through">€{99 + bonusTotal}</span>
                <span className="text-4xl sm:text-5xl font-black text-white">{price}</span>
                <span className="bg-white text-red-600 text-xs sm:text-sm font-bold px-2.5 sm:px-3 py-1 rounded">-71%</span>
              </div>
              <Button onClick={handleBuyClick} className="w-full sm:w-auto bg-white text-red-600 hover:bg-gray-100 text-sm sm:text-lg font-black py-6 sm:py-7 px-6 sm:px-12 group whitespace-normal leading-tight">
                Sì, Voglio il Protocollo Scientifico + TUTTI i BONUS
                <ArrowRight className="w-6 h-6 ml-2 group-hover:translate-x-1 flex-shrink-0" />
              </Button>
              <p className="text-red-200/60 text-xs mt-2">(Valore complessivo €{99 + bonusTotal}) per soli {price}</p>
            </div>

            <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 text-xs sm:text-sm text-red-200">
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
              <a href="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="/terms" className="hover:text-white transition-colors">Termini</a>
              <a href="/contatti" className="hover:text-white transition-colors">Contatti</a>
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
                Accesso Immediato
                <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1" />
              </Button>
            </div>
          </div>
        </div>
      )}

      <PrePurchaseSidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        onCheckout={handleCheckout}
      />
    </main>
  );
};

export default IndexBold;
