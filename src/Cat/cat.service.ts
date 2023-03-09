import { Injectable } from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Cat} from './cat.entity';
import {Repository} from 'typeorm';

@Injectable()
export class CatService {
  constructor(
   @InjectRepository(Cat) private readonly catRepository:Repository<Cat>
  ){ }

  async create(data:any): Promise<Cat>{
    return this.catRepository.save(data);
  }

  async fetchCats():Promise<Cat[]>{
    const records=this.catRepository.find()
    return records;
  }

  async findCat(id:string){
    const record=this.catRepository.findOne({where:{id:id}});
    return record;
  }

  async deleteCat(id:string){
    const result=this.catRepository.delete(id);
    return result;
  }

  async catSearch({age_lte,age_gte} :{age_lte:number, age_gte:number}){
    const builder =this.catRepository.createQueryBuilder('cats');
    const cats=await builder.where('cats.age >= :age_lte', {age_lte:age_lte})
    .andWhere('cats.age <= :age_gte', {age_gte:age_gte})
    .getMany();
    return cats;
  }


  async updateCat({data,id}:{data:any,id:string}){
    const result=this.catRepository.update(id,{...data});
    return result;
  }
}
