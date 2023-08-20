import { Controller, Get, Post, Redirect, Body, Req, Res } from '@nestjs/common';
import { PaymentService } from './payment.service';
import * as SSLCommerzPayment from 'sslcommerz-lts';
import { PaymentRequestDto } from './dto/PaymentRequestDto';

@Controller()
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Get()
  getWelcomeMessage(): { message: string; url: string } {
    return {
      message: 'Welcome to sslcommerz app',
      url: `${process.env.ROOT}/ssl-request`,
    };
  }

  @Get('/ssl-request')
  @Redirect()
  async initiatePayment(): Promise<{ url: string }> {
    const data: PaymentRequestDto = {
      total_amount: 100,
      currency: 'BDT',
      tran_id: 'REF123',
      success_url: `${process.env.ROOT}/ssl-payment-success`,
      fail_url: `${process.env.ROOT}/ssl-payment-fail`,
      cancel_url: `${process.env.ROOT}/ssl-payment-cancel`,
      ipn_url: `${process.env.ROOT}/ssl-payment-notification`,
      shipping_method: 'No',
      product_name: 'Computer.',
      product_category: 'Electronic',
      product_profile: 'general',
      cus_name: 'Customer Name',
      cus_email: 'cust@yahoo.com',
      cus_add1: 'Dhaka',
      cus_add2: 'Dhaka',
      cus_city: 'Dhaka',
      cus_state: 'Dhaka',
      cus_postcode: '1000',
      cus_country: 'Bangladesh',
      cus_phone: '01711111111',
      cus_fax: '01711111111',
      multi_card_name: 'mastercard',
      value_a: 'ref001_A',
      value_b: 'ref002_B',
      value_c: 'ref003_C',
      value_d: 'ref004_D',
    };

    const gatewayPageURL = await this.paymentService.initiatePayment(data);
    return { url: gatewayPageURL };
  }

  @Get('/validate')
  async validatePayment(@Req() req: any, @Res() res: any): Promise<void> {
    const { val_id } = req.query; // Extracting val_id from the query parameters

    if (!val_id) {
      return res.status(400).json({
        message: 'Validation failed: Missing val_id in query parameters',
      });
    }

    const data = {
      val_id: val_id.toString(), // Converting val_id to a string
    };

    const sslcz = new SSLCommerzPayment(
      process.env.STORE_ID,
      process.env.STORE_PASSWORD,
      false
    );

    sslcz.validate(data).then(validationResponse => {
      return res.status(200).json({
        message: 'Payment validation successful',
        data: validationResponse,
      });
    });
  }

  
  
  @Post('/ssl-payment-notification')
  async paymentNotification(@Body() notificationData: any): Promise<{ data: any; message: string }> {
    return {
      data: notificationData,
      message: 'Payment notification',
    };
  }

  @Post('/ssl-payment-success')
  async paymentSuccess(@Req() req: any): Promise<{ data: any; message: string }> {

    return {
      data: req.body,
      message: 'Payment success',
    };
  }

  @Post('/ssl-payment-fail')
  async paymentFail(@Req() req: any): Promise<{ data: any; message: string }> {

    return {
      data: req.body,
      message: 'Payment failed',
    };
  }

  @Post('/ssl-payment-cancel')
  async paymentCancel(@Req() req: any): Promise<{ data: any; message: string }> {
    return {
      data: req.body,
      message: 'Payment cancelled',
    };
  }

  @Post('/ssl-payment-ipn')
  async paymentValidate(@Req() req: any): Promise<{ data: any; message: string }> {
    return {
      data: req.body,
      message: 'Payment Validated',
    };
  }
}