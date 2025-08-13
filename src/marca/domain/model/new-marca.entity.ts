export class NewMarca {
    private descripcion: string
    private eliminado: boolean = false

    constructor(descripcion: string, eliminado: boolean = false) {
        if (descripcion === null || descripcion === undefined) throw new Error("La descripción es requerida")
        if (eliminado) { this.eliminado = eliminado }
        this.descripcion = descripcion
    }

    getDescripcion(): string { return this.descripcion }
    isEliminado(): boolean { return this.eliminado }
}