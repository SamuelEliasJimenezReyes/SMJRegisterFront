import type { CamperDTO,CreateCamperDTO } from "../dtos/camper.dto";

export interface ICamperService {
  GetAllCampersAsync(): Promise<CamperDTO[]>;
  CreateCamperAsync(camper: CreateCamperDTO): Promise<void>;
}