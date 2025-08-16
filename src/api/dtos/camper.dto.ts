import type { ChurchSimpleDTO } from "./church.dto";
import type { GrantedCodeSimpleDTO } from "./granted-code.dto.ts";
import type { RoomSimpleDto } from "./room.dto";

export interface CreateCamperDTO {
  name: string;
  lastName: string;
  phoneNumber: string;
  coments: string;
  age?: number;
  paidAmount: number;
  isGrant: boolean;
  grantedAmount: number;
  isPaid: boolean;
  document?: File;
  gender: number;
  condition: number;
  payType: number;
  shirtSize: number;
  arrivedTimeSlot: number;
  churchId: number;
  roomId?: number;
  code?: string;
}

export interface CamperDTO {
  name: string;
  lastName: string;
  phoneNumber: string;
  age: number;
  coments: string;
  paidAmount: number;
  isGrant: boolean;
  isPaid: boolean;
  gender: string;
  condition: string;
  payType: string;
  shirtSize: string;
  arrivedTimeSlot: string;
  documentsURL?: string;
  church: ChurchSimpleDTO;
  grantedCode?: GrantedCodeSimpleDTO; 
  room?: RoomSimpleDto;
}

export interface CamperSimpleDto {
  id: number;
  name: string;
  lastName: string;
  phoneNumber: string;
  isGrant: boolean;
  gender: string;
  condition: string;
  payType: string;
  shirtSize: string;
  arrivedTimeSlot: string;
  church: ChurchSimpleDTO;
}

export interface UpdateCamperDTO {
  name: string;
  lastName: string;
  age: number;
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