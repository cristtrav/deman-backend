ALTER TABLE IF EXISTS pedidos.pedido_detalle
    ALTER COLUMN id_producto DROP NOT NULL;

ALTER TABLE IF EXISTS pedidos.pedido_detalle
    ALTER COLUMN id_variante DROP NOT NULL;

ALTER TABLE IF EXISTS pedidos.pedido
    ADD COLUMN descripcion text;

ALTER TABLE IF EXISTS pedidos.pedido
    ALTER COLUMN fecha_entrega SET NOT NULL;

ALTER TABLE IF EXISTS pedidos.pedido
    ADD COLUMN fecha_entregado date;