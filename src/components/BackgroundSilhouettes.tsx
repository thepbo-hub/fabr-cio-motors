import React from 'react';

export const BackgroundSilhouettes: React.FC = () => {
  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 pointer-events-none overflow-hidden select-none z-0"
    >
      {/* 
        1. FIAT FASTBACK - Região Superior
        Máscara radial elíptica elimina 100% qualquer borda retangular ou fundo destoante,
        conectando perfeitamente a silhueta dourada ao fundo escuro da página.
      */}
      <div
        className="absolute top-[22%] md:top-[26%] -right-[15%] md:right-[2%] w-[460px] md:w-[700px] lg:w-[840px] aspect-video opacity-40 md:opacity-50 mix-blend-screen transition-all duration-700"
        style={{
          maskImage: 'radial-gradient(ellipse 65% 55% at 50% 50%, black 25%, transparent 72%)',
          WebkitMaskImage: 'radial-gradient(ellipse 65% 55% at 50% 50%, black 25%, transparent 72%)',
        }}
      >
        <img
          src="/src/assets/images/fastback_silhouette_1792717567196.jpg"
          alt=""
          referrerPolicy="no-referrer"
          className="w-full h-full object-contain filter brightness-125 contrast-130 drop-shadow-[0_0_30px_rgba(245,158,11,0.25)]"
        />
      </div>

      {/* 
        2. RENAULT SANDERO STEPWAY - Região Intermediária / Lateral Esquerda
        Máscara radial com feathering suave sem bordas
      */}
      <div
        className="absolute top-[52%] md:top-[56%] -left-[20%] md:-left-[5%] w-[440px] md:w-[680px] lg:w-[800px] aspect-video opacity-35 md:opacity-45 mix-blend-screen transition-all duration-700"
        style={{
          maskImage: 'radial-gradient(ellipse 65% 55% at 50% 50%, black 25%, transparent 72%)',
          WebkitMaskImage: 'radial-gradient(ellipse 65% 55% at 50% 50%, black 25%, transparent 72%)',
        }}
      >
        <img
          src="/src/assets/images/stepway_silhouette_1792717567838.jpg"
          alt=""
          referrerPolicy="no-referrer"
          className="w-full h-full object-contain filter brightness-125 contrast-130 drop-shadow-[0_0_25px_rgba(245,158,11,0.2)]"
        />
      </div>

      {/* 
        3. HONDA CIVIC - Região Inferior / Lateral Direita
        Máscara elíptica conectando os contornos dourados ao fundo
      */}
      <div
        className="absolute bottom-[4%] md:bottom-[6%] -right-[15%] md:right-[3%] w-[460px] md:w-[700px] lg:w-[820px] aspect-video opacity-40 md:opacity-50 mix-blend-screen transition-all duration-700"
        style={{
          maskImage: 'radial-gradient(ellipse 65% 55% at 50% 50%, black 25%, transparent 72%)',
          WebkitMaskImage: 'radial-gradient(ellipse 65% 55% at 50% 50%, black 25%, transparent 72%)',
        }}
      >
        <img
          src="/src/assets/images/civic_silhouette_1792717567796.jpg"
          alt=""
          referrerPolicy="no-referrer"
          className="w-full h-full object-contain filter brightness-125 contrast-130 drop-shadow-[0_0_30px_rgba(245,158,11,0.25)]"
        />
      </div>

      {/* Iluminação dourada atmosférica de estúdio */}
      <div className="absolute top-[30%] left-1/4 w-[400px] h-[400px] bg-amber-500/10 rounded-full blur-[140px] -z-10" />
      <div className="absolute top-[72%] right-1/4 w-[450px] h-[450px] bg-amber-600/10 rounded-full blur-[160px] -z-10" />
    </div>
  );
};
