import React from 'react';

export const KeywordsMarquee: React.FC = () => {
  const keywords = [
    'EXCELÊNCIA AUTOMOTIVA',
    'PROCEDÊNCIA COMPROVADA',
    'SEMINOVOS SELECIONADOS',
    'ATENDIMENTO EXCLUSIVO',
    'ALTA PERFORMANCE',
    'TRANSPARÊNCIA TOTAL',
    'GARANTIA & CONFIANÇA',
  ];

  // Duplicamos a lista para criar um loop contínuo ad infinitum sem interrupções
  const repeatedKeywords = [...keywords, ...keywords, ...keywords];

  return (
    <div className="w-full my-4 py-2 relative overflow-hidden select-none">
      {/* Linhas sutis douradas superior e inferior da faixa */}
      <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-amber-500/30 to-transparent" />
      <div className="absolute bottom-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-amber-500/30 to-transparent" />

      {/* Fundo da faixa moderna com gradiente grafite metálico */}
      <div className="absolute inset-0 bg-gradient-to-r from-zinc-950/80 via-[#121215]/90 to-zinc-950/80 backdrop-blur-sm pointer-events-none" />

      {/* Container com máscara de degradê nas laterais (as palavras surgem e somem suavemente) */}
      <div
        className="relative w-full overflow-hidden"
        style={{
          maskImage: 'linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%)',
        }}
      >
        <div className="animate-marquee-slow py-1 flex items-center">
          {repeatedKeywords.map((word, idx) => (
            <div key={idx} className="flex items-center shrink-0 mx-3 md:mx-4">
              <span className="font-heading tracking-[0.2em] text-[11px] md:text-xs font-bold uppercase text-transparent bg-clip-text bg-gradient-to-r from-amber-100 via-amber-300 to-amber-500 drop-shadow-[0_1px_4px_rgba(245,158,11,0.2)]">
                {word}
              </span>
              <span className="ml-3 md:ml-4 text-[9px] text-amber-500/70 select-none">
                ✦
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
