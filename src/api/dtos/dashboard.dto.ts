export interface DashboardSummaryDto {
  totalCampersPaid: number;
  totalAmountPaid: number;
  totalAmountPending: number;
}

export interface GetCampersByConferenceDto {
  conference: string;
  camperCount: number;
}

export interface GetTotalByBankDto {
  bankName: string;
  totalAmount: number;
}

export interface GetTotalCashDto {
  totalCash: number;
}
