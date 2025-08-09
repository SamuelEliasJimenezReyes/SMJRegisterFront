import type { BankInformationDTO } from "../dtos/bankinformation.dto";

export interface IBankInformationService {
  GetAllBankInformationAsync(): Promise<BankInformationDTO[]>;
  GetAllBankInformationByConference(conference : number): Promise<BankInformationDTO[]>;
}