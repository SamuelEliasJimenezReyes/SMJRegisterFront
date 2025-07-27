import axios from 'axios';
import type { CamperDTO , CreateCamperDTO } from "../dtos/camper.dto";
import type { ICamperService } from './Icamper.service';

const baseURL = 'http://localhost:5224/camper';

export class CamperService implements ICamperService {

  async GetAllCampersAsync(): Promise<CamperDTO[]> {
    try {
      const result = await axios.get<CamperDTO[]>(baseURL);
      console.log("Fetched campers:", result.data);
      return result.data;
    } catch (error) {
      console.error("Error fetching campers:", error);
      return Promise.reject(error);
    }
  }

   async CreateCamperAsync(camper: CreateCamperDTO): Promise<void> {
    try {
      const result = await axios.post<CreateCamperDTO>(baseURL, camper);
      if (result.status === 204) {
        console.log("Camper created successfully");
      }
    } catch (error) {
      return Promise.reject(error);
    }
  }
}