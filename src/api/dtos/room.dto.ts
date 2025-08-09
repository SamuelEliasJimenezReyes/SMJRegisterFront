import type {CamperDTOSimpleDto } from "./camper.dto";

export interface RoomSimpleDto {
  id: number;
  name: string;
  MaxCapacity: number;
  CurrentCapacity: number;
}

export interface RoomDTO {
  id: number;
  name: string;
  maxCapacity: number;
  currentCapacity: number;
  Campers: CamperDTOSimpleDto[];
}

export interface CreateRoomDTO {
  Name: string;
  Capacity: number;
}