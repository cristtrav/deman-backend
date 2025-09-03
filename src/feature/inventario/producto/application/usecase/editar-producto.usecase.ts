import { CommandContract } from "@core/application/contract/command/command.contract";
import { ResultContract } from "@core/application/contract/result/result.contract";
import { BaseUseCase } from "@core/application/usecase/base.usecase";
import { Producto } from "../../domain/model/producto";
import { ProductoRepository } from "../../domain/repository/producto.repository";
import { MarcaRepository } from "../../domain/repository/marca.repository";
import { TipoRepository } from "../../domain/repository/tipo.repository";
import { CategoriaRepository } from "../../domain/repository/categoria.repository";
import { UnidadMedidaRepository } from "../../domain/repository/unidad-medida.repository";
import { NotFoundException } from "@core/application/exception/not-found.exception";

interface ProductoData {
    id: number;
    descripcion: string;
    precio: string;
    idmarca: number,
    idtipo: number;
    idcategoria: number;
    idunidadMedida: string;
}

interface EditarProductoCommand extends CommandContract<ProductoData>{
    previousId: number;
}

interface EditarProductoResult extends ResultContract<Producto>{}

export class EditarProductoUseCase extends BaseUseCase<EditarProductoCommand, EditarProductoResult>{
    
    constructor(
        private productoRepository: ProductoRepository,
        private marcaRepository: MarcaRepository,
        private tipoRepository: TipoRepository,
        private categoriaRepository: CategoriaRepository,
        private unidadMedidaRepository: UnidadMedidaRepository
    ){ super() }

    async execute(command: EditarProductoCommand): Promise<EditarProductoResult> {

        const marca = await this.marcaRepository.findById(command.data.idmarca);
        const tipo = await this.tipoRepository.findById(command.data.idtipo);
        const categoria = await this.categoriaRepository.findById(command.data.idcategoria);
        const unidadMedida = await this.unidadMedidaRepository.findById(command.data.idunidadMedida);

        if(marca == null) throw new NotFoundException('Marca', command.data.idmarca);
        if(tipo == null) throw new NotFoundException('Tipo', command.data.idtipo);
        if(categoria == null) throw new NotFoundException('Categoria', command.data.idcategoria);
        if(unidadMedida == null) throw new NotFoundException('UnidadMedida', command.data.idunidadMedida)

        const producto = new Producto(
            command.data.id,
            command.data.descripcion,
            command.data.precio,
            unidadMedida,
            marca,
            categoria,
            tipo
        );
        const savedProducto = await this.productoRepository.edit(command.previousId, producto);
        return { data: savedProducto };
    }

}