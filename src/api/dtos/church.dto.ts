import type { CamperDTO } from "./camper.dto";

export interface ChurchSimpleDTO {
  id : number;
  name : string;
  conference : string;
}

export interface ChurchDTO {
  id : number;
  name : string;
  conference : string;
  campers : CamperDTO[];
}