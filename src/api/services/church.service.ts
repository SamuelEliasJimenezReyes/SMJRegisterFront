import axios from "axios";
import type { ChurchSimpleDTO } from "../dtos/church.dto";
import type { ICurchService } from "./Ichurch.services";


const baseURL =  'http://localhost:5224/church';
export class ChurchService implements ICurchService {
  async GetAllChurchesAsync(): Promise<ChurchSimpleDTO[]> {
    try {
      const result = await axios.get<ChurchSimpleDTO[]>(baseURL);
      console.log("Fetched churches:", result.data);
      return result.data;
    } catch (error) {
      console.error("Error fetching churches:", error);
      return Promise.reject(error);
    }
  }
}