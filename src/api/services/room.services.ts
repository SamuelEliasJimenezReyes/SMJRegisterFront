import axios from "axios";
import type { RoomSimpleDto, RoomDTO, CreateRoomDTO } from "../dtos/room.dto";
import type { IRoomService } from "./Iroom.services";

const baseURL = 'http://localhost:5224/room';

export class RoomService implements IRoomService {
  async GetAllRoomsAsync(): Promise<RoomSimpleDto[]> {
    try {
      const result = await axios.get<RoomSimpleDto[]>(baseURL);
      console.log("Fetched rooms:", result.data);
      return result.data;
    } catch (error) {
      console.error("Error fetching rooms:", error);
      return Promise.reject("Error fetching rooms: " + error);
    }
  }

  async GetRoomByIdAsync(id: number): Promise<RoomDTO> {
    try {
      const result = await axios.get<RoomDTO>(`${baseURL}/${id}`);
      console.log("Fetched room by ID:", result.data);
      return result.data;
    } catch (error) {
      console.error(`Error fetching room with ID ${id}:`, error);
      return Promise.reject(`Error fetching room with ID ${id}: ${error}`);
    }
  }

  async CreateRoomAsync(room: CreateRoomDTO): Promise<void> {
    try {
      await axios.post(`${baseURL}`, room);
      console.log("Room created successfully");
    } catch (error) {
      console.error("Error creating room:", error);
      return Promise.reject("Error creating room: " + error);
    }
  }

  async SortByChurchIdAsync(churchId: number): Promise<void> {
    try {
      await axios.post(`${baseURL}/automatic-sorter-by-churchId/${churchId}`);
      console.log("Automatic sort by church ID successful");
    } catch (error) {
      console.error(`Error sorting rooms by church ID ${churchId}:`, error);
      return Promise.reject(`Error sorting rooms by church ID ${churchId}: ${error}`);
    }
  }

  async SortByCamperIdAsync(camperId: number): Promise<void> {
    try {
      await axios.post(`${baseURL}/automatic-sorter-by-camperId/${camperId}`);
      console.log("Automatic sort by camper ID successful");
    } catch (error) {
      console.error(`Error sorting rooms by camper ID ${camperId}:`, error);
      return Promise.reject(`Error sorting rooms by camper ID ${camperId}: ${error}`);
    }
  }
}