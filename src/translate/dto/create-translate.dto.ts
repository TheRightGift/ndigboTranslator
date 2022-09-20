import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateTranslateDto {
    id: number;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    text: string;
}
