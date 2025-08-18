import axios from 'axios';
import type { BankInformationDTO } from '../dtos/bankinformation.dto';
import type { IBankInformationService } from './Ibank-information.services.ts';

const baseURL = 'https://smjregisterapiv2-dev.up.railway.app/bank-information';

export class BankInformationService implements IBankInformationService {
  async GetAllBankInformationAsync(): Promise<BankInformationDTO[]> {
    try {
      const result = await axios.get<BankInformationDTO[]>(baseURL);
      return result.data;
    } catch (error) {
      console.error("Error fetching bank information:", error);
      return Promise.reject(error);
    }
  }

  async GetAllBankInformationByConference(conference: number): Promise<BankInformationDTO[]> {
    try {
      const result = await axios.get<BankInformationDTO[]>(`${baseURL}/get-by-conference/${conference}`);
      return result.data;
    } catch (error) {
      console.error(`Error fetching bank information for conference ${conference}:`, error);
      return Promise.reject(error);
    }
  }
}
