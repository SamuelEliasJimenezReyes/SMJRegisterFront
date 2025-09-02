import React, { useEffect, useState } from "react";
import { DashboardService } from "../../../api/services/dashboard.service";
import type { GetTotalCashDto } from "../../../api/dtos/dashboard.dto";

const dashboardService = new DashboardService();

const formatMoney = (amount: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'DOP',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(amount);
};

const CashCard: React.FC = () => {
  const [cash, setCash] = useState<GetTotalCashDto | null>(null);

  useEffect(() => {
    dashboardService.GetTotalCashAsync().then(setCash);
  }, []);

  if (!cash) return <p>Cargando...</p>;

  return (
    <div className="card bg-base-200 shadow-md p-4">
      <h2 className="font-bold text-lg">Efectivo Total</h2>
      <p className="text-3xl">{formatMoney(cash.totalCash)}</p>
    </div>
  );
};

export default CashCard;
