import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, Matches, MinLength } from "class-validator";

export class CreateBannerDto {
    @ApiProperty()
    @IsNotEmpty()
    picture_file_id: string;
    
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
