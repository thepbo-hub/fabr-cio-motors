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

  // Quadruplicamos para um loop perfeito ad infinitum que preenche telas ultra-wide
  const repeatedKeywords = [...keywords, ...keywords, ...keywords, ...keywords];

  return (
    <div className="w-full my-3 py-2.5 relative overflow-hidden select-none z-20 pointer-events-none">
      {/* Linhas superior e inferior douradas de ponta a ponta da tela */}
      <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-amber-500/40 to-transparent" />
      <div className="absolute bottom-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-amber-500/40 to-transparent" />

      {/* Fundo escuro com leve reflexo metálico em toda a largura */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-[#121215]/95 to-black/90 backdrop-blur-md pointer-events-none" />

      {/* Máscara de degradê lateral suave nas bordas da tela */}
      <div
        className="relative w-full overflow-hidden"
        style={{
          maskImage: 'linear-gradient(to right, transparent 0%, black 6%, black 94%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 6%, black 94%, transparent 100%)',
        }}
      >
        <div className="animate-marquee-slow py-1 flex items-center">
          {repeatedKeywords.map((word, idx) => (
            <div key={idx} className="flex items-center shrink-0 mx-4 md:mx-6">
              <span className="font-heading tracking-[0.22em] text-[11px] md:text-xs font-bold uppercase text-transparent bg-clip-text bg-gradient-to-r from-amber-100 via-amber-300 to-amber-500 drop-shadow-[0_1px_6px_rgba(245,158,11,0.25)]">
                {word}
              </span>
              <span className="ml-4 md:ml-6 text-[10px] text-amber-500/80 select-none">
                ✦
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
