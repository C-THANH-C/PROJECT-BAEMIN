import { IsNotEmpty, IsString } from "class-validator";

export class CreateCategory {
    @IsString()
    @IsNotEmpty()
    category_name: string;
    @IsString()
    @IsNotEmpty()
    category_create: Date;
}
export class UpdateCategory {
    @IsString()
    category_name: string;
    @IsString()
    category_create: Date;
}