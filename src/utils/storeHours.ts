/**
 * Utilitário de cálculo do horário de funcionamento em tempo real
 * no fuso horário oficial de Brasília (America/Sao_Paulo).
 *
 * Horários oficiais:
 * - Segunda a sexta-feira: 09:00 às 18:00
 * - Sábado: 09:00 às 14:00
 * - Domingo: Fechado
 */

export interface StoreStatus {
  isOpen: boolean;
  statusText: 'ABERTO AGORA' | 'FECHADO NO MOMENTO';
  detailText: string;
  spTimeFormatted: string;
  currentDayName: string;
  dayOfWeek: number;
}

export function getStoreStatus(referenceDate = new Date()): StoreStatus {
  // Obter hora e componentes exatos em America/Sao_Paulo
  const options: Intl.DateTimeFormatOptions = {
    timeZone: 'America/Sao_Paulo',
    weekday: 'short',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    hour12: false,
  };

  const formatter = new Intl.DateTimeFormat('en-US', options);
  const parts = formatter.formatToParts(referenceDate);

  let weekday = '';
  let hour = 0;
  let minute = 0;

  for (const part of parts) {
    if (part.type === 'weekday') weekday = part.value; // e.g. Mon, Tue, etc.
    if (part.type === 'hour') hour = parseInt(part.value, 10);
    if (part.type === 'minute') minute = parseInt(part.value, 10);
  }

  // Mapear dia da semana: 0 = Dom, 1 = Seg, 2 = Ter, 3 = Qua, 4 = Qui, 5 = Sex, 6 = Sáb
  const weekdayMap: Record<string, number> = {
    Sun: 0,
    Mon: 1,
    Tue: 2,
    Wed: 3,
    Thu: 4,
    Fri: 5,
    Sat: 6,
  };

  const dayOfWeek = weekdayMap[weekday] ?? 0;
  const timeInMinutes = hour * 60 + minute;

  const spTimeFormatted = `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`;

  const dayNamesPt = [
    'Domingo',
    'Segunda-feira',
    'Terça-feira',
    'Quarta-feira',
    'Quinta-feira',
    'Sexta-feira',
    'Sábado',
  ];
  const currentDayName = dayNamesPt[dayOfWeek];

  // Segunda a Sexta: 09:00 às 18:00 (540 min às 1080 min)
  if (dayOfWeek >= 1 && dayOfWeek <= 5) {
    if (timeInMinutes >= 9 * 60 && timeInMinutes < 18 * 60) {
      return {
        isOpen: true,
        statusText: 'ABERTO AGORA',
        detailText: 'Hoje até às 18:00',
        spTimeFormatted,
        currentDayName,
        dayOfWeek,
      };
    } else if (timeInMinutes < 9 * 60) {
      return {
        isOpen: false,
        statusText: 'FECHADO NO MOMENTO',
        detailText: 'Abre hoje às 09:00',
        spTimeFormatted,
        currentDayName,
        dayOfWeek,
      };
    } else {
      // Após as 18:00
      if (dayOfWeek === 5) {
        // Sexta à noite
        return {
          isOpen: false,
          statusText: 'FECHADO NO MOMENTO',
          detailText: 'Abre sábado às 09:00',
          spTimeFormatted,
          currentDayName,
          dayOfWeek,
        };
      } else {
        return {
          isOpen: false,
          statusText: 'FECHADO NO MOMENTO',
          detailText: 'Abre amanhã às 09:00',
          spTimeFormatted,
          currentDayName,
          dayOfWeek,
        };
      }
    }
  }

  // Sábado: 09:00 às 14:00 (540 min às 840 min)
  if (dayOfWeek === 6) {
    if (timeInMinutes >= 9 * 60 && timeInMinutes < 14 * 60) {
      return {
        isOpen: true,
        statusText: 'ABERTO AGORA',
        detailText: 'Hoje até às 14:00',
        spTimeFormatted,
        currentDayName,
        dayOfWeek,
      };
    } else if (timeInMinutes < 9 * 60) {
      return {
        isOpen: false,
        statusText: 'FECHADO NO MOMENTO',
        detailText: 'Abre hoje às 09:00',
        spTimeFormatted,
        currentDayName,
        dayOfWeek,
      };
    } else {
      return {
        isOpen: false,
        statusText: 'FECHADO NO MOMENTO',
        detailText: 'Abre segunda às 09:00',
        spTimeFormatted,
        currentDayName,
        dayOfWeek,
      };
    }
  }

  // Domingo (0): Fechado o dia todo
  return {
    isOpen: false,
    statusText: 'FECHADO NO MOMENTO',
    detailText: 'Abre segunda às 09:00',
    spTimeFormatted,
    currentDayName,
    dayOfWeek,
  };
}
