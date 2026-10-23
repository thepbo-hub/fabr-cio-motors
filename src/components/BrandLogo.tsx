import React from 'react';

interface BrandLogoProps {
  className?: string;
  showText?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  className = '',
  showText = true,
  size = 'md',
}) => {
  const sizeClasses = {
    sm: 'w-10 h-10',
    md: 'w-16 h-16',
    lg: 'w-24 h-24',
  }[size];

  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      {/* Símbolo: Letra F estilizada integrada a triângulo ovalado deitado */}
      <div className={`relative ${sizeClasses} flex items-center justify-center`}>
        <svg
          viewBox="0 0 160 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full drop-shadow-[0_4px_16px_rgba(245,158,11,0.35)]"
        >
          <defs>
            {/* Gradiente Dourado Metálico */}
            <linearGradient id="fmGold" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fef08a" />
              <stop offset="30%" stopColor="#f59e0b" />
              <stop offset="70%" stopColor="#d97706" />
              <stop offset="100%" stopColor="#78350f" />
            </linearGradient>

            {/* Gradiente Grafite Metálico */}
            <linearGradient id="fmGraphite" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#3f3f46" />
              <stop offset="50%" stopColor="#18181b" />
              <stop offset="100%" stopColor="#09090b" />
            </linearGradient>

            {/* Brilho Superior Dourado */}
            <linearGradient id="fmSpark" x1="0%" y1="50%" x2="100%" y2="50%">
              <stop offset="0%" stopColor="#fbbf24" stopOpacity="0.8" />
              <stop offset="50%" stopColor="#fef9c3" stopOpacity="1" />
              <stop offset="100%" stopColor="#d97706" stopOpacity="0.8" />
            </linearGradient>
          </defs>

          {/* Triângulo Ovalado Deitado / Forma Aerodinâmica Externa */}
          <path
            d="M 28 60 C 28 32, 60 18, 115 22 C 142 24, 150 48, 144 64 C 136 84, 110 98, 65 98 C 38 98, 28 82, 28 60 Z"
            fill="url(#fmGraphite)"
            stroke="url(#fmGold)"
            strokeWidth="3.5"
            strokeLinejoin="round"
          />

          {/* Linha de reflexo interna do contorno */}
          <path
            d="M 36 58 C 36 38, 62 26, 110 30 C 132 32, 138 48, 134 60 C 128 76, 106 88, 68 88 C 45 88, 36 76, 36 58 Z"
            stroke="#fbbf24"
            strokeWidth="1"
            strokeOpacity="0.4"
            fill="none"
          />

          {/* Letra 'F' Estilizada Integrada (sem letra P, com lâminas horizontais esportivas) */}
          {/* Haste Vertical Dinâmica com inclinação */}
          <path
            d="M 52 38 L 62 38 L 52 82 L 42 82 Z"
            fill="url(#fmGold)"
          />

          {/* Barra Superior Longa do F com corte aerodinâmico */}
          <path
            d="M 58 38 L 118 38 C 122 38, 124 41, 122 45 L 119 50 C 117 53, 113 54, 109 54 L 63 54 Z"
            fill="url(#fmSpark)"
          />

          {/* Barra Central Intermediária do F com terminação em flecha */}
          <path
            d="M 55 58 L 98 58 C 101 58, 103 60, 101 64 L 99 68 C 97 71, 94 72, 90 72 L 51 72 Z"
            fill="url(#fmGold)"
          />

          {/* Ponto de luz no ápice da curvatura */}
          <circle cx="120" cy="42" r="2.5" fill="#ffffff" opacity="0.9" />
        </svg>
      </div>

      {showText && (
        <div className="mt-3 text-center">
          <h1 className="font-heading tracking-[0.25em] text-xl md:text-2xl font-bold uppercase text-transparent bg-clip-text bg-gradient-to-r from-amber-100 via-amber-300 to-amber-500 drop-shadow-[0_2px_10px_rgba(245,158,11,0.3)]">
            FABRICIO MOTORS
          </h1>
          <p className="text-[10px] md:text-xs tracking-[0.3em] uppercase text-zinc-400 font-medium mt-0.5">
            Veículos Selecionados
          </p>
        </div>
      )}
    </div>
  );
};
