import React, { useState, useRef, useEffect } from 'react';
import { BrandLogo } from './BrandLogo.tsx';

interface VideoHeaderProps {
  videoUrl?: string;
}

export const VideoHeader: React.FC<VideoHeaderProps> = ({
  videoUrl = 'https://yourimageshare.com/ib/2JH73bL4R1.mp4',
}) => {
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  }, []);

  // Mantém a imagem final do vídeo com a logo por 1 segundo antes de reiniciar o loop
  const handleVideoEnded = () => {
    setTimeout(() => {
      if (videoRef.current) {
        videoRef.current.currentTime = 0;
        videoRef.current.play().catch(() => {});
      }
    }, 1000);
  };

  return (
    <div className="relative w-full flex flex-col items-center justify-start pt-0 mt-0 overflow-hidden bg-black">
      {/* 
        Container do Vídeo com Máscara Gradual e Fusão Fluida:
        A máscara linear CSS dissolve a borda inferior do vídeo de forma aveludada,
        eliminando 100% qualquer corte seco ou marcação brusca.
      */}
      <div
        className="relative w-full max-w-[820px] mx-auto aspect-video bg-black flex items-center justify-center overflow-hidden"
        style={{
          maskImage: 'linear-gradient(to bottom, black 0%, black 78%, rgba(0,0,0,0.85) 86%, rgba(0,0,0,0.3) 94%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to bottom, black 0%, black 78%, rgba(0,0,0,0.85) 86%, rgba(0,0,0,0.3) 94%, transparent 100%)',
        }}
      >
        {/* Glow dourado atmosférico de fundo */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4/5 h-4/5 bg-amber-500/10 rounded-full blur-[90px] pointer-events-none" />

        {!hasError ? (
          <div className="relative w-full h-full flex items-center justify-center bg-black">
            {/* Spinner de carregamento suave */}
            {!isLoaded && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-black z-20 transition-opacity duration-700">
                <div className="w-9 h-9 rounded-full border-2 border-amber-500/30 border-t-amber-400 animate-spin" />
                <span className="text-[10px] tracking-widest text-zinc-400 uppercase mt-2 font-medium">
                  Carregando assinatura...
                </span>
              </div>
            )}

            {/* Vídeo com proporção 100% preservada */}
            <video
              ref={videoRef}
              src={videoUrl}
              autoPlay
              muted
              playsInline
              preload="auto"
              onLoadedData={() => setIsLoaded(true)}
              onEnded={handleVideoEnded}
              onError={() => {
                console.warn('Erro ao carregar vídeo. Ativando fallback da marca.');
                setHasError(true);
              }}
              className={`w-full h-full object-contain transition-opacity duration-500 ${
                isLoaded ? 'opacity-100' : 'opacity-0'
              }`}
            />

            {/* 
              Gradiente interno de suavização na base:
              Transição em múltiplos tons de preto e dourado sutil
            */}
            <div className="absolute inset-x-0 bottom-0 h-28 sm:h-36 bg-gradient-to-t from-[#050507] via-[#050507]/60 via-40% to-transparent pointer-events-none z-10" />

            {/* Vinhetas sutis laterais no desktop */}
            <div className="hidden md:block absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-black via-black/40 to-transparent pointer-events-none z-10" />
            <div className="hidden md:block absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-black via-black/40 to-transparent pointer-events-none z-10" />
          </div>
        ) : (
          /* Fallback caso falhe conexão externa */
          <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-b from-zinc-900/60 to-[#050507] p-6 relative">
            <div className="absolute inset-0 bg-radial from-amber-500/15 via-transparent to-transparent" />
            <BrandLogo size="lg" showText={true} />
          </div>
        )}
      </div>

      {/* Linha de reflexo dourada extremamente sutil na transição suave */}
      <div className="w-full max-w-[600px] h-[1px] bg-gradient-to-r from-transparent via-amber-500/25 to-transparent pointer-events-none -mt-4 relative z-10" />
    </div>
  );
};
