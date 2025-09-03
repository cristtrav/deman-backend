import { RequiredFieldException } from "@core/domain/exception/required-field.exception";
import { Categoria } from "./categoria";
import { Marca } from "./marca";
import { Tipo } from "./tipo";
import { UnidadMedida } from "./unidad-medida";

export class NewProducto {
    private _id?: number;
    private _descripcion: string;
    private _precio: string;
    private _unidadMedida: UnidadMedida;
    private _marca: Marca;
    private _categoria: Categoria;
    private _tipo: Tipo

    constructor(
        descripcion: string,
        precio: string,
        unidadMedida: UnidadMedida,
        marca: Marca,
        categoria: Categoria,
        tipo: Tipo,
        id?: number
    ){
        if(descripcion == null) throw new RequiredFieldException('Producto', 'descripcion');
        if(precio == null) throw new RequiredFieldException('Producto', 'precio');
        if(unidadMedida == null) throw new RequiredFieldException('Producto', 'unidadMedida');
        if(marca == null) throw new RequiredFieldException('Producto', 'marca');
        if(categoria == null) throw new RequiredFieldException('Producto', 'categoria');
        if(tipo == null) throw new RequiredFieldException('Producto', 'tipo');

        this._id = id;
        this._descripcion = descripcion;
        this._precio = precio;
        this._unidadMedida = unidadMedida;
        this._marca = marca;
        this._categoria = categoria;
        this._tipo = tipo;
    }
    
    get id(): number | undefined { return this._id }
    get descripcion(): string { return this._descripcion }
    get precio(): string { return this._precio }
    get unidadMedida(): UnidadMedida { return this._unidadMedida }
    get marca(): Marca { return this._marca }
    get categoria(): Categoria { return this._categoria }
    get tipo(): Tipo { return this._tipo }
}