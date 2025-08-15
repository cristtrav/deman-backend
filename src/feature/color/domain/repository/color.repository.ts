import { Color } from "../model/color.entity";
import { NewColor } from "../model/new-color.entity";

export abstract class ColorRepository {
        abstract create(color: NewColor): Promise<Color>;
        abstract getById(id: number): Promise<Color | null>;
        abstract findByName(nombre: string): Promise<Color |null>
        abstract update(id: number, descripcion: string): Promise<Color>;
        abstract delete(id: number): Promise<void>;
        abstract count(): Promise<number>;
    }