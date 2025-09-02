import axiosInstance from "../auth/axiosInstance";
import type { 
  DashboardSummaryDto, 
  GetCampersByConferenceDto, 
  GetTotalByBankDto, 
  GetTotalCashDto 
} from "../dtos/dashboard.dto";
import type { IDashboardService } from "./Idashboard.services";

export class DashboardService implements IDashboardService {
  async GetSummaryAsync(): Promise<DashboardSummaryDto> {
    const result = await axiosInstance.get<DashboardSummaryDto>("/dashboard/summary");
    return result.data;
  }        

  async GetCampersByConferenceAsync(): Promise<GetCampersByConferenceDto[]> {
    const result = await axiosInstance.get<GetCampersByConferenceDto[]>("/dashboard/campers");
    return result.data;
  }

  async GetTotalByBankAsync(): Promise<GetTotalByBankDto[]> {
    const result = await axiosInstance.get<GetTotalByBankDto[]>("/dashboard/banks");
    return result.data;
  }

  async GetTotalCashAsync(): Promise<GetTotalCashDto> {
    const result = await axiosInstance.get<GetTotalCashDto>("/dashboard/cash");
    return result.data;
  }
}
