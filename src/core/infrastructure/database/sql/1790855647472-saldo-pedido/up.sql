ALTER TABLE IF EXISTS pedidos.pedido
    ADD COLUMN IF NOT EXISTS saldo numeric(9,0) DEFAULT 0 NOT NULL;

-- Carga inicial del saldo de los pedidos existentes.
-- A partir de esta migración el saldo lo mantiene la API (casos de uso de pedido y pago).
UPDATE pedidos.pedido p
SET saldo = p.total - COALESCE((
    SELECT SUM(pg.monto)
    FROM "pagos-pedidos".pago pg
    WHERE pg.id_pedido = p.id
      AND pg.eliminado = false
), 0);
