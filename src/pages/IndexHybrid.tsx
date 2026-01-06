import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/stores/cartStore";
import { fetchProducts, ShopifyProduct, createStorefrontCheckout, CartItem } from "@/lib/shopify";
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

const IndexHybrid = () => {
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

  const price = "€37";
  const originalPrice = "€79";
  const bonusTotal = bonuses.reduce((sum, b) => sum + b.value, 0);

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#FFF8F0] via-[#FFFBF7] to-[#FFF5EB] font-sans">
      {/* ANNOUNCEMENT BAR - Luxury Warm Style */}
      <div className="bg-gradient-to-r from-primary via-primary/90 to-primary text-primary-foreground py-3 sm:py-4 text-center text-sm sm:text-base font-semibold px-4 shadow-lg">
        <Sparkles className="w-4 h-4 inline mr-2 text-yellow-200" />
        Edizione Premium: 53% di Sconto + 6 Bonus (€125)
        <Sparkles className="w-4 h-4 inline ml-2 text-yellow-200" />
      </div>

      {/* HERO SECTION - Mobile Optimized */}
      <section className="relative py-6 sm:py-12 lg:py-20 overflow-hidden">
        {/* Warm gradient background with subtle luxury glow */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent" />
        <div className="absolute top-20 right-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
        
        <div className="container relative z-10 px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-10 lg:gap-14 items-center">
            
            {/* Product Images - Mobile First (shows first on mobile) */}
            <div className="order-1 lg:order-2 flex justify-center py-4 sm:py-8">
              <div className="relative w-full max-w-[480px]">
                {/* Premium glow effect */}
                <div className="absolute inset-0 bg-primary/10 rounded-full blur-3xl scale-75" />
                
                {/* Book Mockups - Side by side on mobile */}
                <div className="relative flex items-end justify-center pb-4">
                  {/* Main Book - shifted left on mobile */}
                  <img 
                    src={ebookMockup} 
                    alt="Ebook" 
                    loading="eager"
                    className="w-64 sm:w-72 md:w-80 lg:w-96 drop-shadow-2xl relative z-10 -ml-6 sm:ml-0" 
                    style={{ filter: "drop-shadow(0 30px 60px rgba(234, 88, 12, 0.2))" }} 
                  />
                  
                  {/* Bonus Book - positioned bottom right */}
                  <div className="absolute bottom-0 -right-2 sm:-right-6 md:-right-10 z-20">
                    <img 
                      src={bonusMockup} 
                      alt="Bonus" 
                      loading="eager"
                      className="w-44 sm:w-52 md:w-56 lg:w-64 drop-shadow-xl" 
                      style={{ filter: "drop-shadow(0 20px 40px rgba(234, 88, 12, 0.15))" }} 
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Content - Shows second on mobile */}
            <div className="order-2 lg:order-1 text-center lg:text-left space-y-4 sm:space-y-5 max-w-[560px] mx-auto lg:mx-0">
              <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/30 text-primary px-4 py-2 rounded-full text-sm font-medium shadow-sm">
                <Crown className="w-4 h-4" />
                Esperienza Premium
              </div>
              
              <h1 className="text-[22px] sm:text-[28px] md:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight text-foreground">
                Manuale dell'
                <span className="bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent block">
                  Idraulico Distratto
                </span>
              </h1>

              <p className="text-[15px] sm:text-base md:text-lg lg:text-xl text-muted-foreground leading-relaxed">
                Una guida completa di <span className="text-primary font-semibold">200+ pagine</span> che trasforma l'ansia da prestazione in connessione profonda.
              </p>

              <div className="space-y-2.5 sm:space-y-3">
                {[
                  { icon: Brain, text: "70% psicologia e comunicazione" },
                  { icon: Target, text: "Anatomia scientifica reale" },
                  { icon: Heart, text: "Intimità prima della tecnica" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 justify-center lg:justify-start">
                    <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center shadow-sm border border-primary/10 flex-shrink-0">
                      <item.icon className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                    </div>
                    <span className="text-foreground/80 font-medium text-[14px] sm:text-[15px] md:text-base text-left">{item.text}</span>
                  </div>
                ))}
              </div>

              {/* Premium Price Block */}
              <div className="relative bg-gradient-to-br from-white to-secondary/30 rounded-2xl sm:rounded-3xl p-5 sm:p-6 md:p-8 border border-primary/20 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.1),0_0_40px_-10px_rgba(234,88,12,0.1)] overflow-hidden">
                {/* Subtle glow */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                
                <div className="relative flex items-center justify-center gap-3 sm:gap-4 mb-4">
                  <span className="text-lg sm:text-xl text-muted-foreground line-through">{originalPrice}</span>
                  <span className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">{price}</span>
                  <span className="bg-gradient-to-r from-primary to-primary/80 text-white text-xs sm:text-sm font-bold px-3 py-1 rounded-full shadow-lg">-53%</span>
                </div>
                
                <Button 
                  onClick={handleBuyClick}
                  className="w-full bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary text-primary-foreground text-base sm:text-lg md:text-xl lg:text-2xl font-bold py-5 sm:py-6 md:py-7 rounded-xl sm:rounded-2xl group shadow-[0_10px_30px_-5px_rgba(234,88,12,0.4)] min-h-[56px] sm:min-h-[60px]"
                >
                  Ottieni Tutto a {price}
                  <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>

                <div className="relative mt-4 flex flex-col sm:flex-row flex-wrap justify-center items-center gap-2 sm:gap-4 text-xs sm:text-sm text-muted-foreground">
                  <span className="flex items-center gap-1.5"><CheckCircle className="w-4 h-4 text-primary" /> Download immediato</span>
                  <span className="flex items-center gap-1.5"><Shield className="w-4 h-4 text-primary" /> Pagamento sicuro</span>
                  <span className="flex items-center gap-1.5"><Clock className="w-4 h-4 text-primary" /> Garanzia 60 giorni</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PAIN POINTS - Warm with Premium Cards */}
      <section className="py-16 sm:py-20 bg-gradient-to-b from-transparent to-secondary/20">
        <div className="container px-4 sm:px-6">
          <div className="text-center mb-12">
            <span className="inline-block bg-primary/10 text-primary px-5 py-2 rounded-full text-sm font-semibold mb-5 border border-primary/20 shadow-sm">
              Ti Riconosci?
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground">
              Ti Ritrovi in Almeno Una di
              <span className="bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent block">Queste Situazioni?</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-4 sm:gap-5 max-w-5xl mx-auto">
            {painPoints.map((point, i) => (
              <div key={i} className="bg-white/80 backdrop-blur-sm rounded-2xl p-5 sm:p-6 border border-primary/10 hover:border-primary/30 transition-all duration-300 shadow-sm hover:shadow-lg hover:shadow-primary/5">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-br from-red-100 to-red-50 flex items-center justify-center flex-shrink-0 border border-red-200/50">
                    <XCircle className="w-5 h-5 text-red-500" />
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-semibold text-foreground mb-1.5">{point.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{point.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <div className="bg-gradient-to-br from-white to-primary/5 border border-primary/20 rounded-3xl p-6 sm:p-8 max-w-2xl mx-auto shadow-lg shadow-primary/5">
              <p className="text-foreground text-lg font-medium mb-5">
                Se ti sei riconosciuto, questa guida è stata
                <span className="text-primary font-bold"> creata per te.</span>
              </p>
              <Button onClick={handleBuyClick} className="bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary text-primary-foreground font-bold py-5 px-8 rounded-xl group shadow-lg shadow-primary/20">
                Scopri la Soluzione <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* WHY DIFFERENT */}
      <section className="py-16 sm:py-20 bg-gradient-to-b from-secondary/20 to-transparent">
        <div className="container px-4 sm:px-6">
          <div className="text-center mb-12">
            <span className="inline-block bg-primary/10 text-primary px-5 py-2 rounded-full text-sm font-semibold mb-5 border border-primary/20 shadow-sm">
              Differenza
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground">
              Un Approccio
              <span className="bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent block">Completamente Diverso</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-5 sm:gap-6 max-w-5xl mx-auto">
            {uniqueFeatures.map((feature, i) => (
              <div key={i} className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 sm:p-8 border border-primary/10 text-center hover:border-primary/30 transition-all duration-300 shadow-sm hover:shadow-lg hover:shadow-primary/5">
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center mx-auto mb-5 border border-primary/10 shadow-sm">
                  <feature.icon className="w-7 h-7 sm:w-8 sm:h-8 text-primary" />
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-foreground mb-2">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TABLE OF CONTENTS */}
      <section className="py-16 sm:py-20 bg-gradient-to-b from-transparent to-secondary/10">
        <div className="container px-4 sm:px-6">
          <div className="text-center mb-12">
            <span className="inline-block bg-primary/10 text-primary px-5 py-2 rounded-full text-sm font-semibold mb-5 border border-primary/20 shadow-sm">
              Contenuti Premium
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-3">6 Capitoli Esclusivi</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-base sm:text-lg">Un percorso completo dalla psicologia alle tecniche avanzate</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 max-w-6xl mx-auto">
            {sections.map((section, i) => (
              <div key={i} className="bg-white/80 backdrop-blur-sm rounded-2xl overflow-hidden border border-primary/10 hover:border-primary/30 transition-all duration-300 group shadow-sm hover:shadow-lg hover:shadow-primary/5">
                <div className="bg-gradient-to-br from-primary/10 to-secondary/30 p-6 sm:p-8 flex justify-center">
                  <img src={section.image} alt={section.title} className="w-28 sm:w-36 h-auto rounded-lg shadow-lg group-hover:scale-105 transition-transform duration-300" loading="lazy" />
                </div>
                <div className="p-5 sm:p-6">
                  <span className="text-primary text-xs font-bold tracking-wider">CAPITOLO {i + 1}</span>
                  <h3 className="text-base sm:text-lg font-semibold text-foreground mt-2">{section.title}</h3>
                  <p className="text-muted-foreground text-sm mt-1">{section.subtitle}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 bg-gradient-to-br from-primary/5 to-primary/10 border border-primary/20 rounded-2xl p-5 sm:p-6 text-center max-w-3xl mx-auto shadow-sm">
            <p className="text-foreground font-medium text-base sm:text-lg">
              <Sparkles className="w-5 h-5 inline mr-2 text-primary" />
              Oltre 200 pagine di contenuti pratici e applicabili subito
              <Sparkles className="w-5 h-5 inline ml-2 text-primary" />
            </p>
          </div>
        </div>
      </section>

      {/* VALUE PROPOSITION / BONUSES */}
      <section className="py-16 sm:py-20 bg-gradient-to-b from-secondary/10 to-transparent">
        <div className="container px-4 sm:px-6">
          <div className="text-center mb-12">
            <span className="inline-block bg-gradient-to-r from-primary to-primary/80 text-white px-6 py-2 rounded-full text-sm font-bold mb-5 shadow-lg shadow-primary/20">
              <Gift className="w-4 h-4 inline mr-2" />
              Bonus Esclusivi Inclusi
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-3">
              6 Risorse Extra del Valore di
              <span className="bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent"> €{bonusTotal}</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 max-w-5xl mx-auto mb-10">
            {bonuses.map((bonus, i) => (
              <div key={i} className="bg-white/80 backdrop-blur-sm rounded-2xl p-5 sm:p-6 border border-primary/10 hover:border-primary/30 transition-all duration-300 shadow-sm hover:shadow-lg hover:shadow-primary/5">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center border border-primary/10">
                    <bonus.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">{bonus.title}</h3>
                    <p className="text-sm text-muted-foreground">Valore €{bonus.value}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Premium CTA Box */}
          <div className="max-w-2xl mx-auto">
            <div className="bg-gradient-to-br from-white to-primary/5 rounded-3xl p-6 sm:p-8 border border-primary/20 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.1),0_0_40px_-10px_rgba(234,88,12,0.15)]">
              <div className="text-center mb-6">
                <p className="text-muted-foreground text-sm mb-2">Valore Totale</p>
                <div className="flex items-center justify-center gap-4">
                  <span className="text-2xl text-muted-foreground line-through">€204</span>
                  <span className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">{price}</span>
                </div>
              </div>
              
              <Button 
                onClick={handleBuyClick}
                className="w-full bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary text-primary-foreground text-lg sm:text-xl md:text-2xl font-bold py-6 sm:py-7 rounded-2xl group shadow-[0_10px_30px_-5px_rgba(234,88,12,0.4)]"
              >
                Ottieni Tutto a {price}
                <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* SOCIAL PROOF */}
      <section className="py-16 sm:py-20 bg-gradient-to-b from-transparent to-secondary/20">
        <div className="container px-4 sm:px-6">
          <div className="text-center mb-12">
            <span className="inline-block bg-primary/10 text-primary px-5 py-2 rounded-full text-sm font-semibold mb-5 border border-primary/20 shadow-sm">
              Testimonianze
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground">
              Cosa Dicono i
              <span className="bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent"> Lettori</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-5 sm:gap-6 max-w-5xl mx-auto">
            {testimonials.map((testimonial, i) => (
              <div key={i} className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 sm:p-7 border border-primary/10 shadow-sm hover:shadow-lg hover:shadow-primary/5 transition-all duration-300">
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, j) => (
                    <Star key={j} className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                  ))}
                </div>
                <Quote className="w-8 h-8 text-primary/30 mb-3" />
                <p className="text-foreground/80 mb-5 leading-relaxed">"{testimonial.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center text-white font-bold text-sm">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* IS FOR YOU */}
      <section className="py-16 sm:py-20 bg-gradient-to-b from-secondary/20 to-transparent">
        <div className="container px-4 sm:px-6">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-6 sm:gap-8">
              {/* For You */}
              <div className="bg-gradient-to-br from-green-50 to-green-50/50 rounded-3xl p-6 sm:p-8 border border-green-200/50 shadow-sm">
                <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  </div>
                  È Per Te Se...
                </h3>
                <ul className="space-y-4">
                  {forYou.map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-foreground/80">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Not For You */}
              <div className="bg-gradient-to-br from-red-50 to-red-50/50 rounded-3xl p-6 sm:p-8 border border-red-200/50 shadow-sm">
                <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-red-500/20 flex items-center justify-center">
                    <X className="w-5 h-5 text-red-600" />
                  </div>
                  Non È Per Te Se...
                </h3>
                <ul className="space-y-4">
                  {notForYou.map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <X className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                      <span className="text-foreground/80">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 sm:py-20 bg-gradient-to-b from-transparent to-secondary/10">
        <div className="container px-4 sm:px-6">
          <div className="text-center mb-12">
            <span className="inline-block bg-primary/10 text-primary px-5 py-2 rounded-full text-sm font-semibold mb-5 border border-primary/20 shadow-sm">
              FAQ
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground">
              Domande
              <span className="bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent"> Frequenti</span>
            </h2>
          </div>

          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, i) => (
                <AccordionItem key={i} value={`item-${i}`} className="bg-white/80 backdrop-blur-sm rounded-2xl border border-primary/10 px-5 sm:px-6 shadow-sm">
                  <AccordionTrigger className="text-left font-semibold text-foreground hover:text-primary py-5 text-base sm:text-lg">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground pb-5 leading-relaxed">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* GUARANTEE */}
      <section className="py-16 sm:py-20 bg-gradient-to-b from-secondary/10 to-transparent">
        <div className="container px-4 sm:px-6">
          <div className="max-w-3xl mx-auto">
            <div className="bg-gradient-to-br from-white to-green-50/50 rounded-3xl p-8 sm:p-10 border border-green-200/50 text-center shadow-lg shadow-green-500/5">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-green-100 to-green-50 flex items-center justify-center mx-auto mb-6 border border-green-200/50">
                <Shield className="w-10 h-10 text-green-600" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">Tripla Garanzia 60 Giorni</h2>
              <p className="text-muted-foreground mb-6 max-w-xl mx-auto leading-relaxed">
                Se non sei soddisfatto, ti restituisco ogni centesimo. Nessuna domanda, nessun problema. E puoi tenerti i bonus.
              </p>
              <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
                {["Rimborso Completo", "Nessuna Domanda", "Tieni i Bonus"].map((item, i) => (
                  <span key={i} className="flex items-center gap-2 text-sm text-foreground font-medium bg-green-100/50 px-4 py-2 rounded-full border border-green-200/50">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-16 sm:py-20 bg-gradient-to-b from-transparent to-primary/5">
        <div className="container px-4 sm:px-6">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-6">
              Pronto a Trasformare la Tua
              <span className="bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent block">Intimità?</span>
            </h2>

            <div className="bg-gradient-to-br from-white to-primary/5 rounded-3xl p-6 sm:p-8 border border-primary/20 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.1),0_0_40px_-10px_rgba(234,88,12,0.15)]">
              <div className="flex items-center justify-center gap-4 sm:gap-6 mb-5">
                <span className="text-xl sm:text-2xl text-muted-foreground line-through">{originalPrice}</span>
                <span className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">{price}</span>
                <span className="bg-gradient-to-r from-primary to-primary/80 text-white text-sm font-bold px-4 py-1.5 rounded-full shadow-lg">-53%</span>
              </div>

              <Button 
                onClick={handleBuyClick}
                className="w-full bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary text-primary-foreground text-lg sm:text-xl md:text-2xl font-bold py-6 sm:py-7 rounded-2xl group shadow-[0_10px_30px_-5px_rgba(234,88,12,0.4)]"
              >
                Ottieni Tutto a {price}
                <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>

              <div className="mt-5 flex flex-wrap justify-center gap-4 sm:gap-6 text-sm text-muted-foreground">
                <span className="flex items-center gap-2"><Download className="w-4 h-4 text-primary" /> Download immediato</span>
                <span className="flex items-center gap-2"><Shield className="w-4 h-4 text-primary" /> Garanzia 60 giorni</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-10 sm:py-12 bg-foreground text-background">
        <div className="container px-4 sm:px-6 text-center">
          <p className="text-sm opacity-70">© 2024 Manuale dell'Idraulico Distratto. Tutti i diritti riservati.</p>
          <div className="flex justify-center gap-6 mt-4 text-sm opacity-50">
            <a href="#" className="hover:opacity-100">Privacy Policy</a>
            <a href="#" className="hover:opacity-100">Termini di Servizio</a>
            <a href="#" className="hover:opacity-100">Contatti</a>
          </div>
        </div>
      </footer>

      {/* STICKY CTA - Mobile Optimized */}
      <div className={`fixed bottom-0 left-0 right-0 z-50 transition-all duration-500 ${isStickyCTAVisible ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'}`}>
        <div className="bg-gradient-to-r from-white via-white to-white/95 backdrop-blur-xl border-t border-primary/20 px-3 sm:px-4 py-2.5 sm:py-3 shadow-[0_-8px_30px_-10px_rgba(0,0,0,0.15)]">
          <div className="max-w-lg mx-auto flex items-center justify-between gap-2 sm:gap-3">
            <div className="flex-1 min-w-0">
              <p className="text-[11px] sm:text-sm font-bold text-foreground leading-tight">Manuale dell'Idraulico Distratto</p>
              <p className="text-[10px] sm:text-xs text-primary font-medium">+ 6 BONUS inclusi</p>
              <div className="flex items-center gap-1.5 sm:gap-2 mt-0.5">
                <span className="text-[10px] sm:text-xs text-muted-foreground line-through">€79</span>
                <span className="text-base sm:text-lg font-bold text-primary">{price}</span>
                <span className="text-[9px] sm:text-[10px] bg-primary/10 text-primary font-bold px-1.5 py-0.5 rounded">-53%</span>
              </div>
            </div>
            <Button 
              onClick={handleBuyClick}
              className="bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary text-primary-foreground font-bold px-3 sm:px-5 py-2.5 sm:py-3 rounded-lg sm:rounded-xl shadow-lg shadow-primary/20 text-xs sm:text-sm whitespace-nowrap min-h-[44px] sm:min-h-[48px]"
            >
              Acquista Ora
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default IndexHybrid;
