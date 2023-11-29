import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, Matches, MinLength } from "class-validator";

export class CreateTenantDto {
    @ApiProperty()
    @IsNotEmpty()
    @MinLength(3)
    name_store: string;

    @ApiProperty()
    @IsNotEmpty()
    @MinLength(3)
    status: string;
}
