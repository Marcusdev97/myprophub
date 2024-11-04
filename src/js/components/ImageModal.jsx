import React from 'react';
import { X } from 'lucide-react';

const ImageModal = ({ image, alt, onClose }) => {
  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75 backdrop-blur-sm"
      onClick={onClose}
    >
      <div className="relative max-w-7xl mx-auto p-4 w-full">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-white hover:text-gray-300 transition-colors"
        >
          <X className="w-8 h-8" />
        </button>
        <img
          src={image}
          alt={alt}
          className="w-full h-auto max-h-[90vh] object-contain rounded-lg"
          onClick={e => e.stopPropagation()}
        />
      </div>
    </div>
  );
};

export default ImageModal;