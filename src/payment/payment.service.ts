import { Injectable } from '@nestjs/common';
import * as SSLCommerzPayment from 'sslcommerz-lts';
import { PaymentRequestDto } from './dto/PaymentRequestDto';

@Injectable()
export class PaymentService {
  async initiatePayment(data: PaymentRequestDto): Promise<string> {
    // Initialize SSLCommerzPayment with credentials
    const sslcommerz = new SSLCommerzPayment(
      process.env.STORE_ID,
      process.env.STORE_PASSWORD,
      false
    );

    // Transform DTO data to SSLCOMMERZ data
    const sslData = {
      total_amount: data.total_amount,
      currency: data.currency,
      tran_id: data.tran_id,
      success_url: data.success_url,
      fail_url: data.fail_url,
      cancel_url: data.cancel_url,
      ipn_url: data.ipn_url,
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


    // Initiate the payment request
    const response = await sslcommerz.init(sslData);
    if (response?.GatewayPageURL) {
      return response.GatewayPageURL;
    } else {
      throw new Error('Session was not successful');
    }
  }


  async validatePayment(data: { val_id: string }): Promise<any> {
    const sslcz = new SSLCommerzPayment(
      process.env.STORE_ID,
      process.env.STORE_PASSWORD,
      false
    );

    return sslcz.validate(data);
  }
}
