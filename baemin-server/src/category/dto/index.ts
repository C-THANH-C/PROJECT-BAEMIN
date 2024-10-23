import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateCategory {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    category_name: string;
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    category_create: Date;
}
export class UpdateCategory {
    @ApiProperty()
    @IsString()
    category_name: string;
    @ApiProperty()
    @IsString()
    category_create: Date;
}