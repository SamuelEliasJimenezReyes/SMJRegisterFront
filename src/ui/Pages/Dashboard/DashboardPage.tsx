import React from "react";
import DashboardSummary from "../../components/Dashboard/DashboardSummary";
import BankChart from "../../components/Dashboard/BankChart";
import CampersByConferenceChart from "../../components/Dashboard/CampersByConferenceChart";
import CashCard from "../../components/Dashboard/CashCard";

const DashboardPage: React.FC = () => {
  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
      <DashboardSummary />
      <CashCard />
      <BankChart />
      <CampersByConferenceChart />
    </div>
  );
};

export default DashboardPage;
