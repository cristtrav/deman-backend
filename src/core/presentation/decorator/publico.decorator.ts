import { SetMetadata } from "@nestjs/common";

export const ES_PUBLICO = 'esPublico';

// Excluye un controlador o endpoint de la verificación del token de acceso
export const Publico = () => SetMetadata(ES_PUBLICO, true);
