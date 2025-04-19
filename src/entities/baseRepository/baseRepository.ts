import { IBaseRepository } from "./IbaseRepository";

export abstract class BaseRepository<T> implements IBaseRepository<T>{
    protected model: any;
  
    constructor(model: any) {
      this.model = model;
    }
  
    async findById(id: string): Promise<T | null> {
      return this.model.findById(id).lean();
    }
  
    async findAll(): Promise<T[]> {
      return this.model.find().lean();
    }
  
    async create(data: T): Promise<T> {
      return this.model.create(data);
    }
  
    async update(id: string, data: Partial<T>): Promise<T | null> {
      return this.model.findByIdAndUpdate(id, data, { new: true }).lean();
    }
  
    async delete(id: string): Promise<boolean> {
      const result = await this.model.findByIdAndDelete(id);
      return !!result;
    }
  }
  