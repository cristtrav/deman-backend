-- Autoriza al usuario a administrar los usuarios del sistema (registrar, editar, eliminar).
-- Los usuarios existentes quedan sin el permiso: al arrancar, la API se lo otorga al usuario
-- definido en ADMIN_CI si todavía no existe ningún administrador activo.
ALTER TABLE auth.usuario
    ADD COLUMN IF NOT EXISTS is_admin boolean DEFAULT false NOT NULL;
