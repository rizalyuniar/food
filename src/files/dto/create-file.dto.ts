import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, Matches, MinLength } from "class-validator";

export class CreateFileDto {
    @ApiProperty()
    @IsNotEmpty()
    @MinLength(3)
    filename: string;
}
