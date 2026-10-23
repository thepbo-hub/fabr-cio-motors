import React, { useState, useEffect } from 'react';
import { Star, X } from 'lucide-react';

interface FloatingReviewButtonProps {
  reviewUrl?: string;
}

export const FloatingReviewButton: React.FC<FloatingReviewButtonProps> = ({
  reviewUrl = 'https://search.google.com/local/writereview?placeid=ChIJv5LDxHd_mQAR9EBsHJBNuXE',
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Exibe o botão flutuante quando o visitante rola para baixo (após passar o cabeçalho)
      if (window.scrollY > 240) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!isVisible || isDismissed) return null;

  return (
    <aside aria-label="Avaliação rápida" className="fixed bottom-5 right-3.5 sm:right-6 z-40 animate-in fade-in slide-in-from-bottom-4 duration-300">
      <div className="relative group">
        
        {/* Link / Botão Flutuante Principal */}
        <a
          href={reviewUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-full bg-gradient-to-r from-[#1c1c22] via-[#141418] to-[#0d0d10] border border-amber-500/60 shadow-[0_12px_28px_rgba(0,0,0,0.9),0_0_20px_rgba(245,158,11,0.3)] hover:border-amber-400 hover:shadow-[0_16px_34px_rgba(0,0,0,0.95),0_0_28px_rgba(245,158,11,0.5)] hover:-translate-y-1 active:translate-y-0 transition-all duration-300 text-left cursor-pointer"
        >
          {/* Emblema do Google em Amarelo Dourado com Salto */}
          <div className="w-8 h-8 rounded-full flex items-center justify-center bg-zinc-900 border border-amber-500/30 text-amber-400 shadow-inner shrink-0 group-hover:scale-110 transition-transform">
            <svg
              className="w-4.5 h-4.5 fill-current"
              viewBox="0 0 24 24"
            >
              <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.067 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z" />
            </svg>
          </div>

          {/* Textos de Chamada e Estrelas */}
          <div className="flex flex-col pr-1">
            <div className="flex items-center gap-1.5">
              <span className="font-heading text-xs font-bold uppercase tracking-wider text-white group-hover:text-amber-200 transition-colors">
                AVALIE NO GOOGLE
              </span>
              <span className="text-[10px] font-bold text-amber-300 bg-amber-500/20 px-1.5 py-0.2 rounded-full border border-amber-500/30">
                5.0 ★
              </span>
            </div>
            <div className="flex items-center gap-0.5 text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-2.5 h-2.5 fill-amber-400" />
              ))}
              <span className="text-[9px] text-zinc-400 ml-1 font-medium">
                Sua opinião importa
              </span>
            </div>
          </div>
        </a>

        {/* Botão sutil para fechar se o usuário desejar */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            setIsDismissed(true);
          }}
          aria-label="Fechar atalho de avaliação"
          className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-zinc-800 border border-zinc-700 text-zinc-400 hover:text-white hover:bg-zinc-700 flex items-center justify-center text-[10px] shadow transition-colors"
        >
          <X className="w-3 h-3" />
        </button>

      </div>
    </aside>
  );
};
