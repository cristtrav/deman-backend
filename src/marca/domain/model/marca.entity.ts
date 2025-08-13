export class Marca {
    private id: number
    private descripcion: string
    private eliminado: boolean = false

    constructor(id: number, descripcion: string, eliminado: boolean = false) {
        if (id === null || id === undefined) throw new Error("El ID es requerido")
        if (descripcion === null || descripcion === undefined) throw new Error("La descripción es requerida")
        if (eliminado) { this.eliminado = eliminado }
        this.id = id
        this.descripcion = descripcion
    }

    getId(): number { return this.id }
    getDescripcion(): string { return this.descripcion }
    isEliminado(): boolean { return this.eliminado }
}