import type { CamperDTO,CamperDTOSimpleDto,CreateCamperDTO } from "../dtos/camper.dto";

export interface ICamperService {
  GetAllCampersAsync(): Promise<CamperDTOSimpleDto[]>;
  CreateCamperAsync(camper: CreateCamperDTO): Promise<void>;
  GetCamperByIdAsync(id: number): Promise<CamperDTO>;
}