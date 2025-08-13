export class MarcaAlreadyExistsException extends Error {
    constructor(descripcion: string) {
      super(`La marca con descripción: ${descripcion} ya existe`);
      this.name = 'MarcaAlreadyExistsException';
      Object.setPrototypeOf(this, MarcaAlreadyExistsException.prototype);
    }
  }