"use client";

import { useRef, useState } from "react";

interface ImageUploaderProps {
  images: string[];
  onChange: (images: string[]) => void;
}

export default function ImageUploader({ images, onChange }: ImageUploaderProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);

  async function handleFiles(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);
    const formData = new FormData();
    for (const file of Array.from(files)) {
      formData.append("files", file);
    }

    try {
      const res = await fetch("/api/upload", { method: "POST", body: formData });
      if (res.ok) {
        const { urls } = await res.json();
        onChange([...images, ...urls]);
      }
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  }

  function removeImage(index: number) {
    onChange(images.filter((_, i) => i !== index));
  }

  function moveImage(from: number, to: number) {
    if (to < 0 || to >= images.length) return;
    const updated = [...images];
    const [moved] = updated.splice(from, 1);
    updated.splice(to, 0, moved);
    onChange(updated);
  }

  return (
    <div>
      <label className="block text-sm font-medium text-ink mb-2">
        Product Images
      </label>

      {/* Image preview grid */}
      {images.length > 0 && (
        <div className="grid grid-cols-3 gap-3 mb-3">
          {images.map((url, i) => (
            <div
              key={`${url}-${i}`}
              className="relative group aspect-[4/3] rounded-lg overflow-hidden border border-hairline bg-surface-soft"
            >
              <img
                src={url}
                alt={`Product image ${i + 1}`}
                className="w-full h-full object-cover"
              />
              {/* Overlay controls */}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                {i > 0 && (
                  <button
                    type="button"
                    onClick={() => moveImage(i, i - 1)}
                    className="w-7 h-7 rounded-full bg-white/90 flex items-center justify-center text-ink text-xs"
                    title="Move left"
                  >
                    &larr;
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => removeImage(i)}
                  className="w-7 h-7 rounded-full bg-red-500 flex items-center justify-center text-white text-xs"
                  title="Remove"
                >
                  &times;
                </button>
                {i < images.length - 1 && (
                  <button
                    type="button"
                    onClick={() => moveImage(i, i + 1)}
                    className="w-7 h-7 rounded-full bg-white/90 flex items-center justify-center text-ink text-xs"
                    title="Move right"
                  >
                    &rarr;
                  </button>
                )}
              </div>
              {i === 0 && (
                <span className="absolute top-1.5 left-1.5 px-1.5 py-0.5 bg-primary text-on-primary text-[10px] font-medium rounded">
                  Cover
                </span>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Upload button */}
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        disabled={uploading}
        className="w-full h-24 border-2 border-dashed border-hairline rounded-lg flex flex-col items-center justify-center gap-1 text-muted hover:border-primary hover:text-primary transition-colors disabled:opacity-60"
      >
        {uploading ? (
          <span className="text-sm">Uploading...</span>
        ) : (
          <>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="17 8 12 3 7 8" />
              <line x1="12" y1="3" x2="12" y2="15" />
            </svg>
            <span className="text-xs">Click to upload images</span>
          </>
        )}
      </button>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple
        onChange={handleFiles}
        className="hidden"
      />
    </div>
  );
}
