import type { BankInformationDTO } from "./bankinformation.dto.ts";
import type { CamperSimpleDto } from "./camper.dto";

export interface CreatePaymentDto {
  amount: number;
  evidence?: File;
  coments?: string;
  isCash: boolean;
  banksInformationId?: number;
  camperId: number;
}

export interface PaymentDto {
  amount: number;
  evidenceURL?: string;
  coments?: string;
  banksInformation: BankInformationDTO;
  camper: CamperSimpleDto;
}
