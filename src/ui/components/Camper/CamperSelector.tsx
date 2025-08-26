import React, { useEffect, useState } from "react";
import type { CamperSimpleDto } from "../../../api/dtos/camper.dto";
import { CamperService } from "../../../api/services/camper.service";

interface CamperSelectorProps {
  value: number;
  onChange: (camperId: number) => void;
  filter?: string;
}

const CamperSelector: React.FC<CamperSelectorProps> = ({ value, onChange, filter }) => {
  const [campers, setCampers] = useState<CamperSimpleDto[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCampers = async () => {
      try {
        const service = new CamperService();
        const data = await service.SearchCampersAsync(filter);
        setCampers(data);
      } catch (err) {
        setError("Error al obtener campers");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCampers();
  }, [filter]);

  if (loading) return <div>Loading campers...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="p-1">
      <label className="label">
        <span className="label-text">Seleccione un Campista</span>
      </label>
      <select
        className="select select-bordered w-full"
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
      >
        <option value={0} disabled>
          Escoge un campista
        </option>
        {campers.map((camper) => (
          <option key={camper.id} value={camper.id}>
            {camper.name} {camper.lastName} - {camper.phoneNumber}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CamperSelector;
