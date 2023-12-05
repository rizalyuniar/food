import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, Matches, MinLength } from "class-validator";

export class CreateTenantDto {
    @ApiProperty()
    @IsNotEmpty()
    name: string;

    @ApiProperty()
    @IsNotEmpty()
    initial: string;

    @ApiProperty()
    @IsNotEmpty()
    description: string;

    @ApiProperty()
    @IsNotEmpty()
    profile_pict_file_id: string;

    @ApiProperty()
    @IsNotEmpty()
    type: string;

    @ApiProperty()
    @IsNotEmpty()
    status: number;

    created_by: string;
    updated_by: string;
    deleted_by: string;
}
