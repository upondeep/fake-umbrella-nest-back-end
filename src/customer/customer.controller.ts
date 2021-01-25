import { Controller, Get, Res, HttpStatus, Post, Body, Put, Delete, Param } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CreateCustomerDTO } from './dto/create-customer.dto';

@Controller('customers')
export class CustomerController {
  constructor(private customerService: CustomerService) { }

  @Get()
  async getAllCustomer(@Res() res) {
    const customers = await this.customerService.getAllCustomer();
    return res.status(HttpStatus.OK).send(customers);
  }

  @Get('/:id')
  async getCustomer(@Res() res, @Param('id') id) {
    const customer = await this.customerService.getCustomer(id);
    if (!customer) return res.status(HttpStatus.NOT_FOUND).send({ status: 'no record found.' });
    return res.status(HttpStatus.OK).send(customer);
  }


  @Post()
  async createCustomer(@Res() res, @Body() createCustomerDTO: CreateCustomerDTO) {
    const createdCustomer = await this.customerService.createCustomer(createCustomerDTO);
    return res.status(HttpStatus.OK).send(createdCustomer);
  }

  @Delete('/:id')
  async deleteCustomer(@Res() res, @Param('id') id) {
    const customer = await this.customerService.deleteCustomer(id);
    if (!customer) return res.status(HttpStatus.NOT_FOUND).send({ status: 'delete failed.' });
    return res.status(HttpStatus.OK).send({ status: 'deleted.' });
  }

  @Put()
  async updateCustomer(
    @Res() res,
    @Body() createCustomerDTO: CreateCustomerDTO,
  ) {
    console.log('Request:', createCustomerDTO);
    let id = createCustomerDTO['customer_id'];
    const updatedCustomer = await this.customerService.updateCustomer(
      id,
      createCustomerDTO,
    );
    if (!updatedCustomer) return res.status(HttpStatus.NOT_MODIFIED).send({ status: 'update failed.' });
    return res.status(HttpStatus.CREATED).send({
      status: 'created',
      customer: updatedCustomer,
    });
  }
}
