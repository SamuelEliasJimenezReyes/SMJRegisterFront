import type { CamperDTO } from "../dtos/camper.dto";

export interface ICamperService {
  GetAllCampersAsync(): Promise<CamperDTO[]>;
}