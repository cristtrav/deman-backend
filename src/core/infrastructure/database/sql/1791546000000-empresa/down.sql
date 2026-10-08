ALTER TABLE "pagos-pedidos".recibo
    DROP COLUMN IF EXISTS empresa_nombre,
    DROP COLUMN IF EXISTS empresa_direccion,
    DROP COLUMN IF EXISTS empresa_ruc,
    DROP COLUMN IF EXISTS empresa_telefono;

DROP TABLE IF EXISTS configuracion.empresa;

DROP SCHEMA IF EXISTS configuracion;
