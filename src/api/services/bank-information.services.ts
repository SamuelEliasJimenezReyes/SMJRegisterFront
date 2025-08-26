import axiosInstance from "../auth/axiosInstance.ts";
import type { BankInformationDTO } from '../dtos/bankinformation.dto';
import type { IBankInformationService } from './Ibank-information.services.ts';

export class BankInformationService implements IBankInformationService {
  async GetAllBankInformationAsync(): Promise<BankInformationDTO[]> {
    try {
      const result = await axiosInstance.get<BankInformationDTO[]>("/bank-information");
      return result.data;
    } catch (error) {
      console.error("Error fetching bank information:", error);
      return Promise.reject(error);
    }
  }

  async GetAllBankInformationByConference(conference: number): Promise<BankInformationDTO[]> {
    try {
      const result = await axiosInstance.get<BankInformationDTO[]>(`bank-information/get-by-conference/${conference}`);
      return result.data;
    } catch (error) {
      console.error(`Error fetching bank information for conference ${conference}:`, error);
      return Promise.reject(error);
    }
  }
}
