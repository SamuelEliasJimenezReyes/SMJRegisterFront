import type { CamperDTO } from "./camper.dto";

export interface CreateGrantedCodeDTO {
  grantAmount: number;
  isUsed: boolean;
}

export interface GrantedCodeDTO {
  code: string;
  grantAmount: number;
  isUsed: boolean;
  camper: CamperDTO;
}

export interface GrantedCodeSimpleDTO {
  code: string;
  grantAmount: number;
  isUsed: boolean;
}
export interface GrantedCodeDto {
  code: string;
  grantAmount: number;
  isUsed: boolean;
}