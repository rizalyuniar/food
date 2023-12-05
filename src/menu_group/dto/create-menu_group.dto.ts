import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, Matches, MinLength } from "class-validator";

export class CreateMenuGroupDto {
    @ApiProperty()
    @IsNotEmpty()
    name: string;

    @ApiProperty()
    @IsNotEmpty()
    description: string;

    @ApiProperty()
    @IsNotEmpty()
    sequence: number;

    @ApiProperty()
    @IsNotEmpty()
    status: number;
    
    created_by: string;
    updated_by: string;
    deleted_by: string;
}
