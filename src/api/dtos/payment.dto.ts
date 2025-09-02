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
  id: number;
  amount: number;
  evidenceURL?: string;
  coments?: string;
  isCash: boolean;
  banksInformation: BankInformationDTO;
  camper: CamperSimpleDto;
}
