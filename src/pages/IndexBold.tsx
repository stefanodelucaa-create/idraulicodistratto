import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle, Star, BookOpen, Gift, Shield, Clock, Zap, Target, AlertTriangle, Users, Award, TrendingUp, Heart, Brain, Eye } from "lucide-react";
import ebookMockup from "@/assets/ebook-mockup.png";
import bonusMockup from "@/assets/bonus-mockup.png";
import { useCartStore } from "@/stores/cartStore";
import { fetchProducts, ShopifyProduct, createStorefrontCheckout, CartItem } from "@/lib/shopify";

// Bold/Aggressive Style Landing Page - Red/Black theme with urgency
const IndexBold = () => {
  const [product, setProduct] = useState<ShopifyProduct | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProduct = async () => {
      try {
        const products = await fetchProducts(1);
        if (products.length > 0) {
          setProduct(products[0]);
        }
      } catch (error) {
        console.error("Failed to load product:", error);
      } finally {
        setLoading(false);
      }
    };
    loadProduct();
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

    try {
      toast.loading("Preparando il checkout...", { id: "checkout" });
      const checkoutUrl = await createStorefrontCheckout([cartItem]);
      toast.dismiss("checkout");
      window.open(checkoutUrl, '_blank');
    } catch (error) {
      toast.dismiss("checkout");
      toast.error("Errore durante il checkout");
    }
  };

  const price = "€37";

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Urgent Header */}
      <div className="bg-red-600 text-white py-3 text-center animate-pulse">
        <div className="container flex items-center justify-center gap-2">
          <AlertTriangle className="w-5 h-5" />
          <span className="font-bold text-sm md:text-base">⚠️ ATTENZIONE: Offerta valida solo per le prossime 24 ore! Bonus €20 GRATIS</span>
          <AlertTriangle className="w-5 h-5" />
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative py-16 lg:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-red-950/30 to-black" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-red-600/20 rounded-full blur-[150px]" />
        
        <div className="container relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 bg-red-600/20 border border-red-500/50 rounded-full px-4 py-2">
                <Zap className="w-4 h-4 text-red-500" />
                <span className="text-red-400 font-bold text-sm uppercase tracking-wider">Risultati Garantiti</span>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black leading-tight">
                SMETTI DI <span className="text-red-500">DELUDERLA</span>
                <br />
                <span className="text-red-500">INIZIA</span> A SODDISFARLA
              </h1>

              <p className="text-xl text-gray-300 max-w-lg">
                <strong className="text-white">200+ pagine</strong> di tecniche brutalmente efficaci che ti trasformeranno 
                nel partner che lei ha sempre sognato. <span className="text-red-400 font-bold">Nessuna scusa. Solo risultati.</span>
              </p>

              <div className="space-y-4">
                {[
                  "Tecniche testate su 500+ coppie reali",
                  "Zero fuffa, solo strategie che funzionano",
                  "Bonus €20 incluso GRATIS (solo oggi)",
                  "Download immediato - Inizia stasera"
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <CheckCircle className="w-6 h-6 text-red-500 flex-shrink-0" />
                    <span className="text-lg font-medium">{item}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-4 items-start">
                <Button 
                  onClick={handleBuyClick}
                  className="bg-red-600 hover:bg-red-700 text-white text-xl px-10 py-7 rounded-xl font-black uppercase tracking-wider shadow-[0_0_40px_rgba(239,68,68,0.4)] hover:shadow-[0_0_60px_rgba(239,68,68,0.6)] transition-all"
                >
                  VOGLIO SODDISFARLA ORA
                  <ArrowRight className="w-6 h-6 ml-2" />
                </Button>
                <div className="text-center sm:text-left">
                  <div className="flex items-center gap-3">
                    <span className="text-4xl font-black text-white">{price}</span>
                    <span className="text-xl text-gray-500 line-through">€87</span>
                  </div>
                  <span className="text-red-400 font-bold">-57% Solo Oggi</span>
                </div>
              </div>
            </div>

            <div className="relative flex justify-center">
              <div className="absolute inset-0 bg-red-600/20 rounded-3xl blur-3xl" />
              <div className="relative">
                <img src={ebookMockup} alt="Manuale" className="w-80 lg:w-96 drop-shadow-2xl" style={{ filter: 'drop-shadow(0 25px 50px rgba(239,68,68,0.3))' }} />
                <img src={bonusMockup} alt="Bonus" className="w-48 lg:w-56 absolute -right-4 bottom-0 drop-shadow-2xl" style={{ filter: 'drop-shadow(0 20px 40px rgba(239,68,68,0.2))' }} />
                <div className="absolute -top-4 -right-4 bg-red-600 text-white px-4 py-2 rounded-xl font-black text-sm animate-bounce">
                  BONUS €20 GRATIS
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pain Points - Aggressive */}
      <section className="py-20 bg-gradient-to-b from-black to-zinc-900">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black mb-4">
              <span className="text-red-500">STANCO</span> DI QUESTI PROBLEMI?
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              La verità fa male. Ma è l'unico modo per cambiare.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: AlertTriangle, title: "Lei finge", desc: "Lo sai. Lo senti. E questo ti distrugge dentro." },
              { icon: Clock, title: "Finisci troppo presto", desc: "L'imbarazzo che provi ogni volta è insopportabile." },
              { icon: Target, title: "Non sai cosa fare", desc: "Brancoli nel buio mentre lei aspetta... invano." },
              { icon: Heart, title: "La passione muore", desc: "Il rapporto si spegne e lei cerca altrove." },
              { icon: Brain, title: "Ansia da prestazione", desc: "La mente ti sabota prima ancora di iniziare." },
              { icon: Eye, title: "Ti confronti con altri", desc: "E perdi sempre. O almeno così ti sembra." },
            ].map((item, i) => (
              <div key={i} className="bg-zinc-900 border border-red-900/30 rounded-xl p-6 hover:border-red-600/50 transition-colors">
                <item.icon className="w-10 h-10 text-red-500 mb-4" />
                <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                <p className="text-gray-400">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-red-600">
        <div className="container">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {[
              { value: "500+", label: "Uomini Trasformati" },
              { value: "94%", label: "Successo Garantito" },
              { value: "200+", label: "Pagine di Potere" },
              { value: "24h", label: "Risultati Immediati" },
            ].map((stat, i) => (
              <div key={i}>
                <div className="text-4xl md:text-5xl font-black mb-2">{stat.value}</div>
                <div className="font-semibold text-red-100">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Transformation */}
      <section className="py-20 bg-zinc-900">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black mb-4">
              LA TUA <span className="text-red-500">TRASFORMAZIONE</span>
            </h2>
          </div>

          <div className="max-w-4xl mx-auto space-y-6">
            {[
              { before: "Insicuro e ansioso", after: "Sicuro e dominante" },
              { before: "Lei finge soddisfazione", after: "Lei grida il tuo nome" },
              { before: "Rapporti brevi e deludenti", after: "Sessioni intense e memorabili" },
              { before: "Paura di non bastare", after: "Consapevolezza del tuo valore" },
            ].map((item, i) => (
              <div key={i} className="flex flex-col md:flex-row items-center gap-4 bg-black rounded-xl p-6 border border-zinc-800">
                <div className="flex-1 bg-zinc-800 rounded-lg p-4 text-center">
                  <span className="text-xs font-bold text-red-500 uppercase">Prima</span>
                  <p className="text-gray-400 font-medium mt-1">{item.before}</p>
                </div>
                <ArrowRight className="w-8 h-8 text-red-500 rotate-90 md:rotate-0" />
                <div className="flex-1 bg-red-950/50 border border-red-900/50 rounded-lg p-4 text-center">
                  <span className="text-xs font-bold text-red-400 uppercase">Dopo</span>
                  <p className="text-white font-bold mt-1">{item.after}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-gradient-to-t from-red-950 to-black">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black mb-6">
              È ORA DI <span className="text-red-500">AGIRE</span>
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Ogni notte che passa è un'opportunità persa. Lei sta aspettando. 
              <span className="text-red-400 font-bold"> Quanto ancora vuoi farla aspettare?</span>
            </p>

            <div className="bg-zinc-900 border border-red-900/50 rounded-2xl p-8 mb-8">
              <div className="flex items-center justify-center gap-4 mb-6">
                <span className="text-5xl md:text-6xl font-black text-white">{price}</span>
                <span className="text-2xl text-gray-500 line-through">€87</span>
              </div>
              <Button 
                onClick={handleBuyClick}
                className="bg-red-600 hover:bg-red-700 text-white text-xl px-12 py-8 rounded-xl font-black uppercase tracking-wider shadow-[0_0_40px_rgba(239,68,68,0.4)] hover:shadow-[0_0_60px_rgba(239,68,68,0.6)] transition-all w-full sm:w-auto"
              >
                SÌ, VOGLIO TRASFORMARMI ORA
                <ArrowRight className="w-6 h-6 ml-2" />
              </Button>
              <p className="mt-4 text-gray-500">Download immediato • Pagamento sicuro • Privacy garantita</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-black border-t border-zinc-800">
        <div className="container text-center text-gray-500 text-sm">
          <p>© 2024 Manuale dell'Idraulico Distratto. Tutti i diritti riservati.</p>
        </div>
      </footer>
    </div>
  );
};

export default IndexBold;
