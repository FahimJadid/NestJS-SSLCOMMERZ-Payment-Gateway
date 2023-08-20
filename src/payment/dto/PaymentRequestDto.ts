import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class PaymentRequestDto {
  @IsNotEmpty()
  @IsNumber()
  total_amount: number;

  @IsNotEmpty()
  @IsString()
  currency: string;

  @IsNotEmpty()
  @IsString()
  tran_id: string;

  @IsNotEmpty()
  @IsString()
  success_url: string;

  @IsNotEmpty()
  @IsString()
  fail_url: string;

  @IsNotEmpty()
  @IsString()
  cancel_url: string;

  @IsNotEmpty()
  @IsString()
  ipn_url: string;

  @IsNotEmpty()
  @IsString()
  shipping_method: string;

  @IsNotEmpty()
  @IsString()
  product_name: string;

  @IsNotEmpty()
  @IsString()
  product_category: string;

  @IsNotEmpty()
  @IsString()
  product_profile: string;  

  @IsNotEmpty()
  @IsString()
  cus_name: string;

  @IsNotEmpty()
  @IsString()
  cus_email: string;

  @IsNotEmpty()
  @IsString()
  cus_add1: string;

  @IsNotEmpty()
  @IsString()
  cus_add2: string;

  @IsNotEmpty()
  @IsString()
  cus_city: string;

  @IsNotEmpty()
  @IsString()
  cus_state: string;

  @IsNotEmpty()
  @IsString()
  cus_postcode: string;

  @IsNotEmpty()
  @IsString()
  cus_country: string;

  @IsNotEmpty()
  @IsString()
  cus_phone: string;

  @IsNotEmpty()
  @IsString()
  cus_fax: string;

  @IsNotEmpty()
  @IsString()
  multi_card_name: string;

  @IsNotEmpty()
  @IsString()
  value_a: string;

  @IsNotEmpty()
  @IsString()
  value_b: string;

  @IsNotEmpty()
  @IsString()
  value_c: string;

  @IsNotEmpty()
  @IsString()
  value_d: string;

}
