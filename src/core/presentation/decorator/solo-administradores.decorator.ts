import { SetMetadata } from "@nestjs/common";

export const SOLO_ADMINISTRADORES = 'soloAdministradores';

// Restringe un controlador o endpoint a los usuarios con permiso de administrador
export const SoloAdministradores = () => SetMetadata(SOLO_ADMINISTRADORES, true);
