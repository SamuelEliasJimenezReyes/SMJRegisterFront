import type { 
  DashboardSummaryDto, 
  GetCampersByConferenceDto, 
  GetTotalByBankDto, 
  GetTotalCashDto 
} from "../dtos/dashboard.dto";

export interface IDashboardService {
  GetSummaryAsync(): Promise<DashboardSummaryDto>;
  GetCampersByConferenceAsync(): Promise<GetCampersByConferenceDto[]>;
  GetTotalByBankAsync(): Promise<GetTotalByBankDto[]>;
  GetTotalCashAsync(): Promise<GetTotalCashDto>;
}
