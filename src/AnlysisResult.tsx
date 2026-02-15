import { Building2, Route, Droplets, Zap, CircleDot, Home, Factory } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export interface Detection {
  type: string;
  category?: string;
  count: number;
  confidence: number;
  description?: string;
}

export interface AnalysisResult {
  totalObjects: number;
  detections: Detection[];
  summary: string;
  processingTime?: number;
}

interface AnalysisResultsProps {
  results: AnalysisResult;
}

const getIconForType = (type: string) => {
  const iconMap: Record<string, React.ReactNode> = {
    building: <Building2 className="w-5 h-5" />,
    "building footprint": <Building2 className="w-5 h-5" />,
    road: <Route className="w-5 h-5" />,
    "road network": <Route className="w-5 h-5" />,
    water: <Droplets className="w-5 h-5" />,
    "water body": <Droplets className="w-5 h-5" />,
    transformer: <Zap className="w-5 h-5" />,
    tank: <CircleDot className="w-5 h-5" />,
    "overhead tank": <CircleDot className="w-5 h-5" />,
    well: <CircleDot className="w-5 h-5" />,
    house: <Home className="w-5 h-5" />,
    infrastructure: <Factory className="w-5 h-5" />,
  };
  return iconMap[type.toLowerCase()] || <CircleDot className="w-5 h-5" />;
};

const getColorForType = (type: string): string => {
  const colorMap: Record<string, string> = {
    building: "bg-primary/20 text-primary border-primary/30",
    "building footprint": "bg-primary/20 text-primary border-primary/30",
    road: "bg-accent/20 text-accent border-accent/30",
    "road network": "bg-accent/20 text-accent border-accent/30",
    water: "bg-info/20 text-info border-info/30",
    "water body": "bg-info/20 text-info border-info/30",
    transformer: "bg-warning/20 text-warning border-warning/30",
    tank: "bg-success/20 text-success border-success/30",
    "overhead tank": "bg-success/20 text-success border-success/30",
    well: "bg-success/20 text-success border-success/30",
  };
  return colorMap[type.toLowerCase()] || "bg-secondary text-secondary-foreground border-border";
};

const AnalysisResults = ({ results }: AnalysisResultsProps) => {
  return (
    <div className="space-y-6">
      {/* Summary Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="stat-card">
          <p className="text-3xl font-bold text-primary">{results.totalObjects}</p>
          <p className="text-sm text-muted-foreground">Objects Detected</p>
        </div>
        <div className="stat-card">
          <p className="text-3xl font-bold text-success">{results.detections.length}</p>
          <p className="text-sm text-muted-foreground">Categories Found</p>
        </div>
        <div className="stat-card">
          <p className="text-3xl font-bold text-accent">
            {Math.round(results.detections.reduce((acc, d) => acc + d.confidence, 0) / results.detections.length || 0)}%
          </p>
          <p className="text-sm text-muted-foreground">Avg Confidence</p>
        </div>
        <div className="stat-card">
          <p className="text-3xl font-bold text-info">{results.processingTime || 0}s</p>
          <p className="text-sm text-muted-foreground">Processing Time</p>
        </div>
      </div>

      {/* AI Summary */}
      <div className="rounded-xl bg-card border border-border p-6">
        <h3 className="text-lg font-semibold text-foreground mb-3">AI Analysis Summary</h3>
        <p className="text-muted-foreground leading-relaxed">{results.summary}</p>
      </div>

      {/* Detected Objects */}
      <div className="rounded-xl bg-card border border-border p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Detected Features</h3>
        <div className="space-y-3">
          {results.detections.map((detection, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-4 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${getColorForType(detection.type)} border`}>
                  {getIconForType(detection.type)}
                </div>
                <div>
                  <p className="font-medium text-foreground capitalize">{detection.type}</p>
                  {detection.category && (
                    <p className="text-sm text-muted-foreground">{detection.category}</p>
                  )}
                  {detection.description && (
                    <p className="text-xs text-muted-foreground mt-1">{detection.description}</p>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <p className="text-2xl font-bold text-foreground">{detection.count}</p>
                  <p className="text-xs text-muted-foreground">detected</p>
                </div>
                <Badge variant="outline" className={getColorForType(detection.type)}>
                  {detection.confidence}%
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AnalysisResults;
