import axiosInstance from "../auth/axiosInstance";
import type { IGrantedCodeService } from "./IgrantedCode.service";
import type { CreateGrantedCodeDTO, GrantedCodeDTO } from "../dtos/granted-code.dto";

export class GrantedCodeService implements IGrantedCodeService {
  async getAllGrantedCodesAsync(): Promise<GrantedCodeDTO[]> {
    const response = await axiosInstance.get<GrantedCodeDTO[]>("/grantedCode");
    return response.data;
  }

  async createGrantedCodeAsync(dto: CreateGrantedCodeDTO): Promise<GrantedCodeDTO> {
    const response = await axiosInstance.post<GrantedCodeDTO>("/grantedCode", dto, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  }
}