import axios from 'axios';
import type { CamperDTO , CamperDTOSimpleDto, CreateCamperDTO } from "../dtos/camper.dto";
import type { ICamperService } from './Icamper.service';

const baseURL = 'http://localhost:5224/camper';

export class CamperService implements ICamperService {

  async GetAllCampersAsync(): Promise<CamperDTOSimpleDto[]> {
    try {
      const result = await axios.get<CamperDTOSimpleDto[]>(baseURL);
      console.log("Fetched campers:", result.data);
      return result.data;
    } catch (error) {
      console.error("Error fetching campers:", error);
      return Promise.reject(error);
    }
  }

  async GetCamperByIdAsync(id: number): Promise<CamperDTO> {
    try {
      const result = await axios.get<CamperDTO>(`${baseURL}/${id}`);
      console.log("Fetched camper by ID:", result.data);
      return result.data;
    } catch (error) {
      console.log(`Error fetching camper with ID ${id}:`, error);
      return Promise.reject(`Error fetching camper with ID ${id}: ${error}`);
    }
  }


async CreateCamperAsync(camper: CreateCamperDTO): Promise<void> {
  try {
    const formData = new FormData();

    formData.append('Name', camper.name);
    formData.append('LastName', camper.lastName);
    formData.append('DocumentNumber', camper.documentNumber);
    formData.append('PaidAmount', camper.paidAmount.toString());
    formData.append('IsGrant', camper.isGrant.toString());
    formData.append('GrantedAmount', camper.grantedAmount.toString());
    formData.append('IsPaid', camper.isPaid.toString());
    formData.append('Gender', camper.gender.toString());
    formData.append('Condition', camper.condition.toString());
    formData.append('ChurchId', camper.churchId.toString());
    formData.append('PaidType', camper.paidType.toString());


    if (camper.roomId !== null && camper.roomId !== undefined) {
      formData.append('RoomId', camper.roomId.toString());
    }

    if (camper.code) {
      formData.append('Code', camper.code);
    }


    camper.documents.forEach((file: File, index: number) => {
      formData.append('Documents', file);
    });

    const result = await axios.post(baseURL, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    if (result.status === 201 || result.status === 204) {
      console.log("Camper created successfully");
    }
  } catch (error) {
    console.error("Error creating camper:", error);
    return Promise.reject(error);
  }
}

}