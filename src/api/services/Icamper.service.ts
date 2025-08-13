import type { CamperDTO, CamperSimpleDto, CreateCamperDTO, UpdateCamperDTO } from "../dtos/camper.dto";

export interface ICamperService {
  GetAllCampersAsync(): Promise<CamperSimpleDto[]>;
  GetCamperByIdAsync(id: number): Promise<CamperDTO>;
  CreateCamperAsync(camper: CreateCamperDTO): Promise<void>;
  GetAllByConditionAsync(condition: number): Promise<CamperDTO[]>;
  GetAllByChurchIdAsync(churchId: number): Promise<CamperDTO[]>;
  GetAllByConferenceAsync(conference: number): Promise<CamperDTO[]>;
  UpdateCamperAsync(id: number, camper: UpdateCamperDTO): Promise<void>;
}
