ALTER TABLE IF EXISTS inventario.inventario_detalle DROP CONSTRAINT IF EXISTS fk_inventario_detalle_variante;
ALTER TABLE IF EXISTS inventario.inventario_detalle DROP COLUMN IF EXISTS id_variante;