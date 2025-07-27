import type { ChurchSimpleDTO } from '../dtos/church.dto';

export interface ICurchService {
  GetAllChurchesAsync(): Promise<ChurchSimpleDTO[]>;
}
