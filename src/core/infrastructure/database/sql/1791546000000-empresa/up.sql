CREATE SCHEMA IF NOT EXISTS configuracion;

-- Datos de la empresa que emite los comprobantes. Es un único registro: el CHECK sobre el id
-- impide que exista más de una fila.
-- El dígito verificador del RUC se valida en la API; aquí solo se garantiza el formato.
CREATE TABLE IF NOT EXISTS configuracion.empresa (
    id smallint DEFAULT 1 NOT NULL,
    nombre character varying(100) NOT NULL,
    direccion character varying(200),
    ruc character varying(10),
    telefono character varying(20),
    CONSTRAINT empresa_pkey PRIMARY KEY (id),
    CONSTRAINT chk_empresa_unica CHECK (id = 1),
    CONSTRAINT chk_empresa_ruc CHECK (ruc ~ '^[0-9]{1,8}-[0-9]$')
);

-- Copia de los datos de la empresa en cada recibo, para que una reimpresión muestre lo mismo que el original.
-- Son opcionales solo para los recibos emitidos antes de esta migración: la API exige la empresa al emitir,
-- y los recibos sin estos datos se completan con los de la empresa la primera vez que esta se registra.
ALTER TABLE "pagos-pedidos".recibo
    ADD COLUMN IF NOT EXISTS empresa_nombre character varying(100),
    ADD COLUMN IF NOT EXISTS empresa_direccion character varying(200),
    ADD COLUMN IF NOT EXISTS empresa_ruc character varying(10),
    ADD COLUMN IF NOT EXISTS empresa_telefono character varying(20);
