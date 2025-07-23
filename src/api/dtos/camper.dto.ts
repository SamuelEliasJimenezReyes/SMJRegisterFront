import type { ChurchDTO } from "./church.dto";
import type { GrantedCodeDto } from "./grantedCode.dto";
import type { RoomDto } from "./room.dto";

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
  church: ChurchDTO;
  grantedCode?: GrantedCodeDto;
  room?: RoomDto;
}

