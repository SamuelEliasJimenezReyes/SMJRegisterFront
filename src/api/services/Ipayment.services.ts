import type { CreatePaymentDto, PaymentDto } from "../dtos/payment.dto";

export interface IPaymentService {
  getAllPaymentsAsync(): Promise<PaymentDto[]>;
  createPaymentAsync(dto: CreatePaymentDto): Promise<void>;
}
