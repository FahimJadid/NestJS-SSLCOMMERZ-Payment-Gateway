import { Controller, Get, Post, Redirect, Body, Req, Res } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PaymentRequestDto } from './dto/paymentRequestDto';
import { PaymentResponseDto, ResponseDto } from './dto/paymentResponseDto';

@Controller()
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Get('/initiate-payment')
  @Redirect()
  async initiatePayment(@Body() data: PaymentRequestDto): Promise<{ url: string }> {
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