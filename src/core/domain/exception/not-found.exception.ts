import { DomainException } from "./domain.exception";

export class NotFoundException extends DomainException{
    readonly code: string = 'RESOURCE_NOT_FOUND';
    readonly statusCode: number = 404;

    constructor(resource: string, identifier?: string | number){
        const message = identifier
        ? `No se encontró ${resource} con el identificador '${identifier}'`
        : `No se encontró ${resource}`;
        super(message);
    }
}