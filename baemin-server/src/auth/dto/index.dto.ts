import { user_role } from '@prisma/client';
import { IsEmail, IsNotEmpty, IsString, IsOptional } from 'class-validator';
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
}
export class PatchDto {
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
}
