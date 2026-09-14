import { RequiredFieldException } from "@core/domain/exception/required-field.exception";

export class TotalIvaVenta {
    private _iva10: number;
    private _iva5: number;
    private _exento: number;

    constructor(
        iva10: number = 0,
        iva5: number = 0,
        exento: number = 0 
    ){
        this._iva10 = iva10;
        this._iva5 = iva5;
        this._exento = exento;
    }

    get iva10(): number { return this._iva10 }
    get iva5(): number { return this._iva5 }
    get exento(): number { return this._exento }
    
    set iva10(iva10: number){
        if(iva10 == null) throw new RequiredFieldException('TotalIvaVenta', 'iva10');
        this._iva10 = iva10;
    }
    set iva5(iva5: number){
        if(iva5 == null) throw new RequiredFieldException('TotalIvaVenta', 'iva5');
        this._iva5 = iva5;
    }
    set exento(exento: number){
        if(exento == null) throw new RequiredFieldException('TotalIvaVenta', 'exento');
        this._exento = exento;
    }
}