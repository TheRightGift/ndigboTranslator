import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { OgimageService } from './ogimage.service';
import { CreateOgimageDto } from './dto/create-ogimage.dto';
import { UpdateOgimageDto } from './dto/update-ogimage.dto';

@Controller('ogimage')
export class OgimageController {
  constructor(private readonly ogimageService: OgimageService) {}

  @Post()
  create(@Body() createOgimageDto: CreateOgimageDto) {
    return this.ogimageService.create(createOgimageDto);
  }

  // http://[::1]:3000/ogimage/make/11
  @Get('make/:postId')
  make(@Param('postId') postId: string) {
    return this.ogimageService.makeOgImage(+postId);
  }

  @Get()
  findAll() {
    return this.ogimageService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ogimageService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOgimageDto: UpdateOgimageDto) {
    return this.ogimageService.update(+id, updateOgimageDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ogimageService.remove(+id);
  }
}
