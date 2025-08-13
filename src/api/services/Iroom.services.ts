import type { RoomSimpleDto, RoomDTO, CreateRoomDTO } from "../dtos/room.dto";

export interface IRoomService {
  GetAllRoomsAsync(): Promise<RoomSimpleDto[]>;
  GetRoomByIdAsync(id: number): Promise<RoomDTO>;
  CreateRoomAsync(room: CreateRoomDTO): Promise<void>;
  SortByChurchIdAsync(churchId: number): Promise<void>;
  SortByCamperIdAsync(camperId: number): Promise<void>;
}
