import { IsNotEmpty, IsString, MaxLength } from "class-validator";

export class LoginDTO {
    @IsString()
    @IsNotEmpty()
    @MaxLength(20)
    ci: string;

    @IsString()
    @IsNotEmpty()
    // bcrypt solo considera los primeros 72 bytes
    @MaxLength(72)
    password: string;
}
