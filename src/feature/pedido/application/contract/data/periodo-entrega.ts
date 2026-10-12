export const PERIODOS_ENTREGA = ['hoy', 'semana', 'atrasados'] as const;

// hoy: entregas de la fecha actual. semana: los 6 días siguientes (no repite las de hoy).
// atrasados: entregas con fecha anterior a hoy que siguen pendientes.
export type PeriodoEntrega = typeof PERIODOS_ENTREGA[number];
