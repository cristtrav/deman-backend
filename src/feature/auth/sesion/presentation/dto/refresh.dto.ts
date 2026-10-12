import { IsJWT, IsNotEmpty, IsString } from "class-validator";

export class RefreshDTO {
    @IsString()
    @IsNotEmpty()
    @IsJWT()
    refreshToken: string;
}
