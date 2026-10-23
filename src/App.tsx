import React, { useState } from 'react';
import { VideoHeader } from './components/VideoHeader.tsx';
import { StatusBadge } from './components/StatusBadge.tsx';
import { KeywordsMarquee } from './components/KeywordsMarquee.tsx';
import { BackgroundSilhouettes } from './components/BackgroundSilhouettes.tsx';
import { SparkButton } from './components/SparkButton.tsx';
import { LocationSection } from './components/LocationSection.tsx';
import { WifiModal } from './components/WifiModal.tsx';
import { FloatingReviewButton } from './components/FloatingReviewButton.tsx';
import { Footer } from './components/Footer.tsx';
import { Wifi } from 'lucide-react';

export default function App() {
  const [isWifiOpen, setIsWifiOpen] = useState(false);

  return (
    <div className="relative min-h-screen w-full bg-[#050507] text-[#f4f4f5] flex flex-col items-center justify-between overflow-x-hidden selection:bg-amber-500/30 selection:text-amber-200">
      {/* Camada de Silhuetas Automotivas no Fundo (Fastback, Stepway, Civic) */}
      <BackgroundSilhouettes />

      {/* Conteúdo Principal */}
      <div className="relative z-10 w-full flex flex-col items-center">
        
        {/* 1. VÍDEO NO TOPO (Com máscara linear e transição aveludada sem corte seco) */}
        <VideoHeader videoUrl="https://yourimageshare.com/ib/2JH73bL4R1.mp4" />

        {/* 2. INDICADOR DE FUNCIONAMENTO (Ajustado no mobile para não cobrir o vídeo; desktop inalterado) */}
        <div className="mt-1 md:-mt-7 relative z-20 w-full flex justify-center">
          <StatusBadge />
        </div>

        {/* 3. LETREIRO DE PALAVRAS-CHAVE NA HORIZONTAL TODA DA TELA (100% da tela de ponta a ponta) */}
        <div className="w-full relative z-20">
          <KeywordsMarquee />
        </div>

        {/* Bloco Central dos Botões e Conteúdo Principal */}
        <div className="w-full max-w-[500px] px-4 mt-2 flex flex-col items-center">
          
          {/* 4. OS QUATRO BOTÕES PRINCIPAIS COM EMBLEMAS EM AMARELO PADRÃO */}
          <main className="w-full flex flex-col items-center gap-3.5">
            
            {/* BOTÃO 1 (DESTAQUE MÁXIMO) — AVALIAÇÃO DO GOOGLE */}
            <SparkButton
              label="AVALIE NOSSA EMPRESA"
              sublabel="Sua avaliação é muito importante"
              href="https://search.google.com/local/writereview?placeid=ChIJv5LDxHd_mQAR9EBsHJBNuXE"
              isFeatured={true}
              badge="★ 5.0"
              icon={
                <svg
                  className="w-7 h-7 text-amber-400 fill-current"
                  viewBox="0 0 24 24"
                >
                  <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.067 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z" />
                </svg>
              }
            />

            {/* BOTÃO 2 — WHATSAPP */}
            <SparkButton
              label="FALAR NO WHATSAPP"
              sublabel="Atendimento direto e vendas"
              href="https://wa.link/uynnip"
              icon={
                <svg
                  className="w-6 h-6 text-amber-400 fill-current"
                  viewBox="0 0 24 24"
                >
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                </svg>
              }
            />

            {/* BOTÃO 3 — INSTAGRAM */}
            <SparkButton
              label="ACOMPANHE NO INSTAGRAM"
              sublabel="@fabricio_motors"
              href="https://www.instagram.com/fabricio_motors?srtk=Nmk3aGhpd29kaWho"
              icon={
                <svg
                  className="w-6 h-6 text-amber-400 fill-current"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              }
            />

            {/* BOTÃO 4 — WI-FI */}
            <SparkButton
              label="CONECTAR AO WI-FI"
              sublabel="Acesso exclusivo na loja física"
              onClick={() => setIsWifiOpen(true)}
              isExternal={false}
              icon={
                <div className="relative">
                  <Wifi className="w-6 h-6 text-amber-400" />
                  <span className="w-2 h-2 rounded-full bg-amber-400 absolute -top-0.5 -right-0.5 animate-pulse" />
                </div>
              }
            />
          </main>

          {/* 5. SEÇÃO DE LOCALIZAÇÃO E ROTAS (Google Maps, Waze, Uber) */}
          <LocationSection />

          {/* 6. RODAPÉ MINIMALISTA */}
          <Footer />
        </div>
      </div>

      {/* Botão Flutuante de Fácil Acesso ao Google Avaliação (Aparece ao rolar a página) */}
      <FloatingReviewButton />

      {/* Painel Modal de Conexão Wi-Fi */}
      <WifiModal
        isOpen={isWifiOpen}
        onClose={() => setIsWifiOpen(false)}
      />
    </div>
  );
}
