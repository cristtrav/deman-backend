export class MarcaNotFoundException extends Error {
    constructor() {
      super(`No se ha encontrado la marca`);
      this.name = 'MarcaNotFoundException';
      Object.setPrototypeOf(this, MarcaNotFoundException.prototype);
    }
  }