import React, { useRef, useState } from 'react';
import { Upload, X, ImageIcon, Loader } from 'lucide-react';
import { uploadImage } from '../lib/supabase';

/**
 * ImageUpload — drag-drop + click-to-browse file uploader.
 * Uploads to Supabase Storage and returns the public URL via onUpload(url).
 * Also accepts a manual URL via onUrlChange for legacy compatibility.
 */
const ImageUpload = ({ currentUrl, onUpload, folder = 'general', label = 'Image' }) => {
  const inputRef = useRef(null);
  const [dragging, setDragging] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const [preview, setPreview] = useState(currentUrl || '');

  const handleFile = async (file) => {
    if (!file || !file.type.startsWith('image/')) {
      setError('Please select a valid image file.');
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      setError('File must be under 10MB.');
      return;
    }
    setError('');
    setUploading(true);

    // Show local preview immediately
    const localUrl = URL.createObjectURL(file);
    setPreview(localUrl);

    try {
      const publicUrl = await uploadImage(file, folder);
      setPreview(publicUrl);
      onUpload(publicUrl);
    } catch (e) {
      setError('Upload failed: ' + (e.message || 'Check Supabase credentials'));
      setPreview(currentUrl || '');
    } finally {
      setUploading(false);
    }
  };

  const onDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  };

  const clearImage = () => {
    setPreview('');
    onUpload('');
    if (inputRef.current) inputRef.current.value = '';
  };

  return (
    <div className="flex flex-col gap-2 w-full">
      <label className="text-sm text-muted-foreground font-medium">{label}</label>

      {/* Preview strip */}
      {preview && (
        <div className="relative w-full h-40 rounded-xl overflow-hidden border border-primary/30 group">
          <img src={preview} alt="Preview" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
            <button type="button" onClick={clearImage} className="flex items-center gap-1 bg-red-600 text-white px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-red-700 transition-colors">
              <X size={12} /> Remove
            </button>
            <button type="button" onClick={() => inputRef.current?.click()} className="flex items-center gap-1 bg-white/20 text-white px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-white/30 transition-colors">
              <Upload size={12} /> Replace
            </button>
          </div>
          {uploading && (
            <div className="absolute inset-0 bg-black/70 flex flex-col items-center justify-center gap-2">
              <Loader size={24} className="text-primary animate-spin" />
              <span className="text-white text-xs font-semibold">Uploading to Supabase...</span>
            </div>
          )}
        </div>
      )}

      {/* Drop zone (hidden when preview exists) */}
      {!preview && (
        <div
          className={`relative w-full h-40 rounded-xl border-2 border-dashed flex flex-col items-center justify-center gap-3 cursor-pointer transition-all ${
            dragging ? 'border-primary bg-primary/10 scale-[1.01]' : 'border-border hover:border-primary/60 hover:bg-primary/5'
          } ${uploading ? 'pointer-events-none opacity-60' : ''}`}
          onClick={() => inputRef.current?.click()}
          onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
          onDragLeave={() => setDragging(false)}
          onDrop={onDrop}
        >
          {uploading ? (
            <>
              <Loader size={28} className="text-primary animate-spin" />
              <span className="text-sm text-muted-foreground font-medium">Uploading...</span>
            </>
          ) : (
            <>
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <ImageIcon size={22} className="text-primary" />
              </div>
              <div className="text-center">
                <p className="text-sm font-semibold text-foreground">Drop image here or <span className="text-primary underline underline-offset-2">browse</span></p>
                <p className="text-xs text-muted-foreground mt-0.5">PNG, JPG, WEBP up to 10MB</p>
              </div>
            </>
          )}
        </div>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
      />

      {error && <p className="text-xs text-red-400 font-medium">{error}</p>}
    </div>
  );
};

export default ImageUpload;
