import { DomainException } from "@core/domain/exception/domain.exception";

export class ConflictoInteresDescuentoException extends DomainException {
    code: string;
    statusCode: number;

    constructor(){
        super(`No se puede establecer un descuento y un recargo de interés al mismo tiempo`);
        this.code = 'DISCOUNT_INTEREST_CONFLICT';
        this.statusCode = 400;
    }

}