import { DomainException } from "./domain.exception";

export class BusinessRuleException extends DomainException{
    readonly code: string = 'BUSINESS_RULE_VIOLATION';
    readonly statusCode: number = 422;

    constructor(message: string, public readonly details?: any){
        super(message);
    }
}