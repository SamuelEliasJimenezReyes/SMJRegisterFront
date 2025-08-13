import axiosInstance from "../auth/axiosInstance.ts";
import type { ChurchDTO, ChurchSimpleDTO } from "../dtos/church.dto";
import type { ICurchService } from "./Ichurch.services";

export class ChurchService implements ICurchService {
  async GetAllChurchesAsync(): Promise<ChurchSimpleDTO[]> {
    const result = await axiosInstance.get<ChurchSimpleDTO[]>("/church");
    return result.data;
  }

  async GetChurchByIdAsync(id: number): Promise<ChurchDTO> {
    const result = await axiosInstance.get<ChurchDTO>(`/church/${id}`);
    return result.data;
  }

  async GetChurchesByConferenceAsync(conferenceId: number): Promise<ChurchSimpleDTO[]> {
    const result = await axiosInstance.get<ChurchSimpleDTO[]>(`/church/get-by-conference/${conferenceId}`);
    return result.data;
  }
}
