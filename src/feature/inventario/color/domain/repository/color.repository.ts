import { Color } from "../model/color.entity";
import { NewColor } from "../model/new-color.entity";

export abstract class ColorRepository {
        abstract create(color: NewColor): Promise<Color>;
        abstract edit(color: Color): Promise<Color>;
        abstract delete(id: number): Promise<void>;
        abstract findById(id: number): Promise<Color | null>;
    }