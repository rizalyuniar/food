import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsDate, IsEmail, IsNotEmpty, IsOptional, IsString, IsUUID, MaxLength, MinLength, Validate, ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";
import { PrimaryGeneratedColumn } from "typeorm";

export class CreateUserDto {
    // @ApiProperty()
    @PrimaryGeneratedColumn("uuid")
    id: string

    @IsEmail()
    @IsNotEmpty()
    // @Custemom
    // @isEmailUniq()
    email: string;

    @IsString()
    @MinLength(3)
    @MaxLength(6)
    username: string;
    
    @IsNotEmpty()
    password: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(3)
    @MaxLength(65)
    full_name: string;
    
    @IsString()
    @MinLength(3)
    @MaxLength(25)
    role: string;

    @IsString()
    profile_pict_file_id: string

    @IsString()
    verifiction_code: string

    @IsString()
    auth_provider: string

    @IsString()
    @IsOptional()
    status: string;

    created_at: Date

    // @Type(() => Date)
    // @IsDate()
    created_by: Date

    // @Type(() => Date)
    // @IsDate()
    updated_by: Date
    
    updated_at: Date
    
    deleted_at: Date
    
    // @Type(() => Date)
    // @IsDate()
    deleted_by: Date




    



    // @Type(() => Date)
    // @IsDate()
    // created_t: Date
}

// @ValidatorConstraint({name: 'isEvent'})
// export class IsDivided implements ValidatorConstraintInterface {
//     validate(numbers: number): boolean {
        
//     }
// }