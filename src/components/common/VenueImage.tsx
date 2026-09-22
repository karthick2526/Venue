import React, { useState } from 'react';
import { Building2 } from 'lucide-react';

interface VenueImageProps {
  src: string;
  alt: string;
  className?: string;
  fallbackTitle?: string;
}

export const VenueImage: React.FC<VenueImageProps> = ({
  src,
  alt,
  className = '',
  fallbackTitle
}) => {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div 
        className={`relative overflow-hidden bg-gradient-to-br from-slate-900 via-[#11192e] to-[#1e1435] flex flex-col items-center justify-center p-6 text-center border border-white/5 ${className}`}
      >
        <div className="w-12 h-12 rounded-full bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 mb-2">
          <Building2 className="w-6 h-6" />
        </div>
        {fallbackTitle && (
          <span className="text-sm font-medium text-slate-300 tracking-wide font-display line-clamp-1">
            {fallbackTitle}
          </span>
        )}
        <div className="absolute inset-0 bg-radial from-purple-500/10 via-transparent to-transparent pointer-events-none" />
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden bg-slate-950 ${className}`}>
      <img
        src={src}
        alt={alt}
        referrerPolicy="no-referrer"
        onError={() => setHasError(true)}
        className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#080b13]/80 via-transparent to-transparent pointer-events-none" />
    </div>
  );
};
