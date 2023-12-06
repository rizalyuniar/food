import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, Matches, MinLength } from "class-validator";

// const passwordRegEx =
//   /^(?=.*[a-z])(?=.*[A-Z])(?=.*d)(?=.*[@$!%*?&])[A-Za-zd@$!%*?&]{8,20}$/;

export class CreateAdminDto {
    @ApiProperty()
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @ApiProperty()
    @IsNotEmpty()
    @MinLength(3)
    username: string;

    @ApiProperty()
    @IsNotEmpty()
    password: string;

    @ApiProperty()
    @IsNotEmpty()
    full_name: string;

    @ApiProperty()
    @IsNotEmpty()
    role: string;

    @ApiProperty()
    @IsNotEmpty()
    profile_pict_file_id: string;

    @ApiProperty()
    @IsNotEmpty()
    status: number;

    tenant_id: string;
    created_by: string;
    updated_by: string;
    deleted_by: string;
}
