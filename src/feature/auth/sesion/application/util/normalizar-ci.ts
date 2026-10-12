// Los CI se guardan sin puntos: "1.234.567" y "1234567" son el mismo usuario
export function normalizarCi(ci: string): string {
    return ci.trim().replace(/\./g, '')
}
