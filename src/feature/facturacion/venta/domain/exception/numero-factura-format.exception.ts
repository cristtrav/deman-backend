import { DomainException } from "@core/domain/exception/domain.exception";

export class NumeroFacturaFormatException extends DomainException {
    code: string;
    statusCode: number;

    constructor(){
        super(`Formato de número de factura debe ser: 000-000-0000000. Y contener solo números.`);
        this.code = 'NUMERO_FACTURA_FORMAT_EXCEPTION';
        this.statusCode = 400;
    }
}