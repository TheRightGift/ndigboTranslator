import { PartialType } from '@nestjs/swagger';
import { CreateOgimageDto } from './create-ogimage.dto';

export class UpdateOgimageDto extends PartialType(CreateOgimageDto) {}
