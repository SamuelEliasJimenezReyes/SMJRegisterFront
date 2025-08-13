import type { ChurchDTO, ChurchSimpleDTO } from '../dtos/church.dto';

export interface ICurchService {
  GetAllChurchesAsync(): Promise<ChurchSimpleDTO[]>;
  GetChurchByIdAsync(id: number): Promise<ChurchDTO>;
  GetChurchesByConferenceAsync(conferenceId: number): Promise<ChurchSimpleDTO[]>;
}
