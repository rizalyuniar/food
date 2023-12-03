import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, IsNumber } from "class-validator";

export class CreateTFileDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    filename: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    basepath: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    mimetype: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    version: number;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    type: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    usage_status: number;

    @ApiProperty()
    created_at: Date;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    created_by: string;

    @ApiProperty()
    updated_at: Date;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    updated_by: string;

    @ApiProperty()
    deleted_at: Date;

    @ApiProperty()
    @IsString()
    deleted_by: string;
}