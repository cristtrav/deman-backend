import { CommandContract } from "@core/application/contract/command/command.contract";
import { ResultContract } from "@core/application/contract/result/result.contract";
import { BaseUseCase } from "@core/application/usecase/base.usecase";
import { Producto } from "../../domain/model/producto";
import { ProductoRepository } from "../../domain/repository/producto.repository";
import { CategoriaRepository } from "../../domain/repository/categoria.repository";
import { TipoRepository } from "../../domain/repository/tipo.repository";
import { UnidadMedidaRepository } from "../../domain/repository/unidad-medida.repository";
import { MarcaRepository } from "../../domain/repository/marca.repository";
import { NotFoundException } from "@core/application/exception/not-found.exception";
import { NewProducto } from "../../domain/model/new-producto";

interface ProductoData {
    id?: number;
    descripcion: string;
    precio: string;
    idmarca: number,
    idtipo: number;
    idcategoria: number;
    idunidadMedida: string;
}

interface CrearProductoCommand extends CommandContract<ProductoData> { }
interface CrearProductoResult extends ResultContract<Producto> {}

export class CrearProductoUseCase extends BaseUseCase<CrearProductoCommand, CrearProductoResult>{
    
    constructor(
        readonly marcaRepository: MarcaRepository,
        readonly categoriaRepository: CategoriaRepository,
        readonly tipoRepository: TipoRepository,
        readonly unidadMedidaRepository: UnidadMedidaRepository,
        readonly productoRepository: ProductoRepository
    ){ super(); }

    async execute(command: CrearProductoCommand): Promise<CrearProductoResult> {
        const marca = await this.marcaRepository.findById(command.data.idmarca);
        const categoria = await this.categoriaRepository.findById(command.data.idcategoria);
        const tipo = await this.tipoRepository.findById(command.data.idtipo);
        const unidadMedida = await this.unidadMedidaRepository.findById(command.data.idunidadMedida);

        if(marca == null) throw new NotFoundException('Marca', command.data.idmarca);
        if(categoria == null) throw new NotFoundException('Categoria', command.data.idcategoria);
        if(tipo == null) throw new NotFoundException('Tipo', command.data.idtipo);
        if(unidadMedida == null) throw new NotFoundException('UnidadMedida', command.data.idcategoria);

        const newProducto = new NewProducto(
            command.data.descripcion,
            command.data.precio,
            unidadMedida,
            marca,
            categoria,
            tipo,
            command.data.id
        )

        return { data: await this.productoRepository.create(newProducto) }
    }

}