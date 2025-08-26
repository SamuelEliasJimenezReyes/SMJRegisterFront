import React, { useEffect, useState } from "react";
import type { BankInformationDTO } from "../../../api/dtos/bankinformation.dto";
import { BankInformationService  } from "../../../api/services/bank-information.services.ts";

interface BankSelectorProps {
  value: number;
  onChange: (bankId: number) => void;
}

const BankSelector: React.FC<BankSelectorProps> = ({ value, onChange }) => {
  const [banks, setBanks] = useState<BankInformationDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBanks = async () => {
      try {
        const service = new BankInformationService();
        const data = await service.GetAllBankInformationAsync();
        setBanks(data);
      } catch (err) {
        setError("Error al obtener bancos");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchBanks();
  }, []);

  if (loading) return <div>Loading banks...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="p-1">
      <label className="label">
        <span className="label-text">Seleccione un Banco</span>
      </label>
      <select
        className="select select-bordered w-full"
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
      >
        <option value={0} disabled>
          Escoge un banco
        </option>
        {banks.map((bank) => (
          <option key={bank.id} value={bank.id}>
            {bank.bankName} - {bank.accountNumber}
          </option>
        ))}
      </select>
    </div>
  );
};

export default BankSelector;
