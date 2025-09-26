import { RequiredFieldException } from "@core/domain/exception/required-field.exception";

export class Conjugacion {
    private _singular: string;
    private _plural: string;

    constructor(singular: string, plural: string){
        if(singular == null) throw new RequiredFieldException('Conjugacion', 'singular');
        if(plural == null) throw new RequiredFieldException('Conjugacion', 'plural');
        this._singular = singular;
        this._plural = plural;
    }

    get singular(): string { return this._singular }
    get plural(): string { return this._plural }

    set singular(value: string){ this._singular = value }
    set plural(value: string){ this._plural = value }
}