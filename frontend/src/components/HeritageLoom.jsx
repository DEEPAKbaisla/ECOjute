import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { Leaf, ArrowLeft, Heart, ShieldCheck, Droplets, Sparkles } from "lucide-react";
import Navbar from "@/components/Navbar";
import loomImage from "@/assests/making.png";

const HeritageLoom = () => {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background text-foreground pt-28 pb-20">
        <div className="max-w-4xl mx-auto px-6 md:px-16">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
          >
            <ArrowLeft size={16} />
            Back to Home
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="font-mono text-[12px] uppercase text-muted-foreground tracking-widest font-bold">
              the human foundation
            </span>
            <h1 className="garamond text-3xl md:text-5xl font-bold text-foreground mt-3">
              Preserving Bengal's Heritage Loom
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-12 space-y-8"
          >
            <div className="rounded-3xl border border-border shadow-sm bg-muted/20 flex items-center justify-center p-4">
              <img
                src={loomImage}
                alt="Bengal Heritage Loom"
                className="w-full h-auto max-h-[500px] object-contain rounded-2xl"
              />
            </div>

            <section>
              <h2 className="font-serif text-2xl font-bold text-foreground mb-4">
                The Legacy of Bengal's Looms
              </h2>
              <p className="text-foreground/80 text-base leading-relaxed">
                Bengal's handloom tradition spans centuries, with each weave carrying the
                cultural DNA of a region known for its textile mastery. The heritage loom
                is not merely a tool — it is a living archive of techniques passed down
                through generations of master weavers. At EcoJute, we partner with
                family-owned loom collectives in West Bengal, ensuring this ancient craft
                not only survives but thrives in the modern era.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-2xl font-bold text-foreground mb-4">
                The Weaver's Artistry
              </h2>
              <p className="text-foreground/80 text-base leading-relaxed">
                Every jute product begins as raw fiber, hand-selected and sun-dried before
                being fed into the wooden shuttle looms. Our master weavers, like Meera
                Sen who operates the large-format looms, bring decades of expertise to
                every piece. The subtle variations in weave density, the intentional
                irregularities in texture — these are not flaws but signatures of
                authentic handcraft. Each piece is unique, bearing the unmistakable
                imprint of its maker.
              </p>
            </section>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-8">
              {[
                { icon: Heart, title: "Fair Trade Certified", desc: "Weavers earn certified living margins, bypassing exploitative intermediaries." },
                { icon: Droplets, title: "Monsoon-Fed Jute", desc: "Our jute requires no irrigation, relying solely on Bengal's natural rainfall." },
                { icon: Sparkles, title: "Digital Schools", desc: "Each purchase helps underwrite digital primary schools in weaving communities." },
              ].map((item) => (
                <div key={item.title} className="bg-card border border-border rounded-2xl p-6 text-center hover:shadow-md transition-shadow">
                  <item.icon className="h-8 w-8 text-primary mx-auto mb-3" />
                  <h3 className="font-serif text-lg font-bold text-foreground">{item.title}</h3>
                  <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>

            <section>
              <h2 className="font-serif text-2xl font-bold text-foreground mb-4">
                Direct Fair Trade Integration
              </h2>
              <p className="text-foreground/80 text-base leading-relaxed">
                We bypass layers of intermediaries to ensure maximum value reaches the
                weaver's household. Through direct fair trade integration, weavers like
                Amara Devi and Sunita Halder earn certified living margins that support
                local households and fund community initiatives. This model preserves the
                autonomy of artisan communities while connecting them to global markets
                that value authenticity.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-2xl font-bold text-foreground mb-4">
                Sustainability Rooted in Tradition
              </h2>
              <p className="text-foreground/80 text-base leading-relaxed">
                Before sustainability became a global movement, Bengal's weavers were
                practicing it. Jute grows with minimal water, requires no chemical
                fertilizers, and captures carbon at rates exceeding primary forestry.
                The wooden looms are powered by human skill, not electricity. Natural
                dyes derived from plants create rich, earthy tones that age beautifully.
                This is fashion that heals the planet rather than harms it.
              </p>
            </section>

            <section className="bg-muted/30 border border-border rounded-3xl p-8 text-center mt-12">
              <Leaf className="h-10 w-10 text-primary mx-auto mb-4" />
              <h2 className="font-serif text-2xl font-bold text-foreground mb-3">
                Every Weave Tells a Story
              </h2>
              <p className="text-foreground/80 text-base leading-relaxed max-w-2xl mx-auto">
                When you choose EcoJute, you're not just buying a bag — you're
                preserving a heritage, supporting a weaver's livelihood, and
                investing in a sustainable future for Bengal's handloom tradition.
              </p>
              <div className="flex items-center justify-center gap-2 mt-6 text-sm text-muted-foreground">
                <ShieldCheck size={16} className="text-primary" />
                <span>Bengal-Coop88A Certified</span>
                <span className="text-muted-foreground/40">|</span>
                <Leaf size={16} className="text-primary" />
                <span>Carbon Neutral</span>
              </div>
            </section>
          </motion.div>
        </div>
      </main>
    </>
  );
};

export default HeritageLoom;
