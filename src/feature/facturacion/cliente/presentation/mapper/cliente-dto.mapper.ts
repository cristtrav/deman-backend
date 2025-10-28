import { Cliente } from "../../domain/model/cliente";
import { ClienteDTO } from "../dto/cliente.dto";

export class ClienteDTOMapper {
    static toDTO(cliente: Cliente): ClienteDTO{
        return{
            id: cliente.id, 
            razonSocial: cliente.razonSocial, 
            ruc: cliente.ruc, 
            telefono: cliente.telefono
        }
    }
}