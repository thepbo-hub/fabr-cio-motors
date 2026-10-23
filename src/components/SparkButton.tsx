import React, { useState, useRef, useEffect } from 'react';

interface SparkButtonProps {
  id?: string;
  label: string;
  sublabel?: string;
  icon: React.ReactNode;
  href?: string;
  onClick?: () => void;
  badge?: string;
  isExternal?: boolean;
  isFeatured?: boolean;
}

export const SparkButton: React.FC<SparkButtonProps> = ({
  label,
  sublabel,
  icon,
  href,
  onClick,
  badge,
  isExternal = true,
  isFeatured = false,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const buttonRef = useRef<HTMLAnchorElement & HTMLButtonElement>(null);
  const [dimensions, setDimensions] = useState<{ width: number; height: number }>({
    width: 380,
    height: 68,
  });

  useEffect(() => {
    if (!buttonRef.current) return;

    const updateDimensions = () => {
      if (buttonRef.current) {
        setDimensions({
          width: buttonRef.current.offsetWidth,
          height: buttonRef.current.offsetHeight,
        });
      }
    };

    updateDimensions();

    const observer = new ResizeObserver(() => {
      updateDimensions();
    });

    observer.observe(buttonRef.current);
    return () => observer.disconnect();
  }, []);

  const Component = href ? 'a' : 'button';

  return (
    <Component
      ref={buttonRef}
      href={href}
      onClick={onClick}
      target={href && isExternal ? '_blank' : undefined}
      rel={href && isExternal ? 'noopener noreferrer' : undefined}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={() => setIsHovered(true)}
      onTouchEnd={() => {
        // No celular, desativa após 1.2s para a faísca ser vista no toque e depois sumir
        setTimeout(() => setIsHovered(false), 1200);
      }}
      onFocus={() => setIsHovered(true)}
      onBlur={() => setIsHovered(false)}
      className={`group relative w-full max-w-[460px] rounded-2xl flex items-center justify-between text-left transition-all duration-300 transform-gpu cursor-pointer select-none outline-none focus-visible:ring-2 focus-visible:ring-amber-400/80 -translate-y-0 hover:-translate-y-1 active:translate-y-0.5 ${
        isFeatured ? 'min-h-[78px] md:min-h-[84px] px-5 py-4' : 'min-h-[66px] px-5 py-3.5'
      }`}
      style={{
        // Superfície tridimensional metálica em grafite e preto profundo
        background: isFeatured
          ? 'linear-gradient(180deg, #24242b 0%, #17171d 45%, #0b0b0e 100%)'
          : 'linear-gradient(180deg, #1c1c20 0%, #131316 45%, #09090b 100%)',
        // Sombras profundas e aura dourada de destaque se for featured
        boxShadow: isFeatured
          ? isHovered
            ? '0 24px 45px -6px rgba(0, 0, 0, 0.95), 0 0 35px rgba(245, 158, 11, 0.5), inset 0 1px 2px rgba(254, 240, 138, 0.6), inset 0 -2px 5px rgba(0, 0, 0, 0.9)'
            : '0 14px 34px -4px rgba(0, 0, 0, 0.85), 0 0 28px rgba(245, 158, 11, 0.32), inset 0 1px 1px rgba(254, 240, 138, 0.4), inset 0 -2px 4px rgba(0, 0, 0, 0.85)'
          : isHovered
            ? '0 20px 38px -6px rgba(0, 0, 0, 0.95), 0 8px 16px -2px rgba(245, 158, 11, 0.25), inset 0 1px 2px rgba(254, 240, 138, 0.35), inset 0 -2px 5px rgba(0, 0, 0, 0.9)'
            : '0 12px 28px -4px rgba(0, 0, 0, 0.85), 0 4px 10px rgba(0, 0, 0, 0.7), inset 0 1px 1px rgba(255, 255, 255, 0.12), inset 0 -2px 4px rgba(0, 0, 0, 0.85)',
      }}
    >
      {/* 1. Borda base com destaque dourado se for featured */}
      <div
        className={`absolute inset-0 rounded-2xl pointer-events-none transition-colors duration-300 ${
          isFeatured
            ? 'border-2 border-amber-500/70 shadow-[0_0_20px_rgba(245,158,11,0.25)] group-hover:border-amber-400'
            : 'border border-zinc-800/90 group-hover:border-amber-500/40'
        }`}
      />

      {/* 2. Reflexo sutil na parte superior para relevo automotivo chanfrado */}
      <div className={`absolute top-0 left-3 right-3 h-[1px] pointer-events-none transition-all duration-300 ${
        isFeatured
          ? 'bg-gradient-to-r from-transparent via-amber-300/60 to-transparent group-hover:via-amber-300/90'
          : 'bg-gradient-to-r from-transparent via-amber-200/25 to-transparent group-hover:via-amber-300/50'
      }`} />

      {/* 3. Feixe de reflexo metálico em ângulo ao passar o mouse */}
      <div className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none opacity-0 group-hover:opacity-30 transition-opacity duration-300">
        <div className="w-1/2 h-full bg-gradient-to-r from-transparent via-white/15 to-transparent animate-metallic-shine" />
      </div>

      {/* 4. EFEITO DE FAÍSCA LUMINOSA 360° - APARECE EXCLUSIVAMENTE COM O MOUSE OU TOQUE POR CIMA */}
      {dimensions.width > 0 && dimensions.height > 0 && (
        <svg
          className={`absolute inset-0 w-full h-full pointer-events-none z-10 overflow-visible transition-opacity duration-200 ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }`}
          style={{ width: dimensions.width, height: dimensions.height }}
        >
          <defs>
            <filter id={`spark-glow-${label.replace(/[^a-zA-Z0-9]/g, '')}`} x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3.5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Camada A: Halo Externo Dourado Suave */}
          <rect
            x={1.5}
            y={1.5}
            width={Math.max(0, dimensions.width - 3)}
            height={Math.max(0, dimensions.height - 3)}
            rx={16}
            ry={16}
            fill="none"
            stroke="#f59e0b"
            strokeWidth={isFeatured ? 5 : 4.5}
            strokeDasharray="14 86"
            pathLength="100"
            filter={`url(#spark-glow-${label.replace(/[^a-zA-Z0-9]/g, '')})`}
            className={isHovered ? 'animate-spark-hover' : ''}
          />

          {/* Camada B: Corpo da Faísca Amarelo-Dourado Intenso */}
          <rect
            x={1.5}
            y={1.5}
            width={Math.max(0, dimensions.width - 3)}
            height={Math.max(0, dimensions.height - 3)}
            rx={16}
            ry={16}
            fill="none"
            stroke="#fbbf24"
            strokeWidth={isFeatured ? 2.8 : 2.4}
            strokeDasharray="14 86"
            strokeLinecap="round"
            pathLength="100"
            className={isHovered ? 'animate-spark-hover' : ''}
          />

          {/* Camada C: Núcleo da Luz Branco-Amarelado Focado */}
          <rect
            x={1.5}
            y={1.5}
            width={Math.max(0, dimensions.width - 3)}
            height={Math.max(0, dimensions.height - 3)}
            rx={16}
            ry={16}
            fill="none"
            stroke="#fef9c3"
            strokeWidth={1.3}
            strokeDasharray="7 93"
            strokeLinecap="round"
            pathLength="100"
            className={isHovered ? 'animate-spark-hover' : ''}
          />
        </svg>
      )}

      {/* Conteúdo do Botão */}
      <div className="relative z-20 flex items-center gap-3.5 min-w-0 pr-2">
        {/* Container do Emblema: maior e mais imponente se for featured */}
        <div
          className={`shrink-0 rounded-xl flex items-center justify-center transition-all duration-300 transform-gpu group-hover:-translate-y-1.5 group-hover:scale-110 ${
            isFeatured
              ? 'w-13 h-13 md:w-14 md:h-14 bg-gradient-to-br from-amber-500/20 via-zinc-800 to-zinc-950 border border-amber-400/80 shadow-[0_0_15px_rgba(245,158,11,0.35)] text-amber-300 group-hover:border-amber-300 group-hover:shadow-[0_8px_24px_rgba(245,158,11,0.5)]'
              : 'w-12 h-12 bg-gradient-to-br from-zinc-800 to-zinc-950 border border-zinc-700/80 shadow-[inset_0_1px_2px_rgba(255,255,255,0.1),0_4px_10px_rgba(0,0,0,0.6)] text-amber-400 group-hover:border-amber-400 group-hover:shadow-[0_8px_20px_rgba(245,158,11,0.4)]'
          }`}
        >
          {icon}
        </div>

        {/* Textos: Mantidos perfeitamente legíveis e alinhados */}
        <div className="flex flex-col min-w-0">
          <span
            className={`font-heading tracking-[0.06em] font-bold uppercase transition-colors whitespace-nowrap overflow-hidden text-ellipsis ${
              isFeatured
                ? 'text-base md:text-lg text-white group-hover:text-amber-200'
                : 'text-sm md:text-base text-white group-hover:text-amber-200'
            }`}
          >
            {label}
          </span>
          {sublabel && (
            <span
              className={`font-medium tracking-wide whitespace-nowrap overflow-hidden text-ellipsis ${
                isFeatured
                  ? 'text-xs md:text-sm text-zinc-300 group-hover:text-zinc-200'
                  : 'text-[11px] md:text-xs text-zinc-400'
              }`}
            >
              {sublabel}
            </span>
          )}
        </div>
      </div>

      {/* Seta indicativa e Badge em Destaque na ponta direita */}
      <div className="relative z-20 flex items-center gap-2 shrink-0 ml-1">
        {badge && (
          <span
            className={`font-extrabold tracking-wider uppercase whitespace-nowrap rounded-lg shadow-sm transition-transform ${
              isFeatured
                ? 'px-2.5 py-1 text-xs md:text-sm bg-gradient-to-r from-amber-400 to-amber-500 text-black shadow-[0_0_14px_rgba(245,158,11,0.45)] border border-amber-300'
                : 'px-2 py-0.5 text-[10px] bg-amber-500/15 text-amber-300 border border-amber-500/30'
            }`}
          >
            {badge}
          </span>
        )}
        <div className="w-6 h-6 rounded-full flex items-center justify-center text-zinc-500 group-hover:text-amber-400 group-hover:translate-x-1 transition-all">
          <svg
            className={isFeatured ? 'w-5 h-5 text-amber-400' : 'w-4 h-4'}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </Component>
  );
};
