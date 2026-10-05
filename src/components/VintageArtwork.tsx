import React from 'react';

interface VintageArtworkProps {
  type: string;
  className?: string;
  accentColor?: string;
}

export const VintageArtwork: React.FC<VintageArtworkProps> = ({
  type,
  className = "w-full h-full",
  accentColor = "#8c6d3b"
}) => {
  switch (type) {
    case 'rainy-umbrella':
      return (
        <svg viewBox="0 0 400 300" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Subtle rain lines */}
          <g stroke={accentColor} strokeWidth="1" strokeOpacity="0.35" strokeDasharray="5 15">
            <line x1="20" y1="0" x2="10" y2="300" />
            <line x1="70" y1="0" x2="60" y2="300" />
            <line x1="120" y1="0" x2="110" y2="300" />
            <line x1="180" y1="0" x2="170" y2="300" />
            <line x1="240" y1="0" x2="230" y2="300" />
            <line x1="300" y1="0" x2="290" y2="300" />
            <line x1="360" y1="0" x2="350" y2="300" />
          </g>
          {/* Vintage Gas Lamp */}
          <g stroke={accentColor} strokeWidth="1.5" strokeOpacity="0.6">
            <line x1="80" y1="280" x2="80" y2="120" />
            <path d="M70 120 L90 120 L85 90 L75 90 Z" fill={accentColor} fillOpacity="0.15" />
            <circle cx="80" cy="105" r="8" fill="#e8c07d" fillOpacity="0.4" />
            <line x1="65" y1="280" x2="95" y2="280" />
          </g>
          {/* Couple under umbrella silhouette */}
          <g fill={accentColor} fillOpacity="0.75">
            {/* Umbrella canopy */}
            <path d="M220 130 C220 80, 320 80, 320 130 C305 125, 290 135, 270 125 C250 135, 235 125, 220 130 Z" />
            <path d="M270 85 L270 190 C270 198, 260 198, 260 192" stroke={accentColor} strokeWidth="2.5" fill="none" />
            {/* Heads & shoulders */}
            <circle cx="255" cy="150" r="10" />
            <circle cx="280" cy="155" r="9" />
            <path d="M245 165 C245 165, 265 160, 270 170 L268 240 L240 240 Z" />
            <path d="M270 170 C270 165, 290 162, 295 172 L290 240 L265 240 Z" />
          </g>
          {/* Cobblestone puddles */}
          <ellipse cx="270" cy="245" rx="50" ry="8" stroke={accentColor} strokeWidth="1" strokeOpacity="0.4" fill="none" />
          <ellipse cx="80" cy="275" rx="30" ry="5" stroke={accentColor} strokeWidth="1" strokeOpacity="0.3" fill="none" />
        </svg>
      );

    case 'letter-quill':
      return (
        <svg viewBox="0 0 400 300" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Vintage open envelope */}
          <g stroke={accentColor} strokeWidth="1.5" strokeOpacity="0.65" fill={accentColor} fillOpacity="0.08">
            <rect x="90" y="110" width="180" height="110" rx="3" />
            <path d="M90 110 L180 180 L270 110" />
            <path d="M90 220 L155 160" />
            <path d="M270 220 L205 160" />
          </g>
          {/* Wax Seal */}
          <circle cx="180" cy="175" r="16" fill="#8f222b" />
          <circle cx="180" cy="175" r="12" stroke="#d4af37" strokeWidth="1" fill="#75151e" />
          <path d="M176 172 C176 170, 180 168, 184 172 C188 176, 180 182, 180 182" stroke="#d4af37" strokeWidth="1.2" strokeLinecap="round" />
          {/* Quill Feather */}
          <g stroke={accentColor} strokeWidth="1.5">
            <path d="M240 230 C260 170, 310 90, 330 60 C325 85, 305 130, 275 180" fill={accentColor} fillOpacity="0.2" />
            <path d="M240 230 C265 170, 310 90, 330 60" />
            <path d="M238 234 L244 226" stroke="#221a14" strokeWidth="2" />
          </g>
          {/* Ink pot */}
          <rect x="220" y="210" width="30" height="30" rx="4" stroke={accentColor} strokeWidth="1.5" fill={accentColor} fillOpacity="0.25" />
          <ellipse cx="235" cy="210" rx="10" ry="4" stroke={accentColor} strokeWidth="1.5" fill="#1f1813" />
          {/* Flourishes */}
          <path d="M110 70 C140 60, 150 90, 190 70 C220 50, 250 80, 280 65" stroke={accentColor} strokeWidth="1" strokeOpacity="0.4" strokeDasharray="3 3" />
        </svg>
      );

    case 'gramophone-melody':
      return (
        <svg viewBox="0 0 400 300" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Wooden cabinet base */}
          <rect x="120" y="190" width="130" height="60" rx="4" stroke={accentColor} strokeWidth="1.5" fill={accentColor} fillOpacity="0.18" />
          <rect x="115" y="185" width="140" height="8" rx="2" fill={accentColor} fillOpacity="0.5" />
          {/* Turntable & Vinyl */}
          <ellipse cx="185" cy="180" rx="55" ry="12" fill="#221e1a" stroke={accentColor} strokeWidth="1" />
          <ellipse cx="185" cy="180" rx="20" ry="4" fill="#a67c52" />
          <circle cx="185" cy="180" r="2" fill="#fff" />
          {/* Brass horn */}
          <path d="M220 180 C240 160, 250 140, 230 120 C200 90, 150 70, 130 50" stroke={accentColor} strokeWidth="3" fill="none" />
          {/* Flared bell */}
          <ellipse cx="120" cy="50" rx="35" ry="45" transform="rotate(-30 120 50)" stroke={accentColor} strokeWidth="2" fill={accentColor} fillOpacity="0.22" />
          <ellipse cx="120" cy="50" rx="25" ry="32" transform="rotate(-30 120 50)" stroke={accentColor} strokeWidth="1" strokeOpacity="0.5" />
          {/* Musical swirls */}
          <g stroke={accentColor} strokeWidth="1.2" strokeOpacity="0.6">
            <path d="M100 30 Q70 15, 60 40 T40 45" />
            <circle cx="40" cy="45" r="3" fill={accentColor} />
            <path d="M80 80 Q50 90, 45 110" />
            <circle cx="45" cy="110" r="3" fill={accentColor} />
          </g>
        </svg>
      );

    case 'rose-botanical':
      return (
        <svg viewBox="0 0 400 300" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Vintage botanical rose illustration */}
          <g stroke={accentColor} strokeWidth="1.3">
            {/* Stem & Leaves */}
            <path d="M200 260 C195 210, 205 160, 195 110" stroke={accentColor} strokeWidth="2" />
            {/* Leaf Left */}
            <path d="M198 190 C160 185, 140 210, 150 230 C175 225, 195 205, 198 190 Z" fill={accentColor} fillOpacity="0.15" />
            <path d="M198 190 L150 230" strokeOpacity="0.6" />
            {/* Leaf Right */}
            <path d="M200 150 C240 145, 255 170, 245 190 C220 185, 205 165, 200 150 Z" fill={accentColor} fillOpacity="0.15" />
            <path d="M200 150 L245 190" strokeOpacity="0.6" />
            {/* Rose Petals & Bloom */}
            <g fill="#9b2c2c" fillOpacity="0.25">
              <path d="M195 110 C160 110, 155 70, 190 55 C225 40, 245 80, 215 110 Z" />
              <path d="M175 80 C185 60, 210 60, 220 75 C210 95, 185 95, 175 80 Z" fill="#822020" fillOpacity="0.35" />
              <path d="M190 70 C195 62, 205 62, 208 70 C205 78, 195 78, 190 70 Z" fill="#5c1515" fillOpacity="0.5" />
            </g>
          </g>
          {/* Victorian framing filigree corners */}
          <path d="M30 40 Q50 40, 50 20" stroke={accentColor} strokeWidth="1" />
          <path d="M370 40 Q350 40, 350 20" stroke={accentColor} strokeWidth="1" />
        </svg>
      );

    case 'moonlight-sea':
      return (
        <svg viewBox="0 0 400 300" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Crescent Moon */}
          <path d="M260 50 A28 28 0 1 0 285 95 A24 24 0 1 1 260 50 Z" fill="#e9c878" fillOpacity="0.75" />
          {/* Stars */}
          <g fill="#e9c878" fillOpacity="0.5">
            <circle cx="100" cy="50" r="1.5" />
            <circle cx="140" cy="80" r="1.2" />
            <circle cx="210" cy="40" r="1.5" />
            <circle cx="320" cy="70" r="1.2" />
            <circle cx="80" cy="110" r="1.5" />
          </g>
          {/* Sea horizon and ripples */}
          <line x1="50" y1="180" x2="350" y2="180" stroke={accentColor} strokeWidth="1.2" strokeOpacity="0.6" />
          <g stroke={accentColor} strokeWidth="1" strokeOpacity="0.35">
            <line x1="80" y1="195" x2="320" y2="195" />
            <line x1="120" y1="210" x2="280" y2="210" />
            <line x1="150" y1="225" x2="250" y2="225" />
            <line x1="180" y1="240" x2="220" y2="240" />
          </g>
          {/* Silhouetted traditional boat */}
          <path d="M140 180 C145 170, 195 170, 200 180 L185 186 L150 186 Z" fill={accentColor} fillOpacity="0.8" />
          <line x1="170" y1="180" x2="170" y2="155" stroke={accentColor} strokeWidth="1.5" />
          <path d="M170 155 L190 170 L170 170 Z" fill={accentColor} fillOpacity="0.3" stroke={accentColor} strokeWidth="0.8" />
        </svg>
      );

    case 'train-station':
      return (
        <svg viewBox="0 0 400 300" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Station platform roof */}
          <path d="M40 80 L360 80 L380 95 L20 95 Z" fill={accentColor} fillOpacity="0.2" stroke={accentColor} strokeWidth="1" />
          <line x1="70" y1="95" x2="70" y2="250" stroke={accentColor} strokeWidth="2" strokeOpacity="0.7" />
          <line x1="330" y1="95" x2="330" y2="250" stroke={accentColor} strokeWidth="2" strokeOpacity="0.7" />
          {/* Station Clock */}
          <circle cx="200" cy="120" r="22" stroke={accentColor} strokeWidth="2" fill="#faf5eb" />
          <circle cx="200" cy="120" r="18" stroke={accentColor} strokeWidth="0.8" strokeDasharray="2 4" />
          <line x1="200" y1="120" x2="200" y2="110" stroke="#1f1813" strokeWidth="1.5" />
          <line x1="200" y1="120" x2="210" y2="120" stroke="#1f1813" strokeWidth="1.5" />
          {/* Rails perspective */}
          <line x1="120" y1="260" x2="180" y2="180" stroke={accentColor} strokeWidth="1.5" strokeOpacity="0.5" />
          <line x1="280" y1="260" x2="220" y2="180" stroke={accentColor} strokeWidth="1.5" strokeOpacity="0.5" />
          {/* Steam puffs */}
          <ellipse cx="200" cy="175" rx="35" ry="12" fill={accentColor} fillOpacity="0.1" />
          <ellipse cx="190" cy="165" rx="25" ry="9" fill={accentColor} fillOpacity="0.08" />
        </svg>
      );

    case 'sunset-river':
      return (
        <svg viewBox="0 0 400 300" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Setting sun */}
          <circle cx="200" cy="140" r="35" fill="#df8a48" fillOpacity="0.4" />
          <circle cx="200" cy="140" r="25" fill="#f0ab64" fillOpacity="0.6" />
          {/* River banks & water */}
          <path d="M0 210 Q200 190, 400 210 L400 300 L0 300 Z" fill={accentColor} fillOpacity="0.15" />
          {/* Traditional Dinghy boat (ডিঙি নৌকা) */}
          <path d="M150 200 C155 190, 245 190, 250 200 C240 212, 160 212, 150 200 Z" fill={accentColor} fillOpacity="0.8" />
          {/* Boat canopy (ছই) */}
          <path d="M180 200 C180 185, 220 185, 220 200 Z" fill={accentColor} fillOpacity="0.9" />
          {/* Boatman with oar */}
          <circle cx="165" cy="190" r="4" fill={accentColor} />
          <line x1="165" y1="194" x2="160" y2="215" stroke={accentColor} strokeWidth="1.5" />
        </svg>
      );

    case 'cafe-coffee':
      return (
        <svg viewBox="0 0 400 300" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Vintage cup & saucer */}
          <ellipse cx="200" cy="220" rx="60" ry="12" fill={accentColor} fillOpacity="0.2" stroke={accentColor} strokeWidth="1.5" />
          <path d="M160 170 C160 215, 240 215, 240 170 Z" fill="#382414" fillOpacity="0.3" stroke={accentColor} strokeWidth="1.5" />
          <ellipse cx="200" cy="170" rx="40" ry="8" fill="#4d301b" stroke={accentColor} strokeWidth="1" />
          {/* Cup handle */}
          <path d="M235 178 C255 178, 255 200, 230 204" stroke={accentColor} strokeWidth="2" fill="none" />
          {/* Rising aromatic steam */}
          <path d="M185 155 Q175 135, 185 115 T180 90" stroke={accentColor} strokeWidth="1.2" strokeOpacity="0.5" fill="none" />
          <path d="M205 155 Q215 135, 205 115 T210 90" stroke={accentColor} strokeWidth="1.2" strokeOpacity="0.5" fill="none" />
        </svg>
      );

    case 'vintage-lovers':
    default:
      return (
        <svg viewBox="0 0 400 300" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Vintage classic love motif */}
          <g stroke={accentColor} strokeWidth="1.2" strokeOpacity="0.5">
            <circle cx="200" cy="130" r="70" strokeDasharray="3 3" />
            <circle cx="200" cy="130" r="64" />
          </g>
          {/* Vintage Postage Stamp Silhouette */}
          <rect x="150" y="80" width="100" height="100" rx="4" stroke={accentColor} strokeWidth="1" fill={accentColor} fillOpacity="0.08" />
          {/* Classical Two Doves / Heart in Victorian style */}
          <path d="M200 115 C190 95, 160 95, 160 120 C160 145, 200 165, 200 165 C200 165, 240 145, 240 120 C240 95, 210 95, 200 115 Z" fill="#8a252c" fillOpacity="0.4" stroke={accentColor} strokeWidth="1.5" />
          <path d="M140 210 C170 200, 230 200, 260 210" stroke={accentColor} strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      );
  }
};
