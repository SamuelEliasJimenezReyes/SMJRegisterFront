import axios from 'axios';
import type { CamperDTO } from "../dtos/camper.dto";
import type { ICamperService } from './Icamper.service';

const baseURL = `${import.meta.env.VITE_BASE_API_URL}/camper`;
export class CamperService implements ICamperService {
  
  async GetAllCampersAsync(): Promise<CamperDTO[]> {
    try {
      const result = await axios.get<CamperDTO[]>(baseURL);
      return result.data;
    } catch (error) {
      console.error("Error fetching campers:", error);
      return Promise.reject(error);
    }
  }
}