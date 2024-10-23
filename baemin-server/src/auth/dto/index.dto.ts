import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, IsOptional, IsArray } from 'class-validator';
export class LoginDto {
    email: string;
    password: string;
}
export class SignUpDto {
    @ApiProperty()
    @IsEmail()
    email: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    password: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    full_name: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    phone: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    account: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    address: string;

    @ApiProperty()
    @IsOptional()
    user_create?: Date;

    @ApiProperty({ type: 'string', format: 'binary' })
    @IsArray()
    @IsOptional()
    @IsString({ each: true })
    user_image: string[];
}
export class UpdateDto {
    @ApiProperty()
    @IsEmail()
    email: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    password: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    full_name: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    phone: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    account: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    address: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    user_role: string;

    @ApiProperty()
    @IsOptional()
    user_create?: Date; 

    // @ApiProperty ({ type: 'array', items: { type: 'string', format: 'binary' } })
    @IsArray()
    @IsOptional()
    user_image: any[];
}
