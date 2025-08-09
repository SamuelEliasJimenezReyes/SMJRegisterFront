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
  shirtSize: number;
  arrivedTime: string; 
  paidType: number; 
  documents: File[]; 
}
export interface CamperDTO {
  name: string;
  lastName: string;
  documentNumber: string;
  paidAmount: number;
  isGrant: boolean;
  isPaid: boolean;
  gender: string;
  condition: string;
  payType: string;
  shirtSize: string;
  arrivedTime: string;
  arrivedTimeHumanized: string;
  documentsURL?: string[];
  church: ChurchSimpleDTO;
  grantedCode?: GrantedCodeDto;
  room?: RoomSimpleDto;
}


export interface CamperDTOSimpleDto {
 id: number;
  name: string;
  lastName: string;
  documentNumber: string;
  isGrant: boolean;
  gender: string;
  condition: string;
  payType: string;
  shirtSize: string;
  arrivedTime: string;
  arrivedTimeHumanized: string;
  church: ChurchSimpleDTO;
}
export interface UpdateCamperDTO {
  name: string;
  lastName: string;
  paidAmount: number;
  isGrant: boolean;
  isPaid: boolean;
  gender: number;
  condition: number;
  payType: number;
  shirtSize: number;
  churchId: number;
  roomId?: number | null;
}
