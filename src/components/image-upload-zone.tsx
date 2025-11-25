"use client";

import { useCallback, useState } from "react";
import { Accept, useDropzone } from "react-dropzone";
import { Upload, X, CheckCircle2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ImageUploadZoneProps {
  onFileSelect: (file: File | null) => void;
  acceptedFileTypes?: Accept;
  maxSize?: number;
  maxFiles?: number;
  label?: string;
}

export function ImageUploadZone({
  onFileSelect,
  acceptedFileTypes = {
    "image/jpeg": [".jpeg", ".jpg"],
    "image/png": [".png"],
  },
  maxSize = 5 * 1024 * 1024, // 5MB
  label = "Klik atau seret file",
}: ImageUploadZoneProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const onDrop = useCallback(
    (acceptedFiles: File[], rejectedFiles: any[]) => {
      setError(null);

      if (rejectedFiles.length > 0) {
        const rejection = rejectedFiles[0];
        if (rejection.errors[0]?.code === "file-invalid-type") {
          setError("Tipe file tidak didukung. Gunakan JPG, PNG, atau PDF.");
        } else if (rejection.errors[0]?.code === "file-too-large") {
          setError("Ukuran file harus kurang dari 5MB");
        }
        return;
      }

      if (acceptedFiles.length > 0) {
        const file = acceptedFiles[0];
        setSelectedFile(file);
        onFileSelect(file);

        if (file.type.startsWith("image/")) {
          const reader = new FileReader();
          reader.onload = (e) => {
            setPreview(e.target?.result as string);
          };
          reader.readAsDataURL(file);
        } else {
          setPreview(null);
        }
      }
    },
    [onFileSelect],
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: acceptedFileTypes,
    maxSize,
    maxFiles: 1,
    disabled: !!selectedFile,
  });

  const handleClear = () => {
    setSelectedFile(null);
    setPreview(null);
    setError(null);
    onFileSelect(null);
  };

  return (
    <div className="space-y-2">
      <div
        {...getRootProps()}
        className={cn(
          "relative cursor-pointer rounded-lg border-2 border-dashed transition-all",
          isDragActive && !selectedFile
            ? "border-primary bg-primary/5 shadow-md"
            : "border-border bg-muted/30 hover:bg-muted/50",
          selectedFile &&
            "border-border bg-background cursor-default border-solid",
        )}
      >
        <input {...getInputProps()} />

        {!selectedFile ? (
          <div className="flex flex-col items-center justify-center gap-3 p-8">
            <div
              className={cn(
                "rounded-full p-3 transition-colors",
                isDragActive ? "bg-primary/20" : "bg-muted",
              )}
            >
              <Upload
                className={cn(
                  "h-6 w-6 transition-colors",
                  isDragActive ? "text-primary" : "text-muted-foreground",
                )}
              />
            </div>
            <div className="text-center">
              <p className="text-foreground font-medium">{label}</p>
              <p className="text-muted-foreground mt-1 text-xs">
                atau klik untuk memilih
              </p>
            </div>
            <p className="text-muted-foreground text-xs">
              Maksimal {maxSize / 1024 / 1024}MB
            </p>
          </div>
        ) : (
          <div className="p-6">
            {preview && (
              <div className="border-border relative mb-4 overflow-hidden rounded-lg border">
                <img
                  src={preview || "/placeholder.svg"}
                  alt="Preview"
                  className="h-40 w-full object-cover"
                />
              </div>
            )}

            <div className="space-y-3">
              <div className="flex items-start gap-2">
                <CheckCircle2 className="text-primary mt-0.5 h-4 w-4 flex-shrink-0" />
                <div className="min-w-0 flex-1">
                  <p className="text-foreground truncate text-sm font-medium">
                    {selectedFile.name}
                  </p>
                  <p className="text-muted-foreground text-xs">
                    {(selectedFile.size / 1024).toFixed(2)} KB
                  </p>
                </div>
              </div>

              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handleClear}
                className="w-full gap-2 bg-transparent"
              >
                <X className="h-4 w-4" />
                Hapus File
              </Button>
            </div>
          </div>
        )}
      </div>

      {error && (
        <div className="flex items-start gap-2">
          <AlertCircle className="text-destructive mt-0.5 h-4 w-4 flex-shrink-0" />
          <p className="text-destructive text-xs">{error}</p>
        </div>
      )}
    </div>
  );
}
