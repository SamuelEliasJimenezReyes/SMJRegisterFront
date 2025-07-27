import type { ChurchSimpleDTO } from "./church.dto";
import type { GrantedCodeDto } from "./granted-code.dto";
import type { RoomSimpleDto } from "./room.dto";

export interface CreateCamperDTO {
  name: string;
  lastName: string;
  documentNumber: string;
  paidAmount: number;
  isGrant: boolean;
  grantedAmount: number;
  isPaid: boolean;
  gender: number;
  condition: number;
  churchId: number;
  roomId?: number;
  code?: string; 
}

export interface CamperDTO {
  name: string;
  lastName: string;
  documentNumber: string;
  paidAmount: number
  isGrant: boolean;
  grantedAmount: number;
  isPaid: boolean;
  gender: number;
  condition: number;
  church: ChurchSimpleDTO;
  grantedCode?: GrantedCodeDto;
  room?: RoomSimpleDto;
}

export interface CamperDTOSimpleDto {
    name: string;
  lastName: string;
  documentNumber: string;
  paidAmount: number
  isGrant: boolean;
  grantedAmount: number;
  isPaid: boolean;
  gender: number;
  condition: number;
  church: ChurchSimpleDTO;
}

