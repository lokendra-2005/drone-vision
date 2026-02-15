import { useState, useCallback } from "react";
import { Scan, RotateCcw, ImagePlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import HeroSection from "@/components/HeroSection";
import ImageUploadZone from "@/components/ImageUploadZone";
import AnalysisResults, { type AnalysisResult } from "@/components/AnlysisResult";
import LoadingAnalysis from "@/components/LoadingAnalysis";
import { supabase } from "@/integrations/supabase/client";

const Index = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [results, setResults] = useState<AnalysisResult | null>(null);
  const { toast } = useToast();

  const handleImageSelect = useCallback((file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      setSelectedImage(e.target?.result as string);
      setResults(null);
    };
    reader.readAsDataURL(file);
  }, []);

  const handleClear = useCallback(() => {
    setSelectedImage(null);
    setResults(null);
  }, []);

  const handleLoadSample = useCallback(async () => {
    // Sample drone/village imagery (public placeholder)
    const sampleUrl =
      "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800";
    try {
      const response = await fetch(sampleUrl);
      const blob = await response.blob();
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target?.result as string);
        setResults(null);
      };
      reader.readAsDataURL(blob);
    } catch {
      toast({
        title: "Could not load sample",
        description: "Check your connection and try again.",
        variant: "destructive",
      });
    }
  }, [toast]);

  const handleAnalyze = async () => {
    if (!selectedImage) {
      toast({
        title: "No image selected",
        description: "Please upload a drone image first",
        variant: "destructive",
      });
      return;
    }

    setIsAnalyzing(true);
    setResults(null);

    try {
      const { data, error } = await supabase.functions.invoke("analyze-image", {
        body: { imageBase64: selectedImage },
      });

      if (error) throw error;

      if (data.error) {
        throw new Error(data.error);
      }

      setResults(data);
      toast({
        title: "Analysis Complete",
        description: `Detected ${data.totalObjects} infrastructure features`,
      });
    } catch (error) {
      console.error("Analysis failed:", error);
      toast({
        title: "Analysis Failed",
        description: error instanceof Error ? error.message : "Please try again",
        variant: "destructive",
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-info flex items-center justify-center">
              <Scan className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-foreground">VillageVision AI</h1>
              <p className="text-xs text-muted-foreground">Drone Imagery Analysis</p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
            AI Ready
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <HeroSection />

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 pb-16">
        <section className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-foreground">Upload & Analyze</h2>
              <p className="text-muted-foreground">
                Upload drone imagery of a village to detect infrastructure features
              </p>
            </div>
            {selectedImage && !isAnalyzing && (
              <div className="flex gap-3">
                {results && (
                  <Button variant="outline" onClick={handleClear}>
                    <RotateCcw className="w-4 h-4 mr-2" />
                    New Analysis
                  </Button>
                )}
                {!results && (
                  <Button variant="hero" size="lg" onClick={handleAnalyze}>
                    <Scan className="w-5 h-5 mr-2" />
                    Analyze Image
                  </Button>
                )}
              </div>
            )}
          </div>

          {/* Upload Zone or Image Preview */}
          {!isAnalyzing && !results && (
            <>
              <ImageUploadZone
                onImageSelect={handleImageSelect}
                selectedImage={selectedImage}
                onClear={handleClear}
              />
              {!selectedImage && (
                <div className="text-center mt-4">
                  <p className="text-sm text-muted-foreground mb-3">Or try with a sample image:</p>
                  <Button variant="secondary" onClick={handleLoadSample}>
                    <ImagePlus className="w-4 h-4 mr-2" />
                    Load Sample Village Image
                  </Button>
                </div>
              )}
            </>
          )}

          {/* Loading State */}
          {isAnalyzing && <LoadingAnalysis />}

          {/* Results */}
          {results && !isAnalyzing && (
            <div className="space-y-6">
              {/* Show the analyzed image */}
              <div className="rounded-xl overflow-hidden border border-border bg-card">
                <img
                  src={selectedImage!}
                  alt="Analyzed drone imagery"
                  className="w-full h-auto max-h-[400px] object-contain"
                />
              </div>
              <AnalysisResults results={results} />
            </div>
          )}
        </section>

        {/* Info Section */}
        <section className="grid md:grid-cols-2 gap-6">
          <div className="rounded-xl bg-card border border-border p-6">
            <h3 className="text-lg font-semibold text-foreground mb-3">Input Data</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2" />
                Drone imagery & feature datasets for villages
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2" />
                High-resolution aerial photographs
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2" />
                Satellite imagery for validation
              </li>
            </ul>
          </div>

          <div className="rounded-xl bg-card border border-border p-6">
            <h3 className="text-lg font-semibold text-foreground mb-3">Expected Deliverables</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2" />
                Fully trained, optimized AI model
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2" />
                Complete documentation & deployment guide
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2" />
                Final report with accuracy metrics & recommendations
              </li>
            </ul>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-card/50 py-6">
        <div className="max-w-6xl mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>AI-Powered Feature Extraction from Drone Imagery</p>
          <p className="mt-1">Target Accuracy: 95% | Built for Efficiency</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
