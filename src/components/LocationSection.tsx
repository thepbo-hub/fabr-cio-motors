import React, { useState } from 'react';
import { MapPin, Navigation, Copy, Check } from 'lucide-react';

export const LocationSection: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const fullAddress = "Rua São Francisco Xavier, 68 - Loja C, Tijuca, Rio de Janeiro - RJ, CEP: 20550-012";

  // URL oficial do Google Maps para traçar rota direta a partir da localização atual do usuário
  const googleMapsDirectionsUrl =
    "https://www.google.com/maps/dir/?api=1&destination=Rua+S%C3%A3o+Francisco+Xavier,+68+-+Loja+C,+Tijuca,+Rio+de+Janeiro+-+RJ,+20550-012&destination_place_id=ChIJv5LDxHd_mQAR9EBsHJBNuXE";

  // URL oficial do Waze com navegação imediata
  const wazeUrl =
    "https://waze.com/ul?q=Rua%20S%C3%A3o%20Francisco%20Xavier%2C%2068%20-%20Loja%20C%2C%20Tijuca%2C%20Rio%20de%20Janeiro&navigate=yes";

  // URL oficial do Uber com origem no local atual e destino preenchido
  const uberUrl =
    "https://m.uber.com/ul/?action=setPickup&pickup=my_location&dropoff[formatted_address]=Rua%20S%C3%A3o%20Francisco%20Xavier%2C%2068%20-%20Loja%20C%20-%20Tijuca%2C%20Rio%20de%20Janeiro%20-%20RJ%2C%2020550-012";

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(fullAddress);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback
    }
  };

  return (
    <div className="w-full max-w-[460px] my-5 px-1">
      {/* Retângulo Principal Unificado de Localização */}
      <div className="relative w-full rounded-3xl bg-gradient-to-b from-[#19191e] via-[#121215] to-[#0a0a0d] border border-amber-500/25 p-5 md:p-6 shadow-[0_18px_40px_-8px_rgba(0,0,0,0.9),0_0_30px_rgba(245,158,11,0.08)] text-white">
        
        {/* Linha sutil de reflexo dourado chanfrado no topo */}
        <div className="absolute top-0 left-6 right-6 h-[1px] bg-gradient-to-r from-transparent via-amber-400/40 to-transparent pointer-events-none" />

        {/* 1. PARTE SUPERIOR DO RETÂNGULO: "ONDE ESTAMOS" */}
        <div className="flex flex-col items-center text-center mb-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 mb-2">
            <MapPin className="w-3.5 h-3.5 text-amber-400" />
            <span className="font-heading tracking-[0.25em] text-xs font-bold uppercase text-amber-300">
              ONDE ESTAMOS
            </span>
          </div>

          {/* Endereço completo formatado e de alto contraste */}
          <div className="px-2 mt-1">
            <p className="text-sm md:text-base font-bold text-zinc-100 tracking-wide leading-snug">
              Rua São Francisco Xavier, 68 - Loja C
            </p>
            <p className="text-xs text-zinc-400 mt-1 font-medium">
              Tijuca, Rio de Janeiro - RJ • CEP: 20550-012
            </p>
          </div>
        </div>

        {/* 2. BOTÃO: "TRAÇAR ROTA NO GOOGLE MAPS" (Entra direto na rota a partir da localização atual) */}
        <div className="my-4">
          <a
            href={googleMapsDirectionsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative w-full h-[58px] px-4 rounded-xl flex items-center justify-between text-left transition-all duration-300 transform-gpu cursor-pointer select-none bg-gradient-to-b from-amber-500 via-amber-400 to-amber-500 text-black font-heading font-bold shadow-[0_8px_20px_rgba(245,158,11,0.25)] hover:brightness-110 hover:-translate-y-0.5 active:translate-y-0 active:brightness-95"
          >
            <div className="flex items-center gap-3">
              {/* Emblema original do Google Maps com salto no hover */}
              <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-white/95 shadow-sm transition-transform duration-300 group-hover:-translate-y-1 group-hover:scale-105">
                <svg className="w-6 h-6" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 2C8.13 2 5 5.13 5 9c0 2.38 1.44 5.54 3.36 8.79L12 14.5l3.64 3.29C17.56 14.54 19 11.38 19 9c0-3.87-3.13-7-7-7z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M12 2c-1.8 0-3.48.68-4.78 1.81L12 9V2z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 2v7l4.78-5.19C15.48 2.68 13.8 2 12 2z"
                  />
                  <circle cx="12" cy="9" r="2.8" fill="#FFFFFF" />
                </svg>
              </div>

              <div className="flex flex-col">
                <span className="text-sm md:text-base font-bold tracking-wider uppercase text-black">
                  TRAÇAR ROTA NO GOOGLE MAPS
                </span>
                <span className="text-[10px] text-zinc-900 font-medium tracking-wide">
                  Navegação direta do seu local até a loja
                </span>
              </div>
            </div>

            <div className="w-6 h-6 rounded-full flex items-center justify-center text-black/70 group-hover:text-black group-hover:translate-x-1 transition-all">
              <Navigation className="w-4 h-4 fill-current" />
            </div>
          </a>
        </div>

        {/* 3. LINHA DESCONTÍNUA COM O DIZER "ROTEAMENTO & APPS" NO MEIO */}
        <div className="relative flex items-center justify-center my-5">
          {/* Linha tracejada / descontínua */}
          <div className="w-full border-t border-dashed border-zinc-700/80" />
          {/* Texto centralizado no meio da linha */}
          <span className="absolute bg-[#121215] px-3 font-heading text-[11px] tracking-[0.2em] uppercase font-bold text-amber-400/90 whitespace-nowrap">
            ROTEAMENTO & APPS
          </span>
        </div>

        {/* 4. BOTÕES DE WAZE E UBER COM SEUS EMBLEMAS ORIGINAIS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
          
          {/* Botão WAZE (Emblema original do Waze) */}
          <a
            href={wazeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative h-[56px] px-3.5 rounded-xl flex items-center gap-3 bg-gradient-to-b from-[#202026] to-[#141418] border border-zinc-800 shadow-[0_4px_12px_rgba(0,0,0,0.5)] hover:border-amber-500/40 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300"
          >
            {/* Emblema original do Waze */}
            <div className="w-10 h-10 shrink-0 rounded-lg flex items-center justify-center bg-[#33ccff] shadow-sm transition-transform duration-300 group-hover:-translate-y-1 group-hover:scale-105">
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
                <path
                  d="M19.99 12.06c.01-.22.01-.44.01-.66 0-4.64-3.76-8.4-8.4-8.4-4.52 0-8.21 3.58-8.39 8.05-1.78.36-3.1 1.93-3.1 3.82 0 2.15 1.75 3.9 3.9 3.9.45 0 .88-.08 1.28-.22 1.63 1.92 4.07 3.15 6.81 3.15 3.39 0 6.33-1.89 7.82-4.66 1.48-.34 2.58-1.68 2.58-3.28 0-1.07-.49-2.03-1.26-2.66l-.25-.04z"
                  fill="#FFFFFF"
                />
                <circle cx="8.5" cy="11.5" r="1.3" fill="#1C1C1E" />
                <circle cx="15.5" cy="11.5" r="1.3" fill="#1C1C1E" />
                <path
                  d="M10 15c.5 1 2.5 1 3 0"
                  stroke="#1C1C1E"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                />
                <circle cx="7.5" cy="18.5" r="1.5" fill="#1C1C1E" />
                <circle cx="15.5" cy="18.5" r="1.5" fill="#1C1C1E" />
              </svg>
            </div>

            <div className="flex flex-col min-w-0">
              <span className="font-heading text-xs md:text-sm font-bold tracking-wider uppercase text-white group-hover:text-amber-300 transition-colors">
                ABRIR NO WAZE
              </span>
              <span className="text-[10px] text-zinc-400">Rotas e trânsito</span>
            </div>
          </a>

          {/* Botão UBER (Emblema original do Uber exatamente conforme anexo enviado pelo usuário) */}
          <a
            href={uberUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative h-[56px] px-3.5 rounded-xl flex items-center gap-3 bg-gradient-to-b from-[#202026] to-[#141418] border border-zinc-800 shadow-[0_4px_12px_rgba(0,0,0,0.5)] hover:border-amber-500/40 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300"
          >
            {/* Emblema original do Uber com a imagem exata anexada */}
            <div className="w-11 h-10 shrink-0 rounded-lg flex items-center justify-center bg-white shadow-sm transition-transform duration-300 group-hover:-translate-y-1 group-hover:scale-105 px-1">
              <img
                src="/assets/aistudio/image_579dc2f2.png"
                alt="Uber"
                className="w-full h-auto max-h-5 object-contain"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = "/public/assets/aistudio/image_579dc2f2.png";
                }}
              />
            </div>

            <div className="flex flex-col min-w-0">
              <span className="font-heading text-xs md:text-sm font-bold tracking-wider uppercase text-white group-hover:text-amber-300 transition-colors">
                CHAMAR UBER
              </span>
              <span className="text-[10px] text-zinc-400">Destino direto</span>
            </div>
          </a>
        </div>

        {/* 5. OPÇÃO DE "COPIAR LOCAL" */}
        <div className="pt-1 flex justify-center">
          <button
            type="button"
            onClick={handleCopy}
            className={`w-full py-2.5 px-4 rounded-xl font-heading text-xs uppercase font-bold tracking-wider flex items-center justify-center gap-2 transition-all duration-200 border cursor-pointer select-none ${
              copied
                ? 'bg-emerald-500/15 border-emerald-500/40 text-emerald-300'
                : 'bg-zinc-900/80 hover:bg-zinc-800 border-zinc-800 hover:border-amber-500/30 text-zinc-300 hover:text-white'
            }`}
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span>LOCAL COPIADO COM SUCESSO!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-amber-400" />
                <span>COPIAR LOCAL</span>
              </>
            )}
          </button>
        </div>

      </div>
    </div>
  );
};
