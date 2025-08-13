import type { CreateGrantedCodeDTO, GrantedCodeDTO } from "../dtos/granted-code.dto";

export interface IGrantedCodeService {
  getAllGrantedCodesAsync(): Promise<GrantedCodeDTO[]>;
  createGrantedCodeAsync(dto: CreateGrantedCodeDTO): Promise<GrantedCodeDTO>;
}