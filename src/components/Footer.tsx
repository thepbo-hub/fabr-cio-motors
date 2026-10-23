import React from 'react';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full mt-10 md:mt-14 pb-8 pt-4 flex flex-col items-center justify-center relative z-10 px-4">
      {/* Linha Fina Amarelo-Dourada com fade suave nas pontas */}
      <div className="w-full max-w-[440px] h-[1px] bg-gradient-to-r from-transparent via-amber-500/50 to-transparent mb-5" />

      {/* Nome FABRICIO MOTORS e detalhe institucional minimalista */}
      <div className="flex flex-col items-center text-center gap-1">
        <span className="font-heading tracking-[0.25em] text-sm md:text-base font-bold uppercase text-zinc-300">
          FABRICIO MOTORS
        </span>
        <span className="text-[10px] tracking-[0.2em] uppercase text-zinc-500 font-medium">
          Excelência e Procedência Automotiva • © {currentYear}
        </span>
      </div>
    </footer>
  );
};
