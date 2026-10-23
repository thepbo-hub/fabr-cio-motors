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

  // Segura a imagem final do vídeo com a logo por 1 segundo antes de reiniciar o loop
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
        Container do Vídeo:
        - No mobile: tela inteira de ponta a ponta (w-full), aspect-video exato sem cortar nada
        - No desktop: centralizado com proporção natural preservada, sem cortar a logo
      */}
      <div className="relative w-full max-w-[760px] mx-auto aspect-video bg-black flex items-center justify-center overflow-hidden">
        
        {/* Glow dourado suave de fundo */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4/5 h-4/5 bg-amber-500/10 rounded-full blur-[80px] pointer-events-none" />

        {!hasError ? (
          <div className="relative w-full h-full flex items-center justify-center bg-black">
            {/* Spinner sutil de carregamento */}
            {!isLoaded && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-black z-20 transition-opacity duration-700">
                <div className="w-8 h-8 rounded-full border-2 border-amber-500/30 border-t-amber-400 animate-spin" />
                <span className="text-[10px] tracking-widest text-zinc-400 uppercase mt-2 font-medium">
                  Carregando assinatura...
                </span>
              </div>
            )}

            {/* 
              Vídeo com proporção 100% preservada:
              object-contain garante que a logo inteira da marca apareça perfeitamente
              sem NENHUM corte superior, lateral ou inferior.
            */}
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
          </div>
        ) : (
          /* Fallback em caso de indisponibilidade externa */
          <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-b from-zinc-900/60 to-[#050507] p-6 relative">
            <div className="absolute inset-0 bg-radial from-amber-500/15 via-transparent to-transparent" />
            <BrandLogo size="lg" showText={true} />
          </div>
        )}
      </div>

      {/* 
        DEGRADÊ DE CORES NA PARTE INFERIOR DO VÍDEO
        Posicionado logo na transição inferior do vídeo para o restante da página,
        criando uma passagem fluida para o fundo escuro SEM cobrir a logo do vídeo.
      */}
      <div className="w-full h-10 md:h-16 bg-gradient-to-b from-black via-[#050507]/80 to-[#050507] -mt-2 pointer-events-none relative z-10" />
    </div>
  );
};
