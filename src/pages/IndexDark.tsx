import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle, Star, BookOpen, Gift, Shield, Clock, Sparkles, Crown, Diamond, Heart, Eye, Flame } from "lucide-react";
import ebookMockup from "@/assets/ebook-mockup.png";
import bonusMockup from "@/assets/bonus-mockup.png";
import { fetchProducts, ShopifyProduct, createStorefrontCheckout, CartItem } from "@/lib/shopify";

// Dark Mode Premium Style - Elegant dark theme with gold accents
const IndexDark = () => {
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

  const price = product 
    ? `€${parseFloat(product.node.priceRange.minVariantPrice.amount).toFixed(0)}`
    : "€47";

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white" style={{ fontFamily: "'DM Sans', sans-serif" }}>
      {/* Elegant Header */}
      <div className="bg-gradient-to-r from-amber-900/30 via-amber-600/20 to-amber-900/30 border-b border-amber-500/20 py-3 text-center">
        <div className="container flex items-center justify-center gap-2">
          <Crown className="w-4 h-4 text-amber-400" />
          <span className="text-amber-200 text-sm font-medium tracking-wide">Edizione Premium — Bonus Esclusivo Incluso</span>
          <Crown className="w-4 h-4 text-amber-400" />
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative py-20 lg:py-28 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-amber-600/10 rounded-full blur-[180px]" />
          <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-purple-600/10 rounded-full blur-[150px]" />
        </div>
        
        <div className="container relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500/10 to-transparent border border-amber-500/30 rounded-full px-5 py-2">
                <Diamond className="w-4 h-4 text-amber-400" />
                <span className="text-amber-300 text-sm font-medium tracking-wider uppercase">Collezione Esclusiva</span>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
                L'Arte dell'
                <span className="block bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 bg-clip-text text-transparent">
                  Intimità Perfetta
                </span>
              </h1>

              <p className="text-xl text-gray-400 max-w-lg leading-relaxed">
                Un'opera raffinata di <span className="text-amber-300">oltre 200 pagine</span> che eleva 
                l'intimità di coppia a una forma d'arte. Per chi non si accontenta dell'ordinario.
              </p>

              <div className="space-y-4">
                {[
                  { icon: Sparkles, text: "Tecniche esclusive mai rivelate prima" },
                  { icon: Crown, text: "Approccio scientifico e raffinato" },
                  { icon: Gift, text: "Collezione bonus del valore di €20" },
                  { icon: Shield, text: "Discrezione assoluta garantita" }
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500/20 to-amber-600/10 flex items-center justify-center">
                      <item.icon className="w-5 h-5 text-amber-400" />
                    </div>
                    <span className="text-gray-300 font-medium">{item.text}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-6 items-start pt-4">
                <Button 
                  onClick={handleBuyClick}
                  className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-black text-lg px-10 py-7 rounded-xl font-bold shadow-[0_0_50px_rgba(245,158,11,0.3)] hover:shadow-[0_0_70px_rgba(245,158,11,0.4)] transition-all"
                >
                  Accedi alla Collezione
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
                <div>
                  <div className="flex items-center gap-3">
                    <span className="text-4xl font-bold bg-gradient-to-r from-amber-300 to-amber-500 bg-clip-text text-transparent">{price}</span>
                    <span className="text-gray-500 line-through text-lg">€87</span>
                  </div>
                  <span className="text-amber-400/80 text-sm">Offerta esclusiva</span>
                </div>
              </div>
            </div>

            <div className="relative flex justify-center">
              <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 to-purple-500/10 rounded-3xl blur-3xl" />
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-br from-amber-500/20 via-transparent to-purple-500/20 rounded-3xl" />
                <img src={ebookMockup} alt="Manuale Premium" className="relative z-10 w-80 lg:w-[380px] drop-shadow-2xl" style={{ filter: 'drop-shadow(0 30px 60px rgba(245,158,11,0.2))' }} />
                <img src={bonusMockup} alt="Bonus Collection" className="absolute -right-4 bottom-4 w-44 lg:w-52 drop-shadow-2xl z-20" style={{ filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.4))' }} />
                <div className="absolute top-6 -right-2 bg-gradient-to-br from-amber-500 to-amber-600 text-black px-4 py-2 rounded-xl font-bold text-sm z-30 shadow-lg">
                  <Gift className="w-4 h-4 inline mr-1" />
                  BONUS INCLUSO
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 bg-gradient-to-b from-[#0a0a0f] to-[#0f0f18]">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
              Un'Esperienza <span className="text-amber-400">Senza Pari</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Ogni dettaglio è stato curato per offrirti il meglio
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: Eye, title: "Visione Profonda", desc: "Comprendi la psicologia del desiderio femminile a un livello superiore." },
              { icon: Heart, title: "Connessione Autentica", desc: "Crea un legame emotivo che amplifica ogni esperienza fisica." },
              { icon: Flame, title: "Passione Duratura", desc: "Tecniche per mantenere viva la fiamma anche dopo anni insieme." },
              { icon: Crown, title: "Maestria Totale", desc: "Diventa un esperto in ogni aspetto dell'intimità di coppia." },
              { icon: Sparkles, title: "Momenti Magici", desc: "Trasforma ogni incontro in un'esperienza indimenticabile." },
              { icon: Shield, title: "Privacy Assoluta", desc: "Consegna discreta e anonima, nessun dato condiviso." },
            ].map((item, i) => (
              <div key={i} className="group bg-gradient-to-br from-white/5 to-transparent border border-white/10 rounded-2xl p-8 hover:border-amber-500/30 transition-all duration-300">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-500/20 to-amber-600/10 flex items-center justify-center mb-6 group-hover:shadow-[0_0_30px_rgba(245,158,11,0.2)] transition-all">
                  <item.icon className="w-7 h-7 text-amber-400" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-white">{item.title}</h3>
                <p className="text-gray-400 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-gradient-to-r from-amber-900/20 via-amber-800/30 to-amber-900/20 border-y border-amber-500/20">
        <div className="container">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {[
              { value: "500+", label: "Coppie Trasformate" },
              { value: "4.9", label: "Valutazione Media" },
              { value: "200+", label: "Pagine di Contenuti" },
              { value: "100%", label: "Discrezione" },
            ].map((stat, i) => (
              <div key={i}>
                <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-amber-300 to-amber-500 bg-clip-text text-transparent mb-2">{stat.value}</div>
                <div className="text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-[#0f0f18]">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
              Cosa Dicono i <span className="text-amber-400">Nostri Clienti</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              { text: "Una guida raffinata e completa. Ha trasformato completamente il nostro rapporto.", author: "Marco, 34 anni" },
              { text: "Finalmente un approccio elegante e scientifico. Risultati oltre ogni aspettativa.", author: "Luca, 41 anni" },
              { text: "Discreto, professionale e incredibilmente efficace. Vale ogni centesimo.", author: "Andrea, 29 anni" },
            ].map((item, i) => (
              <div key={i} className="bg-gradient-to-br from-white/5 to-transparent border border-white/10 rounded-2xl p-8">
                <div className="flex gap-1 mb-4">
                  {[1,2,3,4,5].map((s) => <Star key={s} className="w-5 h-5 fill-amber-400 text-amber-400" />)}
                </div>
                <p className="text-gray-300 mb-6 italic">"{item.text}"</p>
                <p className="text-amber-400 font-medium">{item.author}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 bg-gradient-to-t from-[#0a0a0f] to-[#0f0f18] relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-amber-600/10 rounded-full blur-[200px]" />
        </div>
        
        <div className="container relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <Crown className="w-12 h-12 text-amber-400 mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
              Eleva la Tua <span className="text-amber-400">Intimità</span>
            </h2>
            <p className="text-xl text-gray-400 mb-10 max-w-xl mx-auto">
              Unisciti a oltre 500 uomini che hanno scelto l'eccellenza.
            </p>

            <div className="bg-gradient-to-br from-white/5 to-white/[0.02] border border-amber-500/20 rounded-3xl p-10 backdrop-blur-sm">
              <div className="flex items-center justify-center gap-4 mb-6">
                <span className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-amber-300 to-amber-500 bg-clip-text text-transparent">{price}</span>
                <span className="text-xl text-gray-500 line-through">€87</span>
              </div>
              <Button 
                onClick={handleBuyClick}
                className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-black text-xl px-12 py-8 rounded-xl font-bold shadow-[0_0_50px_rgba(245,158,11,0.3)] hover:shadow-[0_0_70px_rgba(245,158,11,0.4)] transition-all"
              >
                Accedi Ora alla Collezione Premium
                <ArrowRight className="w-6 h-6 ml-2" />
              </Button>
              <div className="flex items-center justify-center gap-6 mt-6 text-gray-500 text-sm">
                <span className="flex items-center gap-2"><Shield className="w-4 h-4" /> Pagamento sicuro</span>
                <span className="flex items-center gap-2"><Clock className="w-4 h-4" /> Download immediato</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-[#0a0a0f] border-t border-white/5">
        <div className="container text-center text-gray-600 text-sm">
          <p>© 2024 Manuale dell'Idraulico Distratto. Tutti i diritti riservati.</p>
        </div>
      </footer>
    </div>
  );
};

export default IndexDark;
