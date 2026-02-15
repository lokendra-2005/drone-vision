import { useState, useCallback, useRef } from "react";
import { Upload, Image as ImageIcon, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ImageUploadZoneProps {
  onImageSelect: (file: File) => void;
  selectedImage: string | null;
  onClear: () => void;
}

const ImageUploadZone = ({ onImageSelect, selectedImage, onClear }: ImageUploadZoneProps) => {
  const [isDragActive, setIsDragActive] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setIsDragActive(true);
    } else if (e.type === "dragleave") {
      setIsDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);

    const files = e.dataTransfer.files;
    if (files && files[0] && files[0].type.startsWith("image/")) {
      onImageSelect(files[0]);
    }
  }, [onImageSelect]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0]) {
      onImageSelect(files[0]);
    }
  };

  const handleClick = () => {
    inputRef.current?.click();
  };

  if (selectedImage) {
    return (
      <div className="relative rounded-xl overflow-hidden border border-border bg-card">
        <img
          src={selectedImage}
          alt="Uploaded drone imagery"
          className="w-full h-auto max-h-[500px] object-contain"
        />
        <Button
          variant="destructive"
          size="icon"
          className="absolute top-3 right-3"
          onClick={onClear}
        >
          <X className="w-4 h-4" />
        </Button>
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-background/90 to-transparent p-4">
          <p className="text-sm text-muted-foreground">
            <ImageIcon className="w-4 h-4 inline mr-2" />
            Drone imagery loaded - ready for analysis
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`upload-zone p-12 text-center cursor-pointer ${isDragActive ? "drag-active" : ""}`}
      onDragEnter={handleDrag}
      onDragLeave={handleDrag}
      onDragOver={handleDrag}
      onDrop={handleDrop}
      onClick={handleClick}
    >
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={handleChange}
        className="hidden"
      />
      
      <div className="flex flex-col items-center gap-4">
        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
          <Upload className="w-8 h-8 text-primary" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-foreground mb-2">
            Upload Drone Imagery
          </h3>
          <p className="text-muted-foreground text-sm mb-4">
            Drag and drop your village aerial image, or click to browse
          </p>
          <p className="text-xs text-muted-foreground">
            Supports: JPG, PNG, WebP • Max size: 10MB
          </p>
        </div>
        <Button variant="outline" className="mt-2">
          Select Image
        </Button>
      </div>
    </div>
  );
};

export default ImageUploadZone;
