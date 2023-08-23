import { Controller, Get, Post, Redirect, Body, Req, Res } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PaymentRequestDto } from './dto/paymentRequestDto';
import { PaymentResponseDto, ResponseDto } from './dto/paymentResponseDto';
import { v4 as uuidv4 } from 'uuid';

@Controller()
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  // @Get()
  // getWelcomeMessage(): { message: string; url: string } {
  //   return {
  //     message: 'Welcome to sslcommerz app',
  //     url: `${process.env.ROOT}/ssl-request`,
  //   };
  // }

  @Get('/ssl-request')
  @Redirect()
  async initiatePayment(): Promise<{ url: string }> {
    const data: PaymentRequestDto = {
      total_amount: 100,
      currency: 'BDT',
      tran_id: uuidv4(),
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

  @Post('/validate')
  async validatePayment(
    @Req() req: any,
    @Res() res: any,
  ): Promise<void> {
    try {
      const { val_id } = req.query;

      if (!val_id) {
        return res.status(400).json({
          message: 'Validation failed: Missing val_id in query parameters',
        });
      }

      const data = {
        val_id: val_id.toString(),
      };

      // Validate the payment using the PaymentService
      const validationResponse = await this.paymentService.validatePayment(data);

      // Process the validation response as needed
      // For example, update the order status based on validation response

      // Respond with a validation acknowledgement
      res.status(200).json({
        message: 'Payment validation successful',
        data: validationResponse,
      });
    } catch (error) {
      console.error('Payment validation callback error:', error);
      res.status(500).json({ message: 'Error processing payment validation callback' });
    }
  }
  
  
  @Post('/ssl-payment-success')
  async paymentSuccess(@Body() data: ResponseDto): Promise<PaymentResponseDto> {
    try {
      const response = await this.paymentService.handlePaymentSuccess(data);
      return response;
    } catch (error) {
      return {
        data,
        message: 'Failed to process payment success',
      };
    }
  }

  @Post('/ssl-payment-fail')
  async paymentFail(@Body() data: ResponseDto): Promise<PaymentResponseDto> {
    try {
      const response = await this.paymentService.handlePaymentFailure(data);
      return response;
    } catch (error) {
      return {
        data,
        message: 'Failed to process payment failure',
      };
    }
  }

  @Post('/ssl-payment-cancel')
  async paymentCancel(@Body() data: ResponseDto): Promise<PaymentResponseDto> {
    try {
      const response = await this.paymentService.handlePaymentCancellation(data);
      return response;
    } catch (error) {
      return {
        data,
        message: 'Failed to process payment cancellation',
      };
    }
  }

  @Post('/ssl-payment-ipn')
  async paymentIPN(@Body() data: ResponseDto): Promise<PaymentResponseDto> {
    try {
      const response = await this.paymentService.handleIPNValidation(data);
      return response;
    } catch (error) {
      return {
        data,
        message: 'Failed to process IPN validation',
      };
    }
  }
}