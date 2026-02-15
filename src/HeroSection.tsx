import { MapPin, Cpu, Target } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative py-16 px-4 overflow-hidden">
      {/* Background gradient effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
      
      {/* Decorative grid */}
      <div className="absolute inset-0 opacity-5">
        <div className="w-full h-full" style={{
          backgroundImage: `linear-gradient(hsl(var(--primary) / 0.3) 1px, transparent 1px),
                           linear-gradient(90deg, hsl(var(--primary) / 0.3) 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }} />
      </div>

      <div className="relative max-w-5xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
          <Cpu className="w-4 h-4 text-primary" />
          <span className="text-sm font-medium text-primary">AI-Powered Analysis</span>
        </div>

        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
          <span className="text-foreground">Village Infrastructure</span>
          <br />
          <span className="gradient-text">Feature Extraction</span>
        </h1>

        <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
          Become the cartographer of the future. Our AI model acts like a super-human analyst,
          automatically scanning drone images and pinpointing critical infrastructure with 95% precision.
        </p>

        <div className="flex flex-wrap justify-center gap-6 mb-12">
          <div className="flex items-center gap-2 text-muted-foreground">
            <MapPin className="w-5 h-5 text-primary" />
            <span>Building Footprints</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <MapPin className="w-5 h-5 text-accent" />
            <span>Road Networks</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <MapPin className="w-5 h-5 text-info" />
            <span>Water Bodies</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Target className="w-5 h-5 text-success" />
            <span>Key Assets</span>
          </div>
        </div>

        {/* Objectives cards */}
        <div className="grid md:grid-cols-3 gap-4 max-w-4xl mx-auto">
          <div className="stat-card text-left">
            <h3 className="text-lg font-semibold text-foreground mb-2">Extract Features</h3>
            <p className="text-sm text-muted-foreground">
              Identify buildings (RCC, Tiled, Tin), roads, water bodies, transformers, tanks & wells
            </p>
          </div>
          <div className="stat-card text-left">
            <h3 className="text-lg font-semibold text-foreground mb-2">High Precision</h3>
            <p className="text-sm text-muted-foreground">
              Target 95% accuracy in feature identification using advanced computer vision
            </p>
          </div>
          <div className="stat-card text-left">
            <h3 className="text-lg font-semibold text-foreground mb-2">Fast Processing</h3>
            <p className="text-sm text-muted-foreground">
              Optimized model for efficient processing and easy deployment at scale
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
