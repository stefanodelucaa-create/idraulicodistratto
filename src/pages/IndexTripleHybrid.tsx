import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/stores/cartStore";
import { fetchProducts, ShopifyProduct, createStorefrontCheckout, CartItem } from "@/lib/shopify";
import { 
  ArrowRight, CheckCircle, Shield, Clock, Brain, Target, Heart, Gift, 
  XCircle, X, MessageSquare, Book, FileText, ListChecks, Smartphone, 
  LineChart, BookOpen, FlaskConical, Star, Quote, RefreshCcw, Mail, Download,
  ChevronDown, Sparkles, Crown, Zap, Flame
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
  "Cerchi garanzie \"100% in 10 minuti\"",
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

const IndexTripleHybrid = () => {
  const [product, setProduct] = useState<ShopifyProduct | null>(null);
  const [loading, setLoading] = useState(true);
  const [isStickyCTAVisible, setIsStickyCTAVisible] = useState(false);

  useEffect(() => {
    const loadProduct = async () => {
      try {
        const products = await fetchProducts(1);
        if (products.length > 0) setProduct(products[0]);
      } catch (error) {
        console.error("Failed to load product:", error);
      } finally {
        setLoading(false);
      }
    };
    loadProduct();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const shouldShow = window.scrollY > 600;
      const nearBottom = window.scrollY + window.innerHeight > document.documentElement.scrollHeight - 400;
      setIsStickyCTAVisible(shouldShow && !nearBottom);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleBuyClick = async () => {
    if (!product) {
      toast.error("Prodotto non disponibile");
      return;
    }
    const variant = product.node.variants.edges[0]?.node;
    if (!variant) return;

    const cartItem: CartItem = {
      product,
      variantId: variant.id,
      variantTitle: variant.title,
      price: variant.price,
      quantity: 1,
      selectedOptions: variant.selectedOptions || [],
    };

    const popup = window.open("about:blank", "_blank");
    try {
      toast.loading("Preparando il checkout...", { id: "checkout" });
      const checkoutUrl = await createStorefrontCheckout([cartItem]);
      toast.dismiss("checkout");
      if (popup) {
        popup.location.href = checkoutUrl;
      } else {
        window.location.href = checkoutUrl;
      }
    } catch (error) {
      toast.dismiss("checkout");
      toast.error("Errore durante il checkout");
      if (popup) popup.close();
    }
  };

  const price = "€29";
  const originalPrice = "€79";
  const bonusTotal = bonuses.reduce((sum, b) => sum + b.value, 0);

  return (
    <main className="min-h-screen font-sans overflow-x-hidden">
      {/* ANNOUNCEMENT BAR - Bold/Aggressive Style with Gradient Animation */}
      <div className="relative bg-gradient-to-r from-rose-600 via-fuchsia-600 to-violet-600 text-white py-3 sm:py-4 text-center text-sm sm:text-base font-bold px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse" />
        <span className="relative z-10 flex items-center justify-center gap-2 flex-wrap">
          <Zap className="w-4 h-4 animate-bounce" />
          OFFERTA ESCLUSIVA: -53% + 6 Bonus GRATIS (valore €125)
          <Flame className="w-4 h-4 animate-bounce" />
        </span>
      </div>

      {/* HERO SECTION - Dark Premium Style with Warm Accents */}
      <section className="relative py-12 sm:py-16 lg:py-24 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-[120px] animate-pulse" />
          <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-rose-500/10 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '1s' }} />
          <div className="absolute top-1/2 right-0 w-64 h-64 bg-violet-500/10 rounded-full blur-[80px] animate-pulse" style={{ animationDelay: '2s' }} />
        </div>
        
        <div className="container relative z-10 px-4 sm:px-6">
          <div className="flex flex-col lg:grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Mobile: Images FIRST */}
            <div className="relative flex justify-center pb-4 lg:hidden order-1">
              <div className="absolute inset-0 bg-gradient-to-t from-amber-500/20 via-rose-500/10 to-transparent rounded-full blur-3xl scale-75" />
              <div className="relative flex items-end">
                <img 
                  src={ebookMockup} 
                  alt="Manuale dell'Idraulico Distratto" 
                  className="w-56 sm:w-64 drop-shadow-2xl -translate-x-4" 
                  style={{ filter: "drop-shadow(0 25px 50px rgba(251, 146, 60, 0.3))" }}
                />
                <div className="absolute bottom-0 right-0 translate-x-2">
                  <img 
                    src={bonusMockup} 
                    alt="Bonus Pack" 
                    className="w-40 sm:w-44 drop-shadow-xl" 
                    style={{ filter: "drop-shadow(0 20px 40px rgba(251, 146, 60, 0.2))" }}
                  />
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="text-center lg:text-left space-y-6 order-2 lg:order-1">
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500/20 to-rose-500/20 border border-amber-400/30 text-amber-300 px-5 py-2.5 rounded-full text-sm font-semibold backdrop-blur-sm">
                <Crown className="w-4 h-4" />
                Edizione Premium 2024
              </div>
              
              <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-black leading-tight">
                <span className="text-white">TRASFORMA</span>
                <span className="block bg-gradient-to-r from-amber-400 via-orange-400 to-rose-400 bg-clip-text text-transparent">L'ANSIA IN PIACERE</span>
              </h1>

              <p className="text-lg sm:text-xl text-slate-300 max-w-xl leading-relaxed">
                La guida definitiva di <span className="text-amber-400 font-bold">200+ pagine</span> che elimina la pressione e trasforma l'intimità in connessione autentica.
              </p>

              <div className="space-y-3">
                {[
                  { icon: Brain, text: "70% psicologia e mindset", color: "from-violet-500 to-fuchsia-500" },
                  { icon: Target, text: "Anatomia scientifica reale", color: "from-amber-500 to-orange-500" },
                  { icon: Heart, text: "Connessione, non performance", color: "from-rose-500 to-pink-500" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-4 justify-center lg:justify-start group">
                    <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}>
                      <item.icon className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-slate-200 font-medium">{item.text}</span>
                  </div>
                ))}
              </div>

              {/* Price Block - Glassmorphism Style */}
              <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-6 sm:p-8 border border-white/10 shadow-2xl">
                <div className="flex items-center justify-center gap-4 sm:gap-6 mb-5">
                  <span className="text-xl sm:text-2xl text-slate-500 line-through">{originalPrice}</span>
                  <span className="text-4xl sm:text-5xl font-black bg-gradient-to-r from-amber-400 to-rose-400 bg-clip-text text-transparent">{price}</span>
                  <span className="bg-gradient-to-r from-rose-500 to-fuchsia-500 text-white text-sm font-bold px-3 py-1.5 rounded-full shadow-lg shadow-rose-500/30">-53%</span>
                </div>
                
                <Button 
                  onClick={handleBuyClick}
                  className="w-full bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 hover:from-amber-600 hover:via-orange-600 hover:to-rose-600 text-white text-lg font-bold py-6 sm:py-7 rounded-2xl group shadow-xl shadow-orange-500/30 transition-all hover:shadow-orange-500/50 hover:scale-[1.02]"
                >
                  <Zap className="w-5 h-5 mr-2" />
                  OTTIENI ACCESSO IMMEDIATO
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>

                <div className="mt-5 flex flex-wrap justify-center gap-4 text-sm text-slate-400">
                  <span className="flex items-center gap-1.5"><CheckCircle className="w-4 h-4 text-emerald-400" /> Download immediato</span>
                  <span className="flex items-center gap-1.5"><Shield className="w-4 h-4 text-amber-400" /> Pagamento sicuro</span>
                  <span className="flex items-center gap-1.5"><Clock className="w-4 h-4 text-rose-400" /> Garanzia 60 giorni</span>
                </div>
              </div>
            </div>

            {/* Desktop: Images */}
            <div className="relative hidden lg:flex justify-center pb-8 order-2">
              <div className="absolute inset-0 bg-gradient-to-t from-amber-500/20 via-rose-500/10 to-transparent rounded-full blur-3xl scale-75" />
              <div className="relative flex items-end justify-center">
                <img 
                  src={ebookMockup} 
                  alt="Manuale dell'Idraulico Distratto" 
                  className="w-72 lg:w-80 xl:w-96 drop-shadow-2xl" 
                  style={{ filter: "drop-shadow(0 30px 60px rgba(251, 146, 60, 0.35))" }}
                />
                <div className="absolute bottom-0 -right-8">
                  <img 
                    src={bonusMockup} 
                    alt="Bonus Pack" 
                    className="w-52 lg:w-60 drop-shadow-xl" 
                    style={{ filter: "drop-shadow(0 25px 50px rgba(251, 146, 60, 0.25))" }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PAIN POINTS - Bold/Aggressive Style with Warm Colors */}
      <section className="py-14 sm:py-20 bg-gradient-to-b from-amber-50 via-orange-50 to-rose-50">
        <div className="container px-4 sm:px-6">
          <div className="text-center mb-10 sm:mb-14">
            <span className="inline-flex items-center gap-2 bg-rose-100 text-rose-700 px-5 py-2 rounded-full text-sm font-bold mb-5 border border-rose-200">
              <XCircle className="w-4 h-4" />
              ATTENZIONE
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900">
              Ti Riconosci in Almeno Una
              <span className="block bg-gradient-to-r from-rose-600 to-orange-600 bg-clip-text text-transparent">di Queste Situazioni?</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-4 sm:gap-5 max-w-5xl mx-auto">
            {painPoints.map((point, i) => (
              <div key={i} className="bg-white/80 backdrop-blur-sm rounded-2xl p-5 sm:p-6 border border-rose-100 shadow-lg shadow-rose-100/50 hover:shadow-xl hover:shadow-rose-200/50 hover:border-rose-200 transition-all duration-300 hover:-translate-y-1">
                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-rose-500 to-orange-500 flex items-center justify-center flex-shrink-0 shadow-lg shadow-rose-500/30">
                    <XCircle className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-2">{point.title}</h3>
                    <p className="text-slate-600 text-sm leading-relaxed">{point.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 sm:mt-14 text-center">
            <div className="bg-gradient-to-r from-rose-500/10 via-orange-500/10 to-amber-500/10 border-2 border-rose-300/50 rounded-3xl p-6 sm:p-8 max-w-2xl mx-auto backdrop-blur-sm">
              <p className="text-slate-800 text-lg font-semibold mb-5">
                Se ti sei riconosciuto in almeno 2 punti,
                <span className="bg-gradient-to-r from-rose-600 to-orange-600 bg-clip-text text-transparent font-bold"> questa guida è per te.</span>
              </p>
              <Button onClick={handleBuyClick} className="bg-gradient-to-r from-rose-500 to-orange-500 hover:from-rose-600 hover:to-orange-600 text-white font-bold py-5 px-8 rounded-xl shadow-lg shadow-rose-500/30 group min-h-[52px]">
                Scopri la Soluzione <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* WHY DIFFERENT - Dark Premium with Neon Accents */}
      <section className="py-14 sm:py-20 bg-gradient-to-br from-slate-900 via-violet-950 to-slate-900 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-80 h-80 bg-violet-500/10 rounded-full blur-[100px]" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-fuchsia-500/10 rounded-full blur-[120px]" />
        </div>
        
        <div className="container relative z-10 px-4 sm:px-6">
          <div className="text-center mb-10 sm:mb-14">
            <span className="inline-flex items-center gap-2 bg-violet-500/20 text-violet-300 px-5 py-2 rounded-full text-sm font-semibold mb-5 border border-violet-500/30 backdrop-blur-sm">
              <Sparkles className="w-4 h-4" />
              PERCHÉ È DIVERSA
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white">
              Non è l'Ennesima Guida
              <span className="block bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">Trovata Online</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-5 sm:gap-6 max-w-5xl mx-auto">
            {uniqueFeatures.map((feature, i) => {
              const gradients = [
                "from-violet-500 to-fuchsia-500",
                "from-amber-500 to-orange-500",
                "from-rose-500 to-pink-500"
              ];
              return (
                <div key={i} className="bg-white/5 backdrop-blur-xl rounded-3xl p-6 sm:p-8 border border-white/10 text-center hover:border-violet-500/50 transition-all duration-300 hover:bg-white/10 group">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${gradients[i]} flex items-center justify-center mx-auto mb-5 shadow-lg group-hover:scale-110 transition-transform`}>
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-white mb-3">{feature.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* TABLE OF CONTENTS - Original Warm Style Enhanced */}
      <section className="py-14 sm:py-20 bg-gradient-to-b from-amber-50 to-orange-100/50">
        <div className="container px-4 sm:px-6">
          <div className="text-center mb-10 sm:mb-14">
            <span className="inline-flex items-center gap-2 bg-amber-100 text-amber-700 px-5 py-2 rounded-full text-sm font-bold mb-5 border border-amber-200">
              <BookOpen className="w-4 h-4" />
              CONTENUTI
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 mb-3">6 Sezioni Complete</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">Un percorso strutturato dalle basi psicologiche alle tecniche avanzate</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 max-w-6xl mx-auto">
            {sections.map((section, i) => (
              <div key={i} className="bg-white rounded-2xl overflow-hidden border border-amber-200/50 shadow-lg hover:shadow-xl transition-all duration-300 group hover:-translate-y-1">
                <div className="bg-gradient-to-br from-amber-100 to-orange-100 p-5 sm:p-6 flex justify-center">
                  <img src={section.image} alt={section.title} className="w-28 sm:w-32 h-auto rounded-lg shadow-md group-hover:scale-105 transition-transform duration-300" loading="lazy" />
                </div>
                <div className="p-4 sm:p-5">
                  <span className="inline-block bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-sm">PARTE {i + 1}</span>
                  <h3 className="text-base sm:text-lg font-bold text-slate-900 mt-2">{section.title}</h3>
                  <p className="text-amber-600 text-sm">{section.subtitle}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-300/50 rounded-2xl p-5 sm:p-6 text-center max-w-3xl mx-auto">
            <p className="text-slate-800 font-semibold text-base sm:text-lg">
              <span className="text-amber-600 font-bold">200+ pagine</span>, <span className="text-orange-600 font-bold">25 capitoli</span>, <span className="text-rose-600 font-bold">50+ esercizi</span>
            </p>
          </div>
        </div>
      </section>

      {/* VALUE PROPOSITION - Glassmorphism Dark Style */}
      <section className="py-14 sm:py-20 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-[120px]" />
          <div className="absolute bottom-1/4 left-0 w-80 h-80 bg-rose-500/10 rounded-full blur-[100px]" />
        </div>
        
        <div className="container relative z-10 px-4 sm:px-6">
          <div className="text-center mb-10 sm:mb-14">
            <span className="inline-flex items-center gap-2 bg-amber-500/20 text-amber-300 px-5 py-2 rounded-full text-sm font-semibold mb-5 border border-amber-500/30 backdrop-blur-sm">
              <Gift className="w-4 h-4" />
              COSA RICEVI
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white">
              Oltre all'Ebook Principale
            </h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 max-w-5xl mx-auto">
            {/* Main Ebook */}
            <div className="bg-gradient-to-br from-amber-500/10 to-orange-500/5 backdrop-blur-xl rounded-3xl p-6 sm:p-8 border border-amber-500/30 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/20 rounded-full blur-3xl" />
              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-4">
                  <Book className="w-6 h-6 text-amber-400" />
                  <span className="text-amber-300 font-bold text-lg">GUIDA PRINCIPALE</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-4">Manuale dell'Idraulico Distratto</h3>
                <ul className="space-y-3">
                  {["200+ pagine di contenuto", "25 capitoli strutturati", "50+ esercizi pratici", "Accesso a vita + aggiornamenti"].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-slate-300">
                      <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-6 flex items-center gap-3">
                  <span className="text-slate-500 line-through text-lg">€79</span>
                  <span className="text-white font-bold text-2xl">Incluso</span>
                </div>
              </div>
            </div>

            {/* Bonuses */}
            <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-6 sm:p-8 border border-rose-500/30 relative overflow-hidden">
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-rose-500/20 rounded-full blur-3xl" />
              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-4">
                  <Gift className="w-6 h-6 text-rose-400" />
                  <span className="text-rose-300 font-bold text-lg">6 BONUS ESCLUSIVI</span>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {bonuses.map((bonus, i) => (
                    <div key={i} className="bg-white/5 rounded-xl p-3 sm:p-4 border border-white/10 hover:border-rose-500/30 transition-colors">
                      <bonus.icon className="w-6 h-6 text-rose-400 mb-2" />
                      <p className="text-white text-sm font-medium">{bonus.title}</p>
                      <p className="text-rose-400 text-xs mt-1">Valore €{bonus.value}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-5 bg-rose-500/10 rounded-xl p-4 border border-rose-500/30">
                  <p className="text-rose-300 font-bold text-center">Valore totale: €{bonusTotal}</p>
                  <p className="text-slate-400 text-sm text-center">Tuo GRATIS con l'acquisto</p>
                </div>
              </div>
            </div>
          </div>

          {/* Total Value */}
          <div className="mt-10 sm:mt-14 max-w-2xl mx-auto">
            <div className="bg-gradient-to-r from-amber-500/20 via-orange-500/20 to-rose-500/20 backdrop-blur-xl rounded-3xl p-6 sm:p-8 border border-amber-500/30 text-center">
              <p className="text-slate-400 text-sm mb-2">Valore totale del pacchetto</p>
              <p className="text-3xl sm:text-4xl font-black text-slate-500 line-through mb-2">€{79 + bonusTotal}</p>
              <p className="text-slate-300 mb-4">Oggi ottieni tutto a soli</p>
              <p className="text-5xl sm:text-6xl font-black bg-gradient-to-r from-amber-400 via-orange-400 to-rose-400 bg-clip-text text-transparent mb-6">{price}</p>
              <Button 
                onClick={handleBuyClick}
                className="w-full max-w-md bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 hover:from-amber-600 hover:via-orange-600 hover:to-rose-600 text-white text-lg font-bold py-6 sm:py-7 rounded-2xl group shadow-xl shadow-orange-500/30 min-h-[56px]"
              >
                <Zap className="w-5 h-5 mr-2" />
                OTTIENI TUTTO ORA
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* SOCIAL PROOF - Bold Style with Gradient Cards */}
      <section className="py-14 sm:py-20 bg-gradient-to-b from-rose-50 via-fuchsia-50 to-violet-50">
        <div className="container px-4 sm:px-6">
          <div className="text-center mb-10 sm:mb-14">
            <span className="inline-flex items-center gap-2 bg-fuchsia-100 text-fuchsia-700 px-5 py-2 rounded-full text-sm font-bold mb-5 border border-fuchsia-200">
              <Star className="w-4 h-4" />
              TESTIMONIANZE
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900">
              Cosa Dicono Chi l'Ha
              <span className="block bg-gradient-to-r from-fuchsia-600 to-violet-600 bg-clip-text text-transparent">Già Letta</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-5 sm:gap-6 max-w-5xl mx-auto">
            {testimonials.map((t, i) => (
              <div key={i} className="bg-white rounded-2xl p-5 sm:p-6 border border-fuchsia-100 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-fuchsia-100 to-violet-100 rounded-full -translate-y-12 translate-x-12" />
                <div className="relative z-10">
                  <div className="flex gap-1 mb-4">
                    {[...Array(t.rating)].map((_, j) => (
                      <Star key={j} className="w-5 h-5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <Quote className="w-8 h-8 text-fuchsia-200 mb-3" />
                  <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4">{t.text}</p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-fuchsia-500 to-violet-500 flex items-center justify-center text-white font-bold">
                      {t.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-bold text-slate-900">{t.name}</p>
                      <p className="text-sm text-slate-500">{t.location}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* IS FOR YOU / NOT FOR YOU - Dark Premium Style */}
      <section className="py-14 sm:py-20 bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/3 w-96 h-96 bg-emerald-500/5 rounded-full blur-[120px]" />
          <div className="absolute bottom-0 right-1/3 w-80 h-80 bg-rose-500/5 rounded-full blur-[100px]" />
        </div>
        
        <div className="container relative z-10 px-4 sm:px-6">
          <div className="text-center mb-10 sm:mb-14">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white">
              Questa Guida è
              <span className="block bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">Giusta per Te?</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6 sm:gap-8 max-w-4xl mx-auto">
            {/* For You */}
            <div className="bg-emerald-500/10 backdrop-blur-xl rounded-3xl p-6 sm:p-8 border border-emerald-500/30">
              <h3 className="text-xl font-bold text-emerald-400 mb-5 flex items-center gap-2">
                <CheckCircle className="w-6 h-6" />
                È per te se...
              </h3>
              <ul className="space-y-4">
                {forYou.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-slate-300">
                    <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Not For You */}
            <div className="bg-rose-500/10 backdrop-blur-xl rounded-3xl p-6 sm:p-8 border border-rose-500/30">
              <h3 className="text-xl font-bold text-rose-400 mb-5 flex items-center gap-2">
                <X className="w-6 h-6" />
                NON è per te se...
              </h3>
              <ul className="space-y-4">
                {notForYou.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-slate-300">
                    <X className="w-5 h-5 text-rose-400 flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ - Original Warm Style with Modern Touch */}
      <section className="py-14 sm:py-20 bg-gradient-to-b from-amber-50 to-white">
        <div className="container px-4 sm:px-6">
          <div className="text-center mb-10 sm:mb-14">
            <span className="inline-flex items-center gap-2 bg-amber-100 text-amber-700 px-5 py-2 rounded-full text-sm font-bold mb-5 border border-amber-200">
              <MessageSquare className="w-4 h-4" />
              FAQ
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900">
              Domande
              <span className="bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent"> Frequenti</span>
            </h2>
          </div>

          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="space-y-3">
              {faqs.map((faq, i) => (
                <AccordionItem key={i} value={`faq-${i}`} className="bg-white rounded-2xl border border-amber-200/50 shadow-sm overflow-hidden">
                  <AccordionTrigger className="px-5 sm:px-6 py-4 hover:no-underline hover:bg-amber-50/50 text-left text-slate-900 font-semibold text-sm sm:text-base">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="px-5 sm:px-6 pb-5 text-slate-600 text-sm sm:text-base leading-relaxed">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* GUARANTEE - Bold Style with Gradient */}
      <section className="py-14 sm:py-20 bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-600 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-80 h-80 bg-white/10 rounded-full blur-[80px]" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-[100px]" />
        </div>
        
        <div className="container relative z-10 px-4 sm:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <div className="w-20 h-20 sm:w-24 sm:h-24 bg-white/20 backdrop-blur-xl rounded-full flex items-center justify-center mx-auto mb-6 border border-white/30">
              <Shield className="w-10 h-10 sm:w-12 sm:h-12 text-white" />
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white mb-4">
              Tripla Garanzia 60 Giorni
            </h2>
            <p className="text-lg sm:text-xl text-white/90 mb-8 leading-relaxed">
              Se per qualsiasi motivo non sei soddisfatto, ti rimborsiamo al 100%. 
              <span className="font-bold"> E tieni comunque tutti i bonus.</span>
            </p>
            <div className="grid sm:grid-cols-3 gap-4 sm:gap-6">
              {[
                { icon: RefreshCcw, title: "Rimborso Completo", desc: "100% del tuo denaro" },
                { icon: MessageSquare, title: "Nessuna Domanda", desc: "Zero burocrazia" },
                { icon: Gift, title: "Tieni i Bonus", desc: "Sono tuoi per sempre" },
              ].map((item, i) => (
                <div key={i} className="bg-white/10 backdrop-blur-sm rounded-2xl p-5 border border-white/20">
                  <item.icon className="w-8 h-8 text-white mx-auto mb-3" />
                  <h3 className="font-bold text-white">{item.title}</h3>
                  <p className="text-white/80 text-sm">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CTA - Ultimate Hybrid Style */}
      <section className="py-14 sm:py-20 bg-gradient-to-br from-slate-950 via-violet-950 to-slate-950 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-[120px] animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-rose-500/10 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '1s' }} />
          <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-violet-500/10 rounded-full blur-[80px] animate-pulse" style={{ animationDelay: '2s' }} />
        </div>
        
        <div className="container relative z-10 px-4 sm:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white mb-4">
              Pronto a Trasformare
              <span className="block bg-gradient-to-r from-amber-400 via-orange-400 to-rose-400 bg-clip-text text-transparent">la Tua Intimità?</span>
            </h2>
            <p className="text-lg text-slate-400 mb-8">
              Unisciti a migliaia di uomini che hanno già scoperto il segreto per un'intimità autentica.
            </p>

            {/* Final Price Block */}
            <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-6 sm:p-8 border border-white/10 mb-8 max-w-xl mx-auto">
              <div className="flex items-center justify-center gap-4 sm:gap-6 mb-4">
                <span className="text-xl sm:text-2xl text-slate-500 line-through">{originalPrice}</span>
                <span className="text-5xl sm:text-6xl font-black bg-gradient-to-r from-amber-400 to-rose-400 bg-clip-text text-transparent">{price}</span>
                <span className="bg-gradient-to-r from-rose-500 to-fuchsia-500 text-white text-sm font-bold px-4 py-2 rounded-full shadow-lg">-53%</span>
              </div>
              
              <Button 
                onClick={handleBuyClick}
                className="w-full bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 hover:from-amber-600 hover:via-orange-600 hover:to-rose-600 text-white text-xl font-black py-7 sm:py-8 rounded-2xl group shadow-2xl shadow-orange-500/40 hover:shadow-orange-500/60 transition-all hover:scale-[1.02] min-h-[64px]"
              >
                <Zap className="w-6 h-6 mr-2" />
                SÌ! VOGLIO LA GUIDA + BONUS
                <ArrowRight className="w-6 h-6 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>

              <div className="mt-5 flex flex-wrap justify-center gap-4 text-sm text-slate-400">
                <span className="flex items-center gap-1.5"><Download className="w-4 h-4 text-emerald-400" /> Download immediato</span>
                <span className="flex items-center gap-1.5"><Shield className="w-4 h-4 text-amber-400" /> Pagamento 100% sicuro</span>
                <span className="flex items-center gap-1.5"><RefreshCcw className="w-4 h-4 text-rose-400" /> Garanzia 60 giorni</span>
              </div>
            </div>

            <p className="text-slate-500 text-sm">
              💳 Accettiamo tutte le principali carte di credito e PayPal
            </p>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-8 sm:py-10 bg-slate-950 border-t border-white/5">
        <div className="container px-4 sm:px-6">
          <div className="text-center text-slate-500 text-sm">
            <p className="mb-3">© 2024 Manuale dell'Idraulico Distratto. Tutti i diritti riservati.</p>
            <div className="flex flex-wrap justify-center gap-4 sm:gap-6 text-slate-600">
              <a href="#" className="hover:text-slate-400 transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-slate-400 transition-colors">Termini di Servizio</a>
              <a href="#" className="hover:text-slate-400 transition-colors">Contatti</a>
            </div>
          </div>
        </div>
      </footer>

      {/* STICKY CTA - Mobile Optimized */}
      <div className={`fixed bottom-0 left-0 right-0 z-50 transition-all duration-300 lg:hidden ${isStickyCTAVisible ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'}`}>
        <div className="bg-gradient-to-r from-slate-950/98 via-slate-900/98 to-slate-950/98 backdrop-blur-xl border-t border-amber-500/20 p-3 sm:p-4 shadow-2xl">
          <div className="flex items-center justify-between gap-3 max-w-lg mx-auto">
            <div className="flex-shrink-0">
              <p className="text-white font-bold text-sm leading-tight">Manuale + BONUS</p>
              <div className="flex items-center gap-2">
                <span className="text-slate-500 text-xs line-through">{originalPrice}</span>
                <span className="text-amber-400 font-black text-lg">{price}</span>
                <span className="bg-rose-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded">-53%</span>
              </div>
            </div>
            <Button 
              onClick={handleBuyClick}
              className="bg-gradient-to-r from-amber-500 to-rose-500 hover:from-amber-600 hover:to-rose-600 text-white font-bold py-3 px-5 rounded-xl shadow-lg min-h-[48px] text-sm"
            >
              <Zap className="w-4 h-4 mr-1" />
              ACQUISTA
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default IndexTripleHybrid;