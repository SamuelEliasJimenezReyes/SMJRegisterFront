import axiosInstance from "../auth/axiosInstance.ts";
import type { CamperDTO, CamperSimpleDto, CreateCamperDTO, UpdateCamperDTO } from "../dtos/camper.dto";
import type { ICamperService } from "./Icamper.service.ts";

export class CamperService implements ICamperService {
  async GetAllCampersAsync(): Promise<CamperSimpleDto[]> {
    const result = await axiosInstance.get<CamperSimpleDto[]>("/camper");
    return result.data;
  }

  async GetCamperByIdAsync(id: number): Promise<CamperDTO> {
    const result = await axiosInstance.get<CamperDTO>(`/camper/${id}`);
    return result.data;
  }

    async CreateCamperAsync(camper: CreateCamperDTO): Promise<void> {
      const formData = new FormData();
        Object.entries(camper).forEach(([key, value]) => {
        if (key === 'documents' && Array.isArray(value)) {
          value.forEach((file: File) => {
            formData.append('documents', file);
          });
        } else if (value !== undefined && value !== null) {
          formData.append(key, value instanceof Blob ? value : String(value));
        }
      });

  await axiosInstance.post("/camper", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}

  async GetAllByConditionAsync(condition: number): Promise<CamperDTO[]> {
    const result = await axiosInstance.get<CamperDTO[]>(`/camper/get-by-condition${condition}`);
    return result.data;
  }

  async GetAllByChurchIdAsync(churchId: number): Promise<CamperDTO[]> {
    const result = await axiosInstance.get<CamperDTO[]>(`/camper/get-by-church/${churchId}`);
    return result.data;
  }

  async GetAllByConferenceAsync(conference: number): Promise<CamperDTO[]> {
    const result = await axiosInstance.get<CamperDTO[]>(`/camper/get-by-conference/${conference}`);
    return result.data;
  }

  async UpdateCamperAsync(id: number, camper: UpdateCamperDTO): Promise<void> {
    await axiosInstance.put(`/camper/${id}`, camper);
  }
}
