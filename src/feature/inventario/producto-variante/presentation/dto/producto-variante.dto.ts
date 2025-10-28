export interface ProductoVarianteDTO {
    id: { idproducto: number, idvariante: number }
    producto: {
        id: number,
        descripcion: string,
        tipo: string,
        categoria: string
    },
    variante: {
        id: number,
        descripcion?: string,
        tamanio: string,
        color: string
    }
}