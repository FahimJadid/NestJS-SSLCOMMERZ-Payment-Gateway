export class ResponseDto {
    tran_id: string;
    val_id: string;
    amount: string;
    card_type: string;
    store_amount: string;
    card_no: string;
    bank_tran_id: string;
    status: string;

  }
  
  export class PaymentResponseDto {
    data: ResponseDto;
    message: string;
  }
  