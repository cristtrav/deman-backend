ALTER TABLE IF EXISTS inventario.inventario_detalle
    ADD COLUMN id_variante integer NOT NULL;
ALTER TABLE IF EXISTS inventario.inventario_detalle
    ADD CONSTRAINT fk_inventario_detalle_variante FOREIGN KEY (id_variante)
    REFERENCES inventario.variante (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;