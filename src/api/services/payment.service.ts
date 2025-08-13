import axiosInstance from "../auth/axiosInstance.ts";
import type { IPaymentService } from "./Ipayment.services.ts";
import type { CreatePaymentDto, PaymentDto } from "../dtos/payment.dto";

export class PaymentService implements IPaymentService {
  async getAllPaymentsAsync(): Promise<PaymentDto[]> {
    const result = await axiosInstance.get<PaymentDto[]>("/payments");
    return result.data;
  }

  async createPaymentAsync(dto: CreatePaymentDto): Promise<void> {
    const formData = new FormData();
    formData.append("Amount", dto.amount.toString());
    if (dto.evidence) formData.append("Evidence", dto.evidence);
    if (dto.coments) formData.append("Coments", dto.coments);
    formData.append("BanksInformationId", dto.banksInformationId.toString());
    formData.append("CamperId", dto.camperId.toString());

    await axiosInstance.post("/payments", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  }
}
