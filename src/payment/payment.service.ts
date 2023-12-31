import { Injectable } from '@nestjs/common';
import * as SSLCommerzPayment from 'sslcommerz-lts';
import { PaymentRequestDto } from './dto/paymentRequestDto';
import { PaymentResponseDto, ResponseDto  } from './dto/paymentResponseDto';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class PaymentService {

  private sslcommerz: SSLCommerzPayment;

  constructor() {
    this.sslcommerz = new SSLCommerzPayment(
      process.env.STORE_ID,
      process.env.STORE_PASSWORD,
      false
    );
  }

  async initiatePayment(data: PaymentRequestDto): Promise<string> {

    const sslData = {
      total_amount: data.total_amount,
      currency: data.currency,
      tran_id: data.tran_id + uuidv4(),
      success_url: `${process.env.ROOT}/ssl-payment-success`,
      fail_url: `${process.env.ROOT}/ssl-payment-fail`,
      cancel_url: `${process.env.ROOT}/ssl-payment-cancel`,
      ipn_url: `${process.env.ROOT}/ssl-payment-ipn`,
      shipping_method: data.shipping_method,
      product_name: data.product_name,
      product_category: data.product_category,
      product_profile: data.product_profile,
      cus_name: data.cus_name,
      cus_email: data.cus_email,
      cus_add1: data.cus_add1,
      cus_add2: data.cus_add2,
      cus_city: data.cus_city,
      cus_state: data.cus_state,
      cus_postcode: data.cus_postcode,
      cus_country: data.cus_country,
      cus_phone: data.cus_phone,
      cus_fax: data.cus_fax,
      multi_card_name: data.multi_card_name,
      value_a: data.value_a,
      value_b: data.value_b,
      value_c: data.value_c,
      value_d: data.value_d,
    };


    const response = await this.sslcommerz.init(sslData);
    console.log('SSLCommerz Response:', response);
    
    if (response?.GatewayPageURL) {
      return response.GatewayPageURL;
    } else {
      throw new Error('Session was not successful');
    }
  }


  async validatePayment(data: { val_id: string }): Promise<any> {
    try {
      const validationResponse = await this.sslcommerz.validate(data);
      return validationResponse;
    } catch (error) {
      console.error('Payment validation error:', error);
      throw new Error('Error validating payment');
    }
  }

  async handlePaymentSuccess(data: ResponseDto): Promise<PaymentResponseDto> {
    const response: PaymentResponseDto = {
      data,
      message: 'Payment success',
    };
    return response;
  }

  async handlePaymentFailure(data: ResponseDto): Promise<PaymentResponseDto> {
    const response: PaymentResponseDto = {
      data,
      message: 'Payment failed',
    };
    return response;
  }

  async handlePaymentCancellation(data: ResponseDto): Promise<PaymentResponseDto> {
    const response: PaymentResponseDto = {
      data,
      message: 'Payment cancelled',
    };
    return response;
  }

  async handleIPNValidation(data: ResponseDto): Promise<PaymentResponseDto> {
    const response: PaymentResponseDto = {
      data,
      message: 'IPN validated',
    };
    return response;
  }
}