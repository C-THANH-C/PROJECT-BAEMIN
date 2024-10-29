import { IsEmail, IsNotEmpty, IsString, IsOptional, IsArray } from 'class-validator';
export class LoginDto {
    email: string;
    password: string;
}
export class SignUpDto {
    @IsEmail()
    email: string;


    @IsString()
    @IsNotEmpty()
    password: string;

    @IsString()
    @IsNotEmpty()
    full_name: string;

    @IsString()
    @IsNotEmpty()
    phone: string;

    @IsString()
    @IsNotEmpty()
    account: string;

    @IsString()
    @IsNotEmpty()
    address: string;

    @IsOptional()
    user_create?: Date;

    @IsArray()
    @IsOptional()
    @IsString({ each: true })
    user_image: string[];
}
export class UpdateDto {

    @IsEmail()
    email: string;


    @IsString()
    @IsNotEmpty()
    password: string;


    @IsString()
    @IsNotEmpty()
    full_name: string;


    @IsString()
    @IsNotEmpty()
    phone: string;


    @IsString()
    @IsNotEmpty()
    account: string;


    @IsString()
    @IsNotEmpty()
    address: string;


    @IsString()
    @IsNotEmpty()
    user_role: string;


    @IsOptional()
    user_create?: Date;

    // @ApiProperty ({ type: 'array', items: { type: 'string', format: 'binary' } })
    @IsArray()
    @IsOptional()
    user_image: any[];
}
