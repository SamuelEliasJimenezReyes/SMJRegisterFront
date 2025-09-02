import React, { useEffect, useState } from "react";
import { DashboardService } from "../../../api/services/dashboard.service";
import type { DashboardSummaryDto } from "../../../api/dtos/dashboard.dto";

const dashboardService = new DashboardService();

const formatMoney = (amount: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'DOP',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(amount);
};

const DashboardSummary: React.FC = () => {
  const [summary, setSummary] = useState<DashboardSummaryDto | null>(null);

  useEffect(() => {
    dashboardService.GetSummaryAsync().then(setSummary);
  }, []);

  if (!summary) return <p>Cargando...</p>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="card bg-base-200 shadow-md p-4">
        <h2 className="font-bold text-lg">Campistas Pagados</h2>
        <p className="text-2xl">{summary.totalCampersPaid}</p>
      </div>
      <div className="card bg-base-200 shadow-md p-4">
        <h2 className="font-bold text-lg">Total Pagado</h2>
        <p className="text-2xl">{formatMoney(summary.totalAmountPaid)}</p>
      </div>
      <div className="card bg-base-200 shadow-md p-4">
        <h2 className="font-bold text-lg">Total Pendiente</h2>
        <p className="text-2xl">{formatMoney(summary.totalAmountPending)}</p>
      </div>
    </div>
  );
};

export default DashboardSummary;