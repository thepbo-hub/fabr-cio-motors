import React, { useState, useEffect } from 'react';
import { getStoreStatus, StoreStatus } from '../utils/storeHours.ts';
import { Clock, ChevronDown, Calendar } from 'lucide-react';

export const StatusBadge: React.FC = () => {
  const [status, setStatus] = useState<StoreStatus>(() => getStoreStatus());
  const [showSchedule, setShowSchedule] = useState(false);

  useEffect(() => {
    // Atualização em tempo real a cada 20 segundos
    const interval = setInterval(() => {
      setStatus(getStoreStatus());
    }, 20000);

    return () => clearInterval(interval);
  }, []);

  const scheduleDays = [
    { day: 'Segunda a Sexta', hours: '09:00 às 18:00', active: status.dayOfWeek >= 1 && status.dayOfWeek <= 5 },
    { day: 'Sábado', hours: '09:00 às 14:00', active: status.dayOfWeek === 6 },
    { day: 'Domingo', hours: 'Fechado', active: status.dayOfWeek === 0 },
  ];

  return (
    <div className="w-full flex flex-col items-center justify-center my-3 z-10 px-4">
      {/* Container Principal do Badge */}
      <div
        onClick={() => setShowSchedule(!showSchedule)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            setShowSchedule(!showSchedule);
          }
        }}
        className="group relative cursor-pointer select-none inline-flex items-center gap-3 px-4 py-2 rounded-full bg-gradient-to-r from-zinc-900/90 via-zinc-900/95 to-zinc-950/90 border border-zinc-800/80 shadow-[0_4px_20px_rgba(0,0,0,0.6)] backdrop-blur-md transition-all duration-300 hover:border-amber-500/40 hover:shadow-[0_4px_25px_rgba(245,158,11,0.15)] focus:outline-none focus:ring-1 focus:ring-amber-500/50"
      >
        {/* Ponto Luminoso Dinâmico com Radar Ping */}
        <div className="relative flex items-center justify-center w-3 h-3">
          {status.isOpen ? (
            <>
              <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 radar-glow-green" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500 shadow-[0_0_10px_#10b981]" />
            </>
          ) : (
            <>
              <span className="absolute inline-flex h-full w-full rounded-full bg-rose-500 opacity-70 radar-glow-red" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-rose-600 shadow-[0_0_10px_#e11d48]" />
            </>
          )}
        </div>

        {/* Texto de Status Oficial e Horário de Fechamento / Abertura */}
        <div className="flex items-center gap-2 text-xs md:text-sm">
          <span
            className={`font-heading tracking-wider font-bold uppercase ${
              status.isOpen ? 'text-emerald-400' : 'text-zinc-300'
            }`}
          >
            {status.statusText}
          </span>
          <span className="text-zinc-500 font-light">•</span>
          <span className="text-zinc-400 font-normal">
            {status.detailText}
          </span>
        </div>

        {/* Ícone sutil para indicar que pode ser expandido */}
        <ChevronDown
          className={`w-3.5 h-3.5 text-zinc-500 transition-transform duration-300 group-hover:text-amber-400 ${
            showSchedule ? 'rotate-180 text-amber-400' : ''
          }`}
        />
      </div>

      {/* Painel Expansível de Horários Oficiais */}
      {showSchedule && (
        <div className="w-full max-w-[340px] mt-2.5 p-3.5 rounded-xl bg-zinc-950/95 border border-zinc-800 shadow-[0_10px_30px_rgba(0,0,0,0.8)] backdrop-blur-xl animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="flex items-center justify-between pb-2 mb-2 border-b border-zinc-800/80 text-[11px] uppercase tracking-wider text-amber-400/90 font-semibold">
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-amber-400" /> Horários Oficiais
            </span>
            <span className="text-zinc-500 font-mono text-[10px] flex items-center gap-1">
              <Clock className="w-3 h-3" /> SP: {status.spTimeFormatted}
            </span>
          </div>

          <div className="space-y-1.5 text-xs">
            {scheduleDays.map((item, idx) => (
              <div
                key={idx}
                className={`flex items-center justify-between px-2 py-1.5 rounded-lg transition-colors ${
                  item.active
                    ? 'bg-amber-500/10 text-amber-200 font-medium border border-amber-500/20'
                    : 'text-zinc-400'
                }`}
              >
                <span>{item.day}</span>
                <span className="font-mono text-[11px]">{item.hours}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
