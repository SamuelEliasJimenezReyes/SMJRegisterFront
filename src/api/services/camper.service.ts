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

  formData.append("name", camper.name);
  formData.append("lastName", camper.lastName);
  formData.append("phoneNumber", camper.phoneNumber);
  formData.append("coments", camper.coments ?? "");

  formData.append("age", camper.age.toString());
  formData.append("paidAmount", camper.paidAmount.toString());
  formData.append("isGrant", camper.isGrant ? "true" : "false");
  formData.append("grantedAmount", camper.grantedAmount.toString());
  formData.append("isPaid", camper.isPaid ? "true" : "false");

  formData.append("gender", camper.gender.toString());
  formData.append("condition", camper.condition.toString());
  formData.append("payType", camper.payType.toString());
  formData.append("shirtSize", camper.shirtSize.toString());
  formData.append("arrivedTimeSlot", camper.arrivedTimeSlot.toString());
  formData.append("churchId", camper.churchId.toString());

  if (camper.roomId !== undefined && camper.roomId !== null) {
    formData.append("roomId", camper.roomId.toString());
  }
  if (camper.code) {
    formData.append("code", camper.code);
  }
  if (camper.document) {
    formData.append("document", camper.document, camper.document.name);
  }

  await axiosInstance.post("/camper", formData, {
    headers: { "Content-Type": "multipart/form-data" },
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
    
    async SearchCampersAsync(filter?: string): Promise<CamperSimpleDto[]> {
      const result = await axiosInstance.get<CamperSimpleDto[]>("/camper/search", {
        params: { filter },
      });
      return result.data;
    }
  }
