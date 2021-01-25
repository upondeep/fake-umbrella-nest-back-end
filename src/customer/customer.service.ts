import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateCustomerDTO } from './dto/create-customer.dto';
import { Customer } from './schemas/customer.schema';

@Injectable()
export class CustomerService {
  constructor(@InjectModel('Customer') private readonly customerModel: Model<Customer>) { }

  async getAllCustomer(): Promise<Customer[]> {
    const allCustomers = await this.customerModel.find().select(['-__v', '-id']);
    return allCustomers;
  }

  async getCustomer(id): Promise<Customer[]> {
    const customer = await this.customerModel.find({ _id: id });
    return customer;
  }

  async createCustomer(createCustomerDTO: CreateCustomerDTO): Promise<Customer> {
    const createdCustomer = new this.customerModel(createCustomerDTO);
    return createdCustomer.save();
  }

  async updateCustomer(
    id,
    createCustomerDTO: CreateCustomerDTO,
  ): Promise<Customer[]> {
    await this.customerModel.find({ _id: id }).update(createCustomerDTO);
    var result = await this.customerModel.find({ _id: id });
    return result;
  }

  async deleteCustomer(id): Promise<any> {
    const deletedCustomer = await this.customerModel.find({ _id: id }).remove().exec();
    return deletedCustomer;
  }
}
