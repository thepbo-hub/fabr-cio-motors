import React, { useState } from 'react';
import { Wifi, Eye, EyeOff, Check, Copy, X, AlertCircle } from 'lucide-react';
import { WIFI_SSID, WIFI_PASSWORD } from '../config/wifi.ts';

interface WifiModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const WifiModal: React.FC<WifiModalProps> = ({ isOpen, onClose }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [copyError, setCopyError] = useState(false);

  if (!isOpen) return null;

  const isConfigured = Boolean(WIFI_PASSWORD && WIFI_PASSWORD.trim().length > 0);

  const handleCopyPassword = async () => {
    if (!isConfigured) return;

    try {
      // Copiar estritamente o valor puro da senha sem prefixos ou caracteres extras
      await navigator.clipboard.writeText(WIFI_PASSWORD);
      setIsCopied(true);
      setCopyError(false);
      setTimeout(() => {
        setIsCopied(false);
      }, 2500);
    } catch (err) {
      console.warn('Falha no acesso ao clipboard:', err);
      setCopyError(true);
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="wifi-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      {/* Modal Container */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-[420px] rounded-3xl bg-gradient-to-b from-[#18181c] via-[#121215] to-[#0a0a0c] border border-amber-500/25 p-6 md:p-7 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.95),0_0_40px_rgba(245,158,11,0.15)] text-white animate-in zoom-in-95 duration-200"
      >
        {/* Linha de reflexo dourado chanfrado no topo */}
        <div className="absolute top-0 left-6 right-6 h-[1px] bg-gradient-to-r from-transparent via-amber-400/40 to-transparent pointer-events-none" />

        {/* Botão de Fechar */}
        <button
          onClick={onClose}
          aria-label="Fechar painel Wi-Fi"
          className="absolute top-4 right-4 w-9 h-9 rounded-full flex items-center justify-center text-zinc-400 hover:text-white hover:bg-white/10 transition-colors focus:outline-none focus:ring-1 focus:ring-amber-500"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Cabeçalho do Painel */}
        <div className="flex flex-col items-center text-center mb-6">
          <div className="w-14 h-14 rounded-2xl flex items-center justify-center bg-gradient-to-br from-amber-500/20 via-zinc-900 to-zinc-950 border border-amber-500/30 text-amber-400 mb-3 shadow-[0_0_20px_rgba(245,158,11,0.2)]">
            <Wifi className="w-7 h-7" />
          </div>
          <h3
            id="wifi-title"
            className="font-heading text-xl md:text-2xl font-bold tracking-[0.1em] uppercase text-white"
          >
            Rede Wi-Fi Exclusiva
          </h3>
          <p className="text-xs text-zinc-400 mt-1">
            Conecte seu dispositivo enquanto visita a FABRICIO MOTORS
          </p>
        </div>

        {/* Informações da Rede */}
        <div className="space-y-4">
          {/* 1. Nome da Rede (SSID) - Apenas texto normal selecionável, SEM botão/ação de cópia */}
          <div className="p-3.5 rounded-2xl bg-zinc-900/80 border border-zinc-800">
            <span className="block text-[11px] font-semibold uppercase tracking-wider text-zinc-400 mb-1">
              Nome da Rede (SSID)
            </span>
            <div className="text-base font-semibold text-white tracking-wide select-all font-mono">
              {WIFI_SSID || 'FABRICIO MOTORS'}
            </div>
          </div>

          {/* 2. Senha do Wi-Fi com campo destacado e alternância de visibilidade */}
          <div className="p-3.5 rounded-2xl bg-zinc-900/90 border border-amber-500/20 relative">
            <div className="flex items-center justify-between mb-1">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-amber-400/90">
                Senha do Wi-Fi
              </span>
              {isConfigured && (
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? 'Ocultar senha' : 'Ver senha'}
                  className="text-xs text-zinc-400 hover:text-amber-300 flex items-center gap-1 transition-colors"
                >
                  {showPassword ? (
                    <>
                      <EyeOff className="w-3.5 h-3.5" />
                      <span>Ocultar</span>
                    </>
                  ) : (
                    <>
                      <Eye className="w-3.5 h-3.5" />
                      <span>Revelar</span>
                    </>
                  )}
                </button>
              )}
            </div>

            {isConfigured ? (
              <div className="text-lg font-mono font-bold tracking-wider text-white select-all py-1">
                {showPassword ? WIFI_PASSWORD : '••••••••••••'}
              </div>
            ) : (
              <div className="flex items-center gap-2 text-xs text-amber-300/80 py-1.5 font-medium">
                <AlertCircle className="w-4 h-4 shrink-0 text-amber-400" />
                <span>Configuração pendente pela loja</span>
              </div>
            )}
          </div>

          {/* Feedback de erro caso a API de Clipboard falhe */}
          {copyError && (
            <p className="text-xs text-amber-300/90 text-center">
              Não foi possível copiar automaticamente. Selecione e copie manualmente a senha acima.
            </p>
          )}

          {/* 3. Botão Único de Ação: COPIAR SENHA */}
          {isConfigured && (
            <button
              type="button"
              onClick={handleCopyPassword}
              disabled={isCopied}
              className={`w-full h-12 rounded-xl font-heading font-bold uppercase tracking-wider text-sm flex items-center justify-center gap-2 transition-all duration-300 cursor-pointer shadow-lg active:scale-[0.98] ${
                isCopied
                  ? 'bg-emerald-600 text-white shadow-emerald-500/20'
                  : 'bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 text-black hover:brightness-110 shadow-amber-500/20'
              }`}
            >
              {isCopied ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>SENHA COPIADA!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>COPIAR SENHA</span>
                </>
              )}
            </button>
          )}
        </div>

        {/* Rodapé informativo discreto */}
        <p className="text-[10px] text-zinc-500 text-center mt-4">
          Rede de alta velocidade protegida para clientes em atendimento.
        </p>
      </div>
    </div>
  );
};
