import {  Controller, Get } from '@nestjs/common';
import { Body, Delete, Param, Patch, Post, Query, UseGuards } from '@nestjs/common/decorators';
import { CatService} from './cat.service';
import { AuthGuard } from 'src/gaurds/auth.gaurd';
import { createCat ,updateCatSchema} from 'src/joi-schema/schema';
import { BadRequestException } from '@nestjs/common/exceptions';

@Controller()
export class CatController {
  constructor(
    private readonly catService: CatService,
  ) {}

  
  @Get("cats")
  async getCats(){
    return this.catService.fetchCats()
  }

  @UseGuards(AuthGuard)
  @Post('cats')
  async addCats(
    @Body('name') name:string,
    @Body('breed') breed:string,
    @Body('age') age:number
  ){

    const {error}= createCat.validate({name,breed,age})

    if(error){
      throw new BadRequestException(error);
    }

    return this.catService.create({name,age,breed});
  }

  @Get('cats/:id')
  async getCat(@Param('id') id: string){
    return this.catService.findCat(id);
  }

  @UseGuards(AuthGuard)
  @Delete("cats/:id")
  async deleteCat(@Param('id') id:string){
    return this.catService.deleteCat(id);
  }

  @Get('search')
  async catSearch(
    @Query('age_lte') age_lte:number,
    @Query('age_gte') age_gte:number
  ){
    return this.catService.catSearch({age_lte,age_gte});
  }


  @UseGuards(AuthGuard)
  @Patch('cats/:id')
  async updateCat(
    @Param('id') id:string,
    @Body() data:any
  ){
    const {error}= updateCatSchema.validate({...data})

    if(error){
      throw new BadRequestException(error);
    }
    return this.catService.updateCat({data,id});
  }
}
