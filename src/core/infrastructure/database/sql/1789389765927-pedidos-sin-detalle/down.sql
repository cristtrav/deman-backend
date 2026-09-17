ALTER TABLE IF EXISTS pedidos.pedido_detalle
    ALTER COLUMN id_producto SET NOT NULL;

ALTER TABLE IF EXISTS pedidos.pedido_detalle
    ALTER COLUMN id_variante SET NOT NULL;

ALTER TABLE IF EXISTS pedidos.pedido DROP COLUMN IF EXISTS descripcion;

ALTER TABLE IF EXISTS pedidos.pedido DROP COLUMN IF EXISTS fecha_entregado;

ALTER TABLE IF EXISTS pedidos.pedido
    ALTER COLUMN fecha_entrega DROP NOT NULL;