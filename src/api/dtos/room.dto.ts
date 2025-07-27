import type {CamperDTOSimpleDto } from "./camper.dto";

export interface RoomSimpleDto {
  Id: number;
  Name: string;
  Capacity: number;
}

export interface RoomDTO {
  Id: number;
  Name: string;
  Campers: CamperDTOSimpleDto[];
}

export interface CreateRoomDTO {
  Name: string;
  Capacity: number;
}