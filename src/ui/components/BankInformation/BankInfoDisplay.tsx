import React, { useEffect, useState } from 'react';
import { BankInformationService } from '../../../api/services/bank-information.services.ts';
import type { BankInformationDTO } from '../../../api/dtos/bankinformation.dto.ts';

interface Props {
  conferenceId: number | null;
}

const BankInfoDisplay: React.FC<Props> = ({ conferenceId }) => {
  const [bankInfos, setBankInfos] = useState<BankInformationDTO[]>([]);
  const service = new BankInformationService();

  useEffect(() => {
    if (conferenceId !== null) {
      service
        .GetAllBankInformationByConference(conferenceId)
        .then((data) => setBankInfos(data))
        .catch((err) => console.error(err));
    }
  }, [conferenceId]);

  if (conferenceId === null) return null;

  return (
    <div className="bg-base-200 text-base-content p-4 rounded-md mt-4">
      <h3 className="font-bold mb-2">Cuentas bancarias:</h3>
      {bankInfos.length === 0 ? (
        <p className="text-sm opacity-70">No hay información disponible.</p>
      ) : (
        <ul className="space-y-2">
          {bankInfos.map((info) => (
            <li key={info.id} className="border border-base-300 rounded p-3 bg-base-100 shadow-sm">
              <p><strong>Cédula:</strong> {info.cedula}</p>
              <p><strong>No. Cuenta:</strong> {info.accountNumber}</p>
              <p><strong>Banco:</strong> {info.bankName}</p>
              <p><strong>Conferencia:</strong> {info.conference}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default BankInfoDisplay;
