// components/ImageUploadWithWatermark.jsx
'use client';

import { useState } from 'react';

export default function ImageUploadWithWatermark({ onUploadComplete }) {
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState('');

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => setPreview(e.target.result);
      reader.readAsDataURL(file);
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const file = formData.get('image');

    if (!file) {
      alert('Please select an image');
      return;
    }

    setUploading(true);

    try {
      const response = await fetch('/api/products/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        alert('Image uploaded successfully with watermark!');
        onUploadComplete?.(data);
        setPreview('');
        e.target.reset();
      } else {
        alert(data.error || 'Upload failed');
      }
    } catch (error) {
      console.error('Upload error:', error);
      alert('Upload failed');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-4">
      <form onSubmit={handleUpload} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Product Image (will be watermarked automatically)
          </label>
          <input
            type="file"
            name="image"
            accept="image/jpeg,image/jpg,image/png,image/webp"
            onChange={handleFileChange}
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-yellow-50 file:text-yellow-700 hover:file:bg-yellow-100"
            required
          />
          <p className="text-xs text-gray-500 mt-1">
            JPEG, PNG, or WebP. Max 10MB. Watermark "yafrican.com" will be added automatically.
          </p>
        </div>

        {preview && (
          <div className="mt-4">
            <p className="text-sm font-medium text-gray-700 mb-2">Preview:</p>
            <img 
              src={preview} 
              alt="Preview" 
              className="max-w-xs rounded-lg border"
            />
          </div>
        )}

        <button
          type="submit"
          disabled={uploading}
          className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {uploading ? 'Uploading...' : 'Upload Image with Watermark'}
        </button>
      </form>
    </div>
  );
}