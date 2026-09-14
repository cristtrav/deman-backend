import { RequiredFieldException } from "@core/domain/exception/required-field.exception";
import { ConflictoInteresDescuentoException } from "../exception/conflicto-interes-descuento.exception";

export class TotalVenta {
    private _total: number;
    private _totalDescuento: number;
    private _totalInteres: number;
    private _totalFinal: number;

    constructor(
        total: number,
        totalDescuento: number = 0,
        totalInteres: number = 0,
    ){
        if(total == null) throw new RequiredFieldException('TotalVenta', 'total');
        if(totalDescuento != 0 && totalInteres != 0) throw new ConflictoInteresDescuentoException();
        this._total = total;
        this._totalFinal = total - totalDescuento;
        this._totalFinal = total - totalInteres;
    }

    get total(): number { return this._total }
    get totalInteres(): number { return this._totalInteres }
    get totalDescuento(): number { return this._totalDescuento }
    get totalFinal(): number { return this._totalFinal }

}