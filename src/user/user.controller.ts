import { Body, Controller, Post } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { User } from './user.schema';
import { UserService } from './user.service';
import { CreateUserDto } from './user.dto';
import { PaymentRequestDto } from 'src/payment/dto/paymentRequestDto';
import { PaymentService } from 'src/payment/payment.service'

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly paymentService: PaymentService 
    ) {}

  @Post('/signup')
  async createUser(@Body() createUserDto: CreateUserDto): Promise<User> {
    const saltOrRounds = 10;
    const hashedPassword = await bcrypt.hash(createUserDto.password, saltOrRounds);
    const user: CreateUserDto = { ...createUserDto, password: hashedPassword };

    const result = await this.userService.createUser(user);
    return result;
  }

  @Post('/make-payment')
  async makePayment(@Body() userData: PaymentRequestDto): Promise<{ url: string }> {
    const gatewayPageURL = await this.paymentService.initiatePayment(userData);
    return { url: gatewayPageURL };
  }
}
