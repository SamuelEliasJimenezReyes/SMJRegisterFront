import axiosInstance from "../auth/axiosInstance.ts";
import type { RoomSimpleDto, RoomDTO, CreateRoomDTO } from "../dtos/room.dto";
import type { IRoomService } from "./Iroom.services";

export class RoomService implements IRoomService {
  async GetAllRoomsAsync(): Promise<RoomSimpleDto[]> {
    const result = await axiosInstance.get<RoomSimpleDto[]>("/room");
    return result.data;
  }

  async GetRoomByIdAsync(id: number): Promise<RoomDTO> {
    const result = await axiosInstance.get<RoomDTO>(`/room/${id}`);
    return result.data;
  }

  async CreateRoomAsync(room: CreateRoomDTO): Promise<void> {
    await axiosInstance.post("/room", room);
  }

  async SortByChurchIdAsync(churchId: number): Promise<void> {
    await axiosInstance.post(`/room/automatic-sorter-by-churchId/${churchId}`);
  }

  async SortByCamperIdAsync(camperId: number): Promise<void> {
    await axiosInstance.post(`/room/automatic-sorter-by-camperId/${camperId}`);
  }
}
