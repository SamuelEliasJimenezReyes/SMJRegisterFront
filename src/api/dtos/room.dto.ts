import type {CamperSimpleDto } from "./camper.dto";

export interface RoomSimpleDto {
  id: number;
  name: string;
  gender: string;
  maxCapacity: number;
  currentCapacity: number;
}

export interface RoomDTO {
  id: number;
  name: string;
  gender: string;
  maxCapacity: number;
  currentCapacity: number;
  campers: CamperSimpleDto[];
}

export interface CreateRoomDTO {
  Name: string;
  gender: number;
  capacity: number;
}